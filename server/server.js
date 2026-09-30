import express from 'express';
import cors from 'cors';
import { LOCATIONS } from './mockData/locations.js';
import { generateHistoricalData } from './mockData/historicalData.js';
import { RIVER_RESERVOIR_DATA } from './mockData/riverReservoir.js';
import { LAND_USE_DATA } from './mockData/landUseData.js';
import { COASTAL_DATA } from './mockData/coastalData.js';
import { VALIDATION_DATA } from './mockData/validationData.js';
import { liveStateEngine } from './mockData/liveState.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Background auto-refresh simulation tick every 30 seconds
setInterval(() => {
  for (const loc of LOCATIONS) {
    liveStateEngine.simulateTick(loc.id);
  }
}, 30000);

// Helper wrapper for standardized metadata responses
function formatResponse(data, locationId) {
  return {
    status: 'success',
    timestamp: new Date().toISOString(),
    source: 'Demo / Simulated Multi-Sensor Telemetry',
    isSimulated: true,
    locationId,
    confidence: '85–94%',
    unitSystem: 'Metric (SI)',
    disclaimer: 'Prototype estimate only – Not an official emergency warning',
    data
  };
}

// 1. GET /api/locations
app.get('/api/locations', (req, res) => {
  const list = LOCATIONS.map((loc) => {
    const live = liveStateEngine.getDashboard(loc.id);
    return {
      id: loc.id,
      name: loc.name,
      state: loc.state,
      country: loc.country,
      lat: loc.lat,
      lon: loc.lon,
      isCoastal: loc.isCoastal,
      riskLevel: live.riskLevel,
      riskScore: live.riskScore,
      confidence: live.confidence,
      basin: loc.hydrologicalHierarchy.basin,
      river: loc.hydrologicalHierarchy.riverStream,
      population: loc.population
    };
  });
  res.json(formatResponse(list, 'all'));
});

// 2. GET /api/location/:id
app.get('/api/location/:id', (req, res) => {
  const locId = req.params.id.toLowerCase();
  const loc = LOCATIONS.find((l) => l.id === locId) || LOCATIONS[0];
  const live = liveStateEngine.getDashboard(loc.id);
  res.json(formatResponse({ ...loc, currentRisk: live.riskLevel, currentScore: live.riskScore }, loc.id));
});

// 3. GET /api/dashboard/:locationId
app.get('/api/dashboard/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const dashboard = liveStateEngine.getDashboard(locId);
  res.json(formatResponse(dashboard, locId));
});

// 4. GET /api/historical/:locationId
app.get('/api/historical/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const history = generateHistoricalData(locId);
  res.json(formatResponse(history, locId));
});

// 5. GET /api/rainfall/:locationId
app.get('/api/rainfall/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const extremeRainfall = liveStateEngine.getExtremeRainfall(locId);
  res.json(formatResponse(extremeRainfall, locId));
});

// 6. GET /api/weather/:locationId
app.get('/api/weather/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const weather = liveStateEngine.getWeather(locId);
  res.json(formatResponse(weather, locId));
});

// 7. GET /api/rivers/:locationId
app.get('/api/rivers/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const riverData = RIVER_RESERVOIR_DATA[locId]?.river || RIVER_RESERVOIR_DATA['chennai'].river;
  res.json(formatResponse(riverData, locId));
});

// 8. GET /api/reservoirs/:locationId
app.get('/api/reservoirs/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const reservoirData = RIVER_RESERVOIR_DATA[locId]?.reservoirs || RIVER_RESERVOIR_DATA['chennai'].reservoirs;
  res.json(formatResponse({
    reservoirs: reservoirData,
    cascadeProcess: 'Catchment Rainfall → Inflow Runoff → Reservoir Storage Buffer → Spillway Release → Downstream River Inundation → Coastal Flood Risk'
  }, locId));
});

// 9. GET /api/flood/:locationId
app.get('/api/flood/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const floodData = liveStateEngine.getFloodIntelligence(locId);
  res.json(formatResponse(floodData, locId));
});

// 10. GET /api/land-use/:locationId
app.get('/api/land-use/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const landData = LAND_USE_DATA[locId] || LAND_USE_DATA['default'];
  res.json(formatResponse(landData, locId));
});

// 11. GET /api/coastal/:locationId
app.get('/api/coastal/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const coastalData = COASTAL_DATA[locId] || COASTAL_DATA['defaultNonCoastal'];
  res.json(formatResponse(coastalData, locId));
});

// 12. GET /api/validation/:locationId
app.get('/api/validation/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const valData = VALIDATION_DATA[locId] || VALIDATION_DATA['default'];
  res.json(formatResponse(valData, locId));
});

// 13. POST /api/refresh/:locationId
app.post('/api/refresh/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const updated = liveStateEngine.simulateTick(locId);
  const dashboard = liveStateEngine.getDashboard(locId);
  res.json(formatResponse({
    message: 'Live sensor state refreshed successfully',
    dashboard,
    tick: updated?.tickCount || 1
  }, locId));
});

