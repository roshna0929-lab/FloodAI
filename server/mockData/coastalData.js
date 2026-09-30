// Coastal & Cyclone Intelligence for coastal vulnerable cities
export const COASTAL_DATA = {
  chennai: {
    isCoastal: true,
    tideLevel: { current: 1.35, unit: 'm', datum: 'Chart Datum (CD)', tidePhase: 'Approaching Spring High Tide (+1.48m at 17:30 IST)' },
    seaLevelAnomaly: { current: +0.22, unit: 'm', status: 'Elevated by coastal wind setup' },
    waveHeight: { significant: 3.4, max: 4.8, unit: 'm', direction: 'ENE (70°)' },
    stormSurge: { current: 1.15, forecastPeak: 1.60, unit: 'm', confidence: 82 },
    coastalElevation: '2.5 - 6.5 m ASL',
    coastalInundationRiskScore: 79,
    coastalInundationStatus: 'High - Estuary backflow preventing river drainage into Bay of Bengal',
    riverDischargeAtCoast: '804 m³/s (Adyar Estuary)',
    drainageCondition: 'Tidally locked; sluice gates cannot open without pumps',
    compoundFormula: {
      formula: 'Risk = Cyclone (20) + Rainfall (25) + Tide (15) + Surge (15) + River Discharge (15) - Elevation Buffer (10)',
      breakdown: {
        cycloneWeight: 16, // max 20
        rainfallWeight: 22, // max 25
        tideWeight: 13, // max 15
        surgeWeight: 12, // max 15
        riverDischargeWeight: 14, // max 15
        elevationMitigation: -8 // max -10
      },
      total: 69,
      interpretation: 'Simultaneous 1.15m storm surge and astronomical high tide blocks the Adyar mouth, backing river waters into urban colonies.'
    },
    cyclone: {
      name: 'Severe Cyclonic Storm “MICHAUNG-II”',
      intensityCategory: 'Category 2 Equivalent (IMD Severe Cyclonic Storm)',
      currentPosition: { lat: 12.45, lon: 81.65, label: 'Current Eye (110 km SE of Chennai)' },
      centralPressure: '984 hPa',
      maxSustainedWinds: '105 km/h (gusting to 125 km/h)',
      movementSpeed: '14 km/h moving North-Northwestward',
      forecastLandfall: 'Estimated near Nellore-Bapatla coast in 22 hours',
      trackWaypoints: [
        { time: '-24h', lat: 10.8, lon: 83.2, intensity: 'Deep Depression', windSpeed: '55 km/h' },
        { time: '-12h', lat: 11.6, lon: 82.4, intensity: 'Cyclonic Storm', windSpeed: '75 km/h' },
        { time: 'Current', lat: 12.45, lon: 81.65, intensity: 'Severe Cyclonic Storm', windSpeed: '105 km/h' },
        { time: '+6h (fc)', lat: 12.95, lon: 81.10, intensity: 'Severe Cyclonic Storm', windSpeed: '110 km/h' },
        { time: '+12h (fc)', lat: 13.50, lon: 80.60, intensity: 'Severe Cyclonic Storm', windSpeed: '115 km/h' },
        { time: '+24h (fc)', lat: 14.60, lon: 80.20, intensity: 'Weakening at Landfall', windSpeed: '90 km/h' }
      ]
    }
  },
  mumbai: {
    isCoastal: true,
    tideLevel: { current: 4.12, unit: 'm', datum: 'CD', tidePhase: 'Spring High Tide Warning (Peak 4.68m)' },
    seaLevelAnomaly: { current: +0.18, unit: 'm', status: 'Monsoon onshore surge' },
    waveHeight: { significant: 3.8, max: 5.2, unit: 'm', direction: 'WSW' },
    stormSurge: { current: 0.65, forecastPeak: 0.90, unit: 'm', confidence: 78 },
    coastalElevation: '3.0 - 8.0 m ASL',
    coastalInundationRiskScore: 73,
    coastalInundationStatus: 'High - Arabian Sea spring tide backing up Mahim Creek & Haji Ali',
    riverDischargeAtCoast: '450 m³/s (Mahim Bay)',
    drainageCondition: 'All 6 floodgates automatically closed due to >4.5m tide',
    compoundFormula: {
      formula: 'Risk = Cyclone (15) + Rainfall (30) + Tide (20) + Surge (10) + River Discharge (15) - Elevation Buffer (10)',
      breakdown: {
        cycloneWeight: 8,
        rainfallWeight: 26,
        tideWeight: 19,
        surgeWeight: 7,
        riverDischargeWeight: 13,
        elevationMitigation: -6
      },
      total: 67,
      interpretation: 'When rainfall exceeds 50mm/hr during >4.5m sea tide, gravity outfalls close and urban water accumulates rapidly.'
    },
    cyclone: {
      name: 'Arabian Sea Low Pressure Vortex “AR-02”',
      intensityCategory: 'Depression / Pre-cyclonic circulation',
      currentPosition: { lat: 17.8, lon: 71.4, label: '160 km WSW of Mumbai' },
      centralPressure: '998 hPa',
      maxSustainedWinds: '50 km/h (gusting to 65 km/h)',
      movementSpeed: '18 km/h moving Northward',
      forecastLandfall: 'Recurving towards Saurashtra coast',
      trackWaypoints: [
        { time: '-12h', lat: 16.5, lon: 71.8, intensity: 'Well-marked Low', windSpeed: '40 km/h' },
        { time: 'Current', lat: 17.8, lon: 71.4, intensity: 'Depression', windSpeed: '50 km/h' },
        { time: '+12h (fc)', lat: 19.2, lon: 70.8, intensity: 'Deep Depression', windSpeed: '60 km/h' },
        { time: '+24h (fc)', lat: 20.5, lon: 70.2, intensity: 'Deep Depression', windSpeed: '65 km/h' }
      ]
    }
  },
  kochi: {
    isCoastal: true,
    tideLevel: { current: 1.05, unit: 'm', datum: 'CD', tidePhase: 'High Tide' },
    seaLevelAnomaly: { current: +0.12, unit: 'm', status: 'Estuarine swelling' },
    waveHeight: { significant: 2.6, max: 3.5, unit: 'm', direction: 'SW' },
    stormSurge: { current: 0.35, forecastPeak: 0.50, unit: 'm', confidence: 80 },
    coastalElevation: '1.8 - 4.0 m ASL',
    coastalInundationRiskScore: 52,
    coastalInundationStatus: 'Moderate - Vembanad lake buffer slowing coastal drainage',
    riverDischargeAtCoast: '2,200 m³/s (Periyar into Cochin Gut)',
    drainageCondition: 'Semi-diurnal tidal modulation',
    compoundFormula: {
      formula: 'Risk = Cyclone (10) + Rainfall (30) + Tide (15) + Surge (10) + River Discharge (25) - Elevation Buffer (10)',
      breakdown: {
        cycloneWeight: 4,
        rainfallWeight: 22,
        tideWeight: 11,
        surgeWeight: 4,
        riverDischargeWeight: 21,
        elevationMitigation: -5
      },
      total: 57,
      interpretation: 'Periyar river high discharge meets high tide in Cochin harbour, creating waterlogging across Chellanam and Vypeen.'
    },
    cyclone: null
  },
  kolkata: {
    isCoastal: true,
    tideLevel: { current: 4.85, unit: 'm', datum: 'CD', tidePhase: 'High Spring Bore Tide' },
    seaLevelAnomaly: { current: +0.25, unit: 'm', status: 'Sundarbans funnel effect' },
    waveHeight: { significant: 2.2, max: 3.0, unit: 'm', direction: 'S' },
    stormSurge: { current: 0.85, forecastPeak: 1.20, unit: 'm', confidence: 84 },
    coastalElevation: '3.5 - 6.0 m ASL',
    coastalInundationRiskScore: 58,
    coastalInundationStatus: 'Moderate - Tidal bore forces lockgates closed along Hooghly riverbank',
    riverDischargeAtCoast: '3,800 m³/s',
    drainageCondition: 'Relies on Palmer Bridge and Topsia pumping stations',
    compoundFormula: {
      formula: 'Risk = Cyclone (20) + Rainfall (20) + Tide (20) + Surge (15) + River Discharge (15) - Elevation Buffer (10)',
      breakdown: {
        cycloneWeight: 10,
        rainfallWeight: 16,
        tideWeight: 17,
        surgeWeight: 11,
        riverDischargeWeight: 12,
        elevationMitigation: -8
      },
      total: 58,
      interpretation: 'Tidal bore prevents sewage and storm canals from draining to Hooghly River, pushing water back into low southern wards.'
    },
    cyclone: null
  },
  defaultNonCoastal: {
    isCoastal: false,
    message: 'Inland location. Coastal and cyclone storm surge models are inactive for this basin.'
  }
};
