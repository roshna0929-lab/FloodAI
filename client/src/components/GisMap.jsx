import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Waves, 
  LifeBuoy, 
  Navigation, 
  Compass, 
  Info, 
  Maximize2, 
  RotateCcw,
  CheckSquare,
  Square,
  ShieldAlert,
  Search,
  Database,
  CloudRain
} from 'lucide-react';

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyD51yK3ezbhANBbhTiOnLCWjjKJpcPDF_E';

const BASE_MAPS = {
  googleHybrid: {
    id: 'googleHybrid',
    name: 'Google Satellite',
    icon: '🛰️',
    url: `https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${GOOGLE_MAPS_KEY}`,
    maxZoom: 20,
    attribution: 'Map data © Google'
  },
  googleTerrain: {
    id: 'googleTerrain',
    name: 'Google Terrain',
    icon: '🏔️',
    url: `https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&key=${GOOGLE_MAPS_KEY}`,
    maxZoom: 20,
    attribution: 'Map data © Google'
  },
  googleRoadmap: {
    id: 'googleRoadmap',
    name: 'Google Streets',
    icon: '🗺️',
    url: `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${GOOGLE_MAPS_KEY}`,
    maxZoom: 20,
    attribution: 'Map data © Google'
  },
  cartoDark: {
    id: 'cartoDark',
    name: 'Dark Analytics',
    icon: '🌙',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    maxZoom: 19,
    attribution: '© CARTO'
  }
};

