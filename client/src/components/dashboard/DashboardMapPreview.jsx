import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Layers, ArrowUpRight, ShieldAlert } from 'lucide-react';

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyD51yK3ezbhANBbhTiOnLCWjjKJpcPDF_E';

export default function DashboardMapPreview({ locationData, dashboard, onExploreMap }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const lat = locationData?.lat || 13.0827;
    const lon = locationData?.lon || 80.2707;

    // Cleanup existing map if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [lat, lon],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false, // Prevent accidental page scroll interception
      dragging: true
    });

    // Google Maps Satellite / Hybrid basemap with provided API key
    L.tileLayer(`https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${GOOGLE_MAPS_KEY}`, {
      maxZoom: 20,
      attribution: 'Map data © Google'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // 1. Flood Inundation Zone
    const riskColor = dashboard?.riskLevel === 'Extreme' ? '#ef4444' :
                      dashboard?.riskLevel === 'High' ? '#f97316' :
                      dashboard?.riskLevel === 'Moderate' ? '#f59e0b' : '#10b981';

    const floodCircle = L.circle([lat - 0.008, lon + 0.01], {
      radius: 1600,
      color: riskColor,
      fillColor: riskColor,
      fillOpacity: 0.4,
      weight: 2
    }).addTo(map);

    floodCircle.bindTooltip(`<strong>Primary Inundation Zone</strong><br/>Extent: ${dashboard?.floodExtent?.currentKm2 || 2.8} km²<br/>Depth: ${dashboard?.floodDepth?.estimatedMinM || 0.4}–${dashboard?.floodDepth?.estimatedMaxM || 1.1} m`, { sticky: true });

    // 2. River Course
    const riverCoords = [
      [lat - 0.05, lon - 0.06],
      [lat - 0.02, lon - 0.03],
      [lat, lon],
      [lat + 0.02, lon + 0.03],
      [lat + 0.04, lon + 0.06]
    ];
    const riverLine = L.polyline(riverCoords, {
      color: '#0284c7',
      weight: 4,
      opacity: 0.85
    }).addTo(map);
    riverLine.bindTooltip(`<strong>${locationData?.hydrologicalHierarchy?.riverStream || 'Main River'}</strong>`, { sticky: true });

    // 3. Submerged Road
    const roadLine = L.polyline([
      [lat - 0.015, lon - 0.02],
      [lat - 0.01, lon + 0.015]
    ], {
      color: '#ef4444',
      weight: 3.5,
      dashArray: '5, 5',
      opacity: 0.9
    }).addTo(map);
    roadLine.bindTooltip('<strong>Critical Arterial Underpass</strong>: Submerged', { sticky: true });

    // 4. Evacuation Center Pin
    if (locationData?.evacuationCentres?.[0]) {
      const ec = locationData.evacuationCentres[0];
      const shelterMarker = L.circleMarker([ec.lat, ec.lon], {
        radius: 7,
        color: '#10b981',
        fillColor: '#059669',
        fillOpacity: 0.95,
        weight: 2.5
      }).addTo(map);
      shelterMarker.bindTooltip(`<strong>${ec.name}</strong><br/>Capacity: ${ec.capacity} | ${ec.status}`, { sticky: true });
    }

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locationData, dashboard]);

  return (
    <div className="gis-panel overflow-hidden space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
              GIS Inundation & Infrastructure Spatial Preview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal mt-0.5">
              {locationData?.name || 'Local'} Catchment • <span className="font-mono text-sky-300 font-semibold">{locationData?.geographicHierarchy?.coordinates || ''}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onExploreMap}
          className="btn-primary text-sm self-start sm:self-center"
        >
          <span>Open Full Interactive GIS Map</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Map Canvas with Floating Telemetry HUD */}
      <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Quick Summary HUD */}
        <div className="absolute top-4 left-4 z-[400] bg-[#0a1222]/95 backdrop-blur-md border border-white/20 rounded-xl p-4 text-xs shadow-2xl max-w-xs pointer-events-none space-y-2">
          <div className="text-xs uppercase font-extrabold text-sky-400 tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Active Inundation Overlay</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-200">
            <div>
              <span className="text-slate-400 font-medium">Extent:</span>{' '}
              <strong className="text-white font-mono font-bold">{dashboard?.floodExtent?.currentKm2 || 2.8} km²</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Depth:</span>{' '}
              <strong className="text-white font-mono font-bold">{dashboard?.floodDepth?.estimatedMinM}–{dashboard?.floodDepth?.estimatedMaxM} m</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Submerged:</span>{' '}
              <strong className="text-red-400 font-mono font-bold">{dashboard?.affectedInfrastructure?.roads || 0} roads</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium">At-Risk:</span>{' '}
              <strong className="text-red-400 font-mono font-bold">{dashboard?.affectedInfrastructure?.buildings || 0} bldgs</strong>
            </div>
          </div>
        </div>

        {/* Bottom Legend */}
        <div className="absolute bottom-4 left-4 z-[400] bg-[#0a1222]/95 backdrop-blur-md border border-white/20 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-slate-200 flex items-center gap-4 shadow-xl pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/90 border border-red-400"></span>
            <span>Inundation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 bg-sky-400 rounded-full"></span>
            <span>River Reach</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span>Shelter Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
}