// 14. POST /api/alerts/dispatch/:locationId
// Dispatches immediate emergency alerts to NDMA, SDMA, District Collector (DEOC), Irrigation, and NDRF
app.post('/api/alerts/dispatch/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const loc = LOCATIONS.find(l => l.id === locId) || LOCATIONS[0];
  const live = liveStateEngine.getDashboard(locId);

  const dispatchId = `DISPATCH-AUTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const now = new Date().toISOString();

  const dispatchRecord = {
    dispatchId,
    locationId: loc.id,
    locationName: loc.name,
    state: loc.state,
    timestamp: now,
    alertLevel: live.riskLevel === 'Extreme' ? 'RED WARNING (LEVEL-3)' : 'ORANGE ALERT (LEVEL-2)',
    leadTime: live.bankfullPct > 90 ? 'Immediate to +3 Hours' : '+4 to +6 Hours',
    riskScore: live.riskScore,
    projectedPeakStageM: live.riverLevel?.current ? (Number(live.riverLevel.current) + 0.65).toFixed(2) : '8.45',
    authoritiesNotified: [
      { agency: 'State Disaster Management Authority (SDMA)', channel: 'CAP-XML 1.2 Protocol', status: 'ACKNOWLEDGED', latency: '280ms' },
      { agency: 'District Emergency Operations Centre (DEOC) / Collectorate', channel: 'Dedicated Hotwire API & SMS', status: 'ACKNOWLEDGED', latency: '410ms' },
      { agency: 'Water Resources Dept / Dam Sluice Gate Control', channel: 'Telemetry SCADA Alert', status: 'ACKNOWLEDGED', latency: '190ms' },
      { agency: 'NDRF 4th / 10th Battalion & State Fire Services', channel: 'Emergency VHF Net & Push', status: 'TRANSMITTED', latency: '650ms' },
      { agency: 'City Traffic & Highway Police Control', channel: 'Public Safety Broadcast', status: 'TRANSMITTED', latency: '520ms' }
    ],
    recommendedActions: [
      { dept: 'Irrigation & Dam Operators', action: 'Regulate sluice gates / pre-release reservoir buffer by 20–25% before peak hydrograph wave arrives.', priority: 'URGENT', leadTime: '2-4 Hours' },
      { dept: 'District Administration & NDRF', action: 'Pre-position motorized inflatable rescue boats and SDRF personnel in low-lying riparian wards.', priority: 'IMMEDIATE', leadTime: 'Immediate' },
      { dept: 'Traffic & Police Administration', action: 'Erect barricades at submerged causeways and divert heavy vehicular traffic away from river corridors.', priority: 'HIGH PRIORITY', leadTime: '1 Hour' },
      { dept: 'Municipal PWD & Stormwater', action: 'Deploy high-capacity dewatering pump sets (100+ HP) at depressed junctions and unblock intake grates.', priority: 'HIGH PRIORITY', leadTime: '2 Hours' },
      { dept: 'Civil Defense & Health', action: 'Activate multi-purpose flood relief shelters equipped with potable water, non-perishable rations, and power backup.', priority: 'IMMEDIATE', leadTime: 'Immediate' }
    ]
  };

  res.json(formatResponse(dispatchRecord, locId));
});

// 15. POST /api/notifications/send-citizen/:locationId
// Dispatches immediate resident / citizen notifications via Web Push, Cell Broadcast, and In-App Banner
app.post('/api/notifications/send-citizen/:locationId', (req, res) => {
  const locId = req.params.locationId.toLowerCase();
  const loc = LOCATIONS.find(l => l.id === locId) || LOCATIONS[0];
  const live = liveStateEngine.getDashboard(locId);

  const notifId = `NOTIF-CITIZEN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const now = new Date().toISOString();

  const citizenNotif = {
    notificationId: notifId,
    locationId: loc.id,
    locationName: loc.name,
    timestamp: now,
    alertTitle: `⚠️ FLOOD WARNING FOR ${loc.name.toUpperCase()}`,
    alertBody: `Severe runoff and river stage elevation forecast in next 4–6 hours. Waterlogging likely in low-lying wards. Move valuables to higher levels and avoid waterlogged roads.`,
    severity: live.riskLevel === 'Extreme' ? 'CRITICAL' : 'HIGH',
    channelsDispatched: ['Browser Web Push', 'In-App Live Alert Toast', 'Cell Broadcast (CBC)', 'IVRS Emergency Voice Call'],
    estimatedReach: loc.population ? `~15% of ${loc.population} (${loc.name} Low-Lying Zones)` : '125,000 Active Residents',
    citizenAdvisories: [
      'DO NOT walk, swim, or drive through standing or flowing floodwater ("Turn Around, Don\'t Drown").',
      'Turn off main electrical breakers and gas valves if water begins entering your ground floor.',
      'Prepare an emergency grab-bag: prescription medications, drinking water, power bank, torches, essential documents.',
      'Relocate family members, pets, and essential valuables to upper floors or nearest designated community shelter.',
      'Emergency helpline numbers: Dial 112 (National Emergency) or 1070 (Disaster Management Helpline).'
    ]
  };

  res.json(formatResponse(citizenNotif, locId));
});

app.listen(PORT, () => {
  console.log(`🌊 FloodAI Backend API running on http://localhost:${PORT}`);
});

