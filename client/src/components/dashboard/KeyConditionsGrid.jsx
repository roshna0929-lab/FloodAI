import React from 'react';
import { 
  Droplets, 
  Waves, 
  Database, 
  Compass, 
  Maximize2, 
  Clock, 
  Building,
  Layers
} from 'lucide-react';

export default function KeyConditionsGrid({ dashboard }) {
  if (!dashboard) return null;

  const {
    currentRainfall,
    riverLevel,
    reservoirStorage,
    soilSaturation,
    floodExtent,
    floodDepth,
    floodDuration,
    affectedInfrastructure
  } = dashboard;

  const bankfullPct = riverLevel?.percentageOfBankfull || 0;
  const riverTrend = riverLevel?.trend || 'rising';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
        <span className="text-sm font-extrabold text-white">Key Hydrological Conditions</span>
        <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-white/10">
          8 Telemetry Indicators Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. RAIN */}
        <div className="gis-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider">
                <div className="p-2 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <span>Precipitation</span>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-sky-950/70 text-sky-300 border border-sky-500/30">
                AWS + Radar
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
                {currentRainfall?.last24h || 0}{' '}
                <span className="text-base font-semibold text-slate-400">mm</span>
              </div>
              <div className="text-sm text-slate-300 font-medium mt-1">24h Cumulative Rainfall</div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-mono">
            <span>1h: <strong className="text-white font-bold">{currentRainfall?.last1h || 0}mm</strong></span>
            <span>3h: <strong className="text-white font-bold">{currentRainfall?.last3h || 0}mm</strong></span>
            <span>6h: <strong className="text-white font-bold">{currentRainfall?.last6h || 0}mm</strong></span>
          </div>
        </div>

        {/* 2. RIVER */}
        <div className="gis-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider">
                <div className="p-2 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400">
                  <Waves className="w-5 h-5" />
                </div>
                <span>River Stage</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase font-mono ${
                bankfullPct > 90 ? 'badge-extreme' : bankfullPct > 75 ? 'badge-high' : 'badge-low'
              }`}>
                {riverTrend}
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
                {riverLevel?.current || 0}{' '}
                <span className="text-base font-semibold text-slate-400">/ {riverLevel?.bankfull || 8.5} m</span>
              </div>
              <div className="text-sm text-slate-300 font-medium mt-1">
                <strong className="text-sky-300 font-bold">{bankfullPct}%</strong> Bankfull Capacity
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span className="text-slate-400">Hydraulic Stage:</span>
            <span className={`font-bold ${bankfullPct > 90 ? 'text-red-400' : 'text-amber-400'}`}>
              {bankfullPct > 90 ? 'Danger Level' : 'Warning Stage'}
            </span>
          </div>
        </div>

        {/* 3. RESERVOIR */}
        <div className="gis-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider">
                <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400">
                  <Database className="w-5 h-5" />
                </div>
                <span>Reservoir</span>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-purple-950/70 text-purple-300 border border-purple-500/30">
                Storage
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
                {reservoirStorage?.percentage || 0}{' '}
                <span className="text-base font-semibold text-slate-400">%</span>
              </div>
              <div className="text-sm text-slate-300 font-medium mt-1">
                {reservoirStorage?.status || 'Regulated Outflow'}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span className="text-slate-400">Spillway Mode:</span>
            <span className="text-purple-300 font-bold">Regulated Release</span>
          </div>
        </div>

        {/* 4. SOIL */}
        <div className="gis-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider">
                <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                  <Compass className="w-5 h-5" />
                </div>
                <span>Soil Moisture</span>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                Saturation
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
                {soilSaturation?.value || 0}{' '}
                <span className="text-base font-semibold text-slate-400">%</span>
              </div>
              <div className="text-sm text-slate-300 font-medium mt-1">
                {soilSaturation?.status || 'Antecedent Moisture'}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span className="text-slate-400">Infiltration Buffer:</span>
            <span className="text-emerald-300 font-bold">Saturated / Low</span>
          </div>
        </div>

        {/* 5. FLOOD EXTENT */}
        <div className="gis-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider">
                <div className="p-2 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <span>Flood Extent</span>
              </div>
              <span className="text-xs font-mono font-bold text-sky-400 bg-slate-900 px-2 py-1 rounded border border-white/10">
                SAR Radar
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold font-mono text-sky-300 tracking-tight">
                {floodExtent?.currentKm2 || 0}{' '}
                <span className="text-base font-semibold text-slate-400">km²</span>
              </div>
              <div className="text-sm text-slate-300 font-medium mt-1">
                Bounds: <span className="font-mono text-sky-400 font-bold">{floodExtent?.uncertaintyRange || '±0.4 km²'}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 text-xs text-slate-400 font-medium">
            Surface water satellite delineation
          </div>
        </div>

        {/* 6. FLOOD DEPTH */}
        <div className="gis-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider">
                <div className="p-2 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <span>Flood Depth</span>
              </div>
              <span className="text-xs font-mono font-bold text-blue-400 bg-slate-900 px-2 py-1 rounded border border-white/10">
                DEM Routing
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold font-mono text-blue-300 tracking-tight">
                {floodDepth?.estimatedMinM || 0.4}–{floodDepth?.estimatedMaxM || 1.1}{' '}
                <span className="text-base font-semibold text-slate-400">m</span>
              </div>
              <div className="text-sm text-slate-300 font-medium mt-1">
                Peak Channel: <strong className="text-white font-bold">{floodDepth?.peakM || 1.25} m</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 text-xs text-slate-400 font-medium">
            Bathymetric routing ±0.18m
          </div>
        </div>

        {/* 7. DURATION */}
        <div className="gis-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider">
                <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <span>Duration</span>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-950/70 text-amber-300 border border-amber-500/30">
                {floodDuration?.recessionStatus || 'Peak flooding'}
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold font-mono text-amber-300 tracking-tight">
                {floodDuration?.currentHours || 0}{' '}
                <span className="text-base font-semibold text-slate-400">hrs</span>
              </div>
              <div className="text-sm text-slate-300 font-medium mt-1">
                Time to normal: ~<strong className="text-white font-bold">{floodDuration?.estimatedTimeToNormalHours || 18} hrs</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 text-xs text-slate-400 font-medium">
            Continuous stage logger telemetry
          </div>
        </div>

        {/* 8. INFRASTRUCTURE */}
        <div className="gis-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider">
                <div className="p-2 rounded-xl bg-red-950/80 border border-red-500/30 text-red-400">
                  <Building className="w-5 h-5" />
                </div>
                <span>Infrastructure</span>
              </div>
              <span className="text-xs font-mono font-bold text-red-400 border border-red-500/40 bg-red-950/50 px-2 py-1 rounded-md">
                Critical Assets
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold font-mono text-white tracking-tight flex items-baseline gap-2">
                <span className="text-red-400">{affectedInfrastructure?.roads || 0}</span>
                <span className="text-sm font-semibold text-slate-400">Roads</span>
                <span className="text-slate-600">/</span>
                <span className="text-red-400">{affectedInfrastructure?.buildings || 0}</span>
                <span className="text-sm font-semibold text-slate-400">Bldgs</span>
              </div>
              <div className="text-sm text-slate-300 font-medium mt-1">
                Inundated asset intersections
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 text-xs text-slate-400 font-medium">
            Road corridors & building footprints
          </div>
        </div>
      </div>
    </div>
  );
}