export default function GisMap({ locationData, coastalData, dashboard }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const baseTileLayerRef = useRef(null);
  const layerGroupsRef = useRef({});
  const [selectedBaseMap, setSelectedBaseMap] = useState('googleHybrid');

  // Layer visibility state
  const [layersVisibility, setLayersVisibility] = useState({
    floodExtent: true,
    rivers: true,
    reservoirs: true,
    rainGauges: true,
    evacuationCentres: true,
    roads: true,
    cycloneTrack: true
  });

  const [selectedZone, setSelectedZone] = useState(null);

  const toggleLayer = (key) => {
    setLayersVisibility(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      const lg = layerGroupsRef.current[key];
      if (lg && mapInstanceRef.current) {
        if (updated[key]) {
          mapInstanceRef.current.addLayer(lg);
        } else {
          mapInstanceRef.current.removeLayer(lg);
        }
      }
      return updated;
    });
  };

  const recenterMap = () => {
    if (mapInstanceRef.current && locationData) {
      mapInstanceRef.current.setView([locationData.lat, locationData.lon], 12);
    }
  };

  // Swap base tile layer when selectedBaseMap changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const baseCfg = BASE_MAPS[selectedBaseMap] || BASE_MAPS.googleHybrid;
    if (baseTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(baseTileLayerRef.current);
    }
    baseTileLayerRef.current = L.tileLayer(baseCfg.url, {
      maxZoom: baseCfg.maxZoom,
      attribution: baseCfg.attribution
    }).addTo(mapInstanceRef.current);

    // Keep data layer groups above base map
    if (layerGroupsRef.current) {
      Object.values(layerGroupsRef.current).forEach(group => {
        if (group && mapInstanceRef.current.hasLayer(group)) {
          group.eachLayer(layer => {
            if (layer.bringToFront) layer.bringToFront();
          });
        }
      });
    }
  }, [selectedBaseMap]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const lat = locationData?.lat || 13.0827;
    const lon = locationData?.lon || 80.2707;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lon],
        zoom: 12,
        zoomControl: false,
        attributionControl: false
      });

      // Default to Google Maps Satellite / Hybrid with provided API key
      const baseCfg = BASE_MAPS[selectedBaseMap] || BASE_MAPS.googleHybrid;
      baseTileLayerRef.current = L.tileLayer(baseCfg.url, {
        maxZoom: baseCfg.maxZoom,
        attribution: baseCfg.attribution
      }).addTo(map);

      // Custom zoom control in bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;

      // Layer groups
      layerGroupsRef.current = {
        floodExtent: L.layerGroup().addTo(map),
        rivers: L.layerGroup().addTo(map),
        reservoirs: L.layerGroup().addTo(map),
        rainGauges: L.layerGroup().addTo(map),
        evacuationCentres: L.layerGroup().addTo(map),
        roads: L.layerGroup().addTo(map),
        cycloneTrack: L.layerGroup().addTo(map)
      };
    } else {
      mapInstanceRef.current.setView([lat, lon], 12);
    }

    const map = mapInstanceRef.current;
    const lg = layerGroupsRef.current;

    // Clear previous
    Object.values(lg).forEach(g => g.clearLayers());

    // 1. Flood Extent Polygons (Severe, Moderate, Shallow, Controlled)
    const zones = [
      { name: `${locationData?.name || 'Local'} River Core Basin`, offset: [-0.012, 0.015], radius: 1400, color: '#ef4444', depth: '0.9 – 1.4 m', severity: 'Severe', pop: '~14,200', dur: '18 hrs' },
      { name: 'Depressed Road Corridors', offset: [0.018, -0.012], radius: 1800, color: '#f97316', depth: '0.5 – 0.9 m', severity: 'Moderate', pop: '~8,400', dur: '12 hrs' },
      { name: 'Peripheral Runoff Inundation', offset: [-0.025, -0.02], radius: 2100, color: '#eab308', depth: '0.2 – 0.5 m', severity: 'Shallow', pop: '~3,900', dur: '8 hrs' },
      { name: 'Controlled Wetland Buffer', offset: [0.03, 0.025], radius: 1200, color: '#10b981', depth: '< 0.2 m', severity: 'Low', pop: '~600', dur: 'Draining' }
    ];

    zones.forEach((z, i) => {
      const circle = L.circle([lat + z.offset[0], lon + z.offset[1]], {
        radius: z.radius,
        color: z.color,
        fillColor: z.color,
        fillOpacity: 0.45,
        weight: 2
      });

      circle.on('click', () => {
        setSelectedZone({
          ...z,
          confidence: '88%',
          nearestShelter: locationData?.evacuationCentres?.[0]?.name || 'Municipal Relief Centre',
          nearestRoad: 'Eastbound Arterial Highway (Elevated/Open)'
        });
      });

      lg.floodExtent.addLayer(circle);

      // Default select first zone for inspector
      if (i === 0 && !selectedZone) {
        setSelectedZone({
          ...z,
          confidence: '88%',
          nearestShelter: locationData?.evacuationCentres?.[0]?.name || 'Municipal Relief Centre',
          nearestRoad: 'Eastbound Arterial Highway (Elevated/Open)'
        });
      }
    });

    // 2. Rivers
    const riverCoords = [
      [lat - 0.06, lon - 0.07],
      [lat - 0.03, lon - 0.04],
      [lat - 0.01, lon - 0.01],
      [lat, lon],
      [lat + 0.015, lon + 0.025],
      [lat + 0.035, lon + 0.055],
      [lat + 0.055, lon + 0.08]
    ];
    const riverLine = L.polyline(riverCoords, {
      color: '#0284c7',
      weight: 5,
      opacity: 0.9
    });
    riverLine.bindTooltip(`<strong>${locationData?.hydrologicalHierarchy?.riverStream || 'Main River'}</strong>`, { sticky: true });
    lg.rivers.addLayer(riverLine);

    // 3. Reservoirs
    const dam = L.circleMarker([lat - 0.045, lon - 0.05], {
      radius: 8,
      color: '#a855f7',
      fillColor: '#9333ea',
      fillOpacity: 0.9,
      weight: 2
    });
    dam.bindTooltip('<strong>Upstream Dam / Storage</strong><br/>Outflow Active', { sticky: true });
    lg.reservoirs.addLayer(dam);

    // 4. Rain Gauges
    const gauges = [
      { name: 'AWS Central Gauge', lat: lat + 0.025, lon: lon - 0.02, rain: `${dashboard?.currentRainfall?.last1h || 35} mm/h` },
      { name: 'ARG Catchment Post', lat: lat - 0.02, lon: lon + 0.03, rain: '42 mm/h' }
    ];
    gauges.forEach(g => {
      const gm = L.circleMarker([g.lat, g.lon], {
        radius: 6,
        color: '#06b6d4',
        fillColor: '#22d3ee',
        fillOpacity: 0.9,
        weight: 2
      });
      gm.bindTooltip(`<strong>${g.name}</strong><br/>${g.rain}`);
      lg.rainGauges.addLayer(gm);
    });

    // 5. Evacuation Shelters
    (locationData?.evacuationCentres || []).forEach(ec => {
      const sm = L.circleMarker([ec.lat, ec.lon], {
        radius: 7,
        color: '#10b981',
        fillColor: '#059669',
        fillOpacity: 0.95,
        weight: 2
      });
      sm.bindTooltip(`<strong>${ec.name}</strong><br/>Cap: ${ec.capacity} | ${ec.status}`);
      lg.evacuationCentres.addLayer(sm);
    });

    // 6. Roads
    const floodedRoad = L.polyline([
      [lat - 0.015, lon - 0.02],
      [lat - 0.01, lon + 0.015]
    ], { color: '#ef4444', weight: 4, dashArray: '6, 6', opacity: 0.9 });
    floodedRoad.bindTooltip('<strong>Arterial Underpass</strong>: Submerged');
    lg.roads.addLayer(floodedRoad);

    // 7. Cyclone track if coastal
    if (coastalData?.cyclone?.trackWaypoints) {
      const trackPoints = coastalData.cyclone.trackWaypoints.map(wp => [wp.lat, wp.lon]);
      const cl = L.polyline(trackPoints, { color: '#f43f5e', weight: 3, dashArray: '4, 6', opacity: 0.8 });
      lg.cycloneTrack.addLayer(cl);
      coastalData.cyclone.trackWaypoints.forEach(wp => {
        const cm = L.circleMarker([wp.lat, wp.lon], {
          radius: wp.time === 'Current' ? 9 : 5,
          color: '#f43f5e',
          fillColor: '#e11d48',
          fillOpacity: 0.9,
          weight: 2
        });
        cm.bindTooltip(`<strong>${coastalData.cyclone.name} (${wp.time})</strong><br/>${wp.intensity}`);
        lg.cycloneTrack.addLayer(cm);
      });
    }

  }, [locationData, coastalData, dashboard]);

  return (
    <div className="space-y-4">
      {/* Top Map Toolbar */}
      <div className="gis-panel px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-sky-400" />
          <span className="font-extrabold text-white uppercase tracking-wider text-base">
            GIS Hydrological Inundation Model
          </span>
          <span className="text-xs text-sky-300 font-mono font-semibold hidden md:inline px-2.5 py-0.5 rounded bg-slate-900 border border-white/10">
            {locationData?.geographicHierarchy?.coordinates}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Google Maps Base Layer Switcher */}
          <div className="flex items-center bg-[#090f1e] p-1 rounded-xl border border-white/15 gap-1">
            {Object.values(BASE_MAPS).map(bm => (
              <button
                key={bm.id}
                onClick={() => setSelectedBaseMap(bm.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedBaseMap === bm.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title={`Switch basemap to ${bm.name}`}
              >
                <span>{bm.icon}</span>
                <span className="hidden sm:inline">{bm.name}</span>
              </button>
            ))}
          </div>

          <button onClick={recenterMap} className="btn-secondary text-sm font-bold">
            <RotateCcw className="w-4 h-4 text-sky-400" />
            <span>Recenter Map</span>
          </button>
        </div>
      </div>

      {/* 3-Column Professional GIS Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Layer Controls Panel (3 cols) */}
        <div className="lg:col-span-3 gis-panel p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center justify-between">
              <span className="text-white text-sm font-extrabold">Map Layers</span>
              <span className="text-xs text-sky-400 font-mono font-bold">Interactive Toggles</span>
            </div>

            <div className="space-y-2 text-sm">
              <button
                onClick={() => toggleLayer('floodExtent')}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left transition-colors font-semibold ${
                  layersVisibility.floodExtent ? 'bg-red-950/50 text-white border border-red-500/40' : 'bg-slate-900/60 text-slate-400 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span>Flood Extent & Depth</span>
                </div>
                {layersVisibility.floodExtent ? <CheckSquare className="w-4 h-4 text-red-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              </button>

              <button
                onClick={() => toggleLayer('rivers')}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left transition-colors font-semibold ${
                  layersVisibility.rivers ? 'bg-blue-950/50 text-white border border-blue-500/40' : 'bg-slate-900/60 text-slate-400 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Waves className="w-4 h-4 text-blue-400" />
                  <span>River Channels</span>
                </div>
                {layersVisibility.rivers ? <CheckSquare className="w-4 h-4 text-blue-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              </button>

              <button
                onClick={() => toggleLayer('reservoirs')}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left transition-colors font-semibold ${
                  layersVisibility.reservoirs ? 'bg-purple-950/50 text-white border border-purple-500/40' : 'bg-slate-900/60 text-slate-400 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span>Dams & Reservoirs</span>
                </div>
                {layersVisibility.reservoirs ? <CheckSquare className="w-4 h-4 text-purple-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              </button>

              <button
                onClick={() => toggleLayer('rainGauges')}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left transition-colors font-semibold ${
                  layersVisibility.rainGauges ? 'bg-sky-950/50 text-white border border-sky-500/40' : 'bg-slate-900/60 text-slate-400 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CloudRain className="w-4 h-4 text-sky-400" />
                  <span>AWS & ARG Stations</span>
                </div>
                {layersVisibility.rainGauges ? <CheckSquare className="w-4 h-4 text-sky-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              </button>

              <button
                onClick={() => toggleLayer('evacuationCentres')}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left transition-colors font-semibold ${
                  layersVisibility.evacuationCentres ? 'bg-emerald-950/50 text-white border border-emerald-500/40' : 'bg-slate-900/60 text-slate-400 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LifeBuoy className="w-4 h-4 text-emerald-400" />
                  <span>Evacuation Shelters</span>
                </div>
                {layersVisibility.evacuationCentres ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              </button>

              <button
                onClick={() => toggleLayer('roads')}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left transition-colors font-semibold ${
                  layersVisibility.roads ? 'bg-amber-950/50 text-white border border-amber-500/40' : 'bg-slate-900/60 text-slate-400 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Road Infrastructure</span>
                </div>
                {layersVisibility.roads ? <CheckSquare className="w-4 h-4 text-amber-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              </button>

              {coastalData?.cyclone && (
                <button
                  onClick={() => toggleLayer('cycloneTrack')}
                  className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left transition-colors font-semibold ${
                    layersVisibility.cycloneTrack ? 'bg-rose-950/50 text-white border border-rose-500/40' : 'bg-slate-900/60 text-slate-400 border border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-rose-400" />
                    <span>Cyclone Track (Live)</span>
                  </div>
                  {layersVisibility.cycloneTrack ? <CheckSquare className="w-4 h-4 text-rose-400" /> : <Square className="w-4 h-4 text-slate-600" />}
                </button>
              )}
            </div>
          </div>

          {/* Depth Classification Legend */}
          <div className="bg-[#080e1a] p-4 rounded-xl border border-white/10 space-y-3 text-xs">
            <div className="font-extrabold text-white uppercase tracking-wider text-xs">Inundation Depth Legend</div>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-500"></span> &gt; 1.0 m</span>
                <span className="text-red-400 font-mono font-bold">Critical</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-orange-500"></span> 0.5 – 1.0 m</span>
                <span className="text-orange-400 font-mono font-bold">Moderate</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-yellow-500"></span> 0.2 – 0.5 m</span>
                <span className="text-yellow-400 font-mono font-bold">Shallow</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500"></span> &lt; 0.2 m</span>
                <span className="text-emerald-400 font-mono font-bold">Controlled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Full Interactive Map (6 cols) */}
        <div className="lg:col-span-6 h-[620px] gis-panel overflow-hidden relative shadow-2xl rounded-2xl border border-white/15">
          <div ref={mapContainerRef} className="w-full h-full"></div>
        </div>

        {/* Right Column: Zone Inspector Panel (3 cols) */}
        <div className="lg:col-span-3 gis-panel p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-white font-extrabold text-sm">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Zone Inspector</span>
              </span>
              <span className="text-xs text-sky-400 font-mono font-bold">Click map</span>
            </div>

            {selectedZone ? (
              <div className="space-y-4 text-sm">
                <div className="space-y-1.5">
                  <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Selected Sector</span>
                  <div className="text-base font-extrabold text-white leading-snug">{selectedZone.name}</div>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                    selectedZone.severity === 'Severe' ? 'badge-extreme' :
                    selectedZone.severity === 'Moderate' ? 'badge-high' :
                    'badge-mod'
                  }`}>
                    {selectedZone.severity} Inundation Risk
                  </span>
                </div>

                <div className="bg-[#080e1a] p-3.5 rounded-xl border border-white/10 space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Depth:</span>
                    <strong className="text-sky-300 font-bold text-sm">{selectedZone.depth}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Exposed Population:</span>
                    <strong className="text-amber-300 font-bold text-sm">{selectedZone.pop}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active Duration:</span>
                    <span className="text-white font-semibold">{selectedZone.dur}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Model Confidence:</span>
                    <span className="text-emerald-400 font-bold">{selectedZone.confidence}</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block">Nearest Transit Link:</span>
                    <span className="text-slate-200 font-medium">{selectedZone.nearestRoad}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block">Designated Emergency Shelter:</span>
                    <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                      <LifeBuoy className="w-4 h-4" />
                      <span>{selectedZone.nearestShelter}</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 text-sm space-y-2">
                <Info className="w-8 h-8 mx-auto text-sky-400/60" />
                <p className="leading-relaxed">Click on any shaded polygon on the GIS map to view localized depth, population exposure, and access routes.</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 text-xs text-slate-400 leading-relaxed font-normal">
            Cartographic data fused with Sentinel-1 SAR radar backscatter & 30m SRTM elevation models.
          </div>
        </div>
      </div>
    </div>
  );
}
