import React from 'react';
import { 
  Waves, 
  Wind, 
  Compass, 
  AlertTriangle, 
  Activity, 
  Anchor, 
  ArrowUpRight, 
  ShieldAlert, 
  Info 
} from 'lucide-react';

export default function CoastalCyclone({ coastalData, locationData }) {
  if (!coastalData) {
    return (
      <div className="p-16 text-center text-slate-400 space-y-3">
        <Activity className="w-8 h-8 animate-spin mx-auto text-sky-400" />
        <span className="text-base font-semibold">Loading coastal and storm surge intelligence...</span>
      </div>
    );
  }

  if (!coastalData.isCoastal) {
    return (
      <div className="gis-panel p-10 text-center text-slate-300 max-w-xl mx-auto my-12 space-y-3">
        <Anchor className="w-12 h-12 mx-auto text-slate-600 mb-2" />
        <h3 className="text-xl font-extrabold text-white">Inland Geographic Basin</h3>
        <p className="text-sm text-slate-300 leading-relaxed font-normal">
          {locationData?.name || 'Selected location'} is located in an inland river basin ({locationData?.hydrologicalHierarchy?.basin}). Coastal hydrodynamic tidal locks, astronomical high tides, and cyclonic storm surge models are currently inactive for this region.
        </p>
      </div>
    );
  }

  const {
    tideLevel,
    seaLevelAnomaly,
    waveHeight,
    stormSurge,
    coastalElevation,
    coastalInundationRiskScore,
    coastalInundationStatus,
    riverDischargeAtCoast,
    drainageCondition,
    compoundFormula,
    cyclone
  } = coastalData;

  return (
    <div className="space-y-6">
      {/* 1. Marine & Tidal Overview Banner */}
      <div className="gis-panel space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <Anchor className="w-6 h-6 text-sky-400" />
              <h3 className="text-2xl font-extrabold text-white">Coastal Marine Dynamics & Storm Surge Model</h3>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              Compound inundation coupling astronomical tides, wind-driven surge, and river estuary backpressure.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Estuary Risk:</span>
            <span className="text-xs font-bold px-3.5 py-1.5 rounded-full badge-high font-mono">
              Score {coastalInundationRiskScore}/100 – High Inundation
            </span>
          </div>
        </div>

        {/* Coastal Oceanographic KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Tidal Elevation</div>
            <div className="text-2xl font-extrabold font-mono text-sky-300">
              +{tideLevel?.current} {tideLevel?.unit}
            </div>
            <div className="text-xs text-slate-400 font-medium truncate" title={tideLevel?.tidePhase}>
              {tideLevel?.tidePhase}
            </div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Storm Surge Height</div>
            <div className="text-2xl font-extrabold font-mono text-amber-300">
              +{stormSurge?.current} {stormSurge?.unit}
            </div>
            <div className="text-xs text-slate-400 font-medium">Peak Fc: +{stormSurge?.forecastPeak} m</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Significant Waves</div>
            <div className="text-2xl font-extrabold font-mono text-blue-300">
              {waveHeight?.significant} {waveHeight?.unit}
            </div>
            <div className="text-xs text-slate-400 font-medium">Max: {waveHeight?.max}m ({waveHeight?.direction})</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">River Coast Outfall</div>
            <div className="text-2xl font-extrabold font-mono text-teal-300">
              {riverDischargeAtCoast}
            </div>
            <div className="text-xs text-slate-400 font-medium">Estuary discharge</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Coastal Elevation</div>
            <div className="text-xl font-extrabold font-mono text-purple-300">
              {coastalElevation}
            </div>
            <div className="text-xs text-slate-400 font-medium">Above Mean Sea Level</div>
          </div>
        </div>

        {/* Compound Risk Calculation Formula Box */}
        <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/15 space-y-2.5 text-sm">
          <div className="flex items-center justify-between">
            <strong className="text-sky-300 uppercase tracking-wider font-extrabold text-sm">Compound Coastal Flood Equation:</strong>
            <span className="font-mono text-sky-400 font-bold text-sm">Total Index: {compoundFormula?.total}/100</span>
          </div>
          <div className="font-mono text-xs text-slate-200 bg-slate-900/90 p-3 rounded-xl border border-white/10">
            {compoundFormula?.formula}
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            {compoundFormula?.interpretation}
          </p>
        </div>
      </div>

      {/* 2. Cyclone Warning & Forecast Track */}
      {cyclone && (
        <div className="gis-panel space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Wind className="w-6 h-6 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
              <div>
                <h4 className="text-xl font-extrabold text-white">{cyclone.name}</h4>
                <p className="text-sm text-rose-300 font-bold">{cyclone.intensityCategory}</p>
              </div>
            </div>

            <div className="text-sm font-mono text-right text-slate-300 space-y-0.5">
              <div>Central Pressure: <strong className="text-white font-bold">{cyclone.centralPressure}</strong></div>
              <div>Max Sustained Winds: <strong className="text-rose-400 font-bold">{cyclone.maxSustainedWinds}</strong></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-[#080e1c] p-4 rounded-xl border border-white/10 space-y-1">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider block">Current Eye Position</span>
              <strong className="text-white text-base font-bold block">{cyclone.currentPosition.label}</strong>
              <div className="text-sky-300 font-mono text-xs font-semibold">
                {cyclone.currentPosition.lat}° N, {cyclone.currentPosition.lon}° E
              </div>
            </div>

            <div className="bg-[#080e1c] p-4 rounded-xl border border-white/10 space-y-1">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider block">Forward Movement & Projected Landfall</span>
              <strong className="text-white text-base font-bold block">{cyclone.movementSpeed}</strong>
              <div className="text-amber-300 text-xs font-medium">{cyclone.forecastLandfall}</div>
            </div>
          </div>

          {/* Cyclone Track Table */}
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="intel-table">
              <thead>
                <tr>
                  <th>Forecast Time</th>
                  <th>Coordinates</th>
                  <th>Intensity Stage</th>
                  <th>Sustained Wind Speed</th>
                </tr>
              </thead>
              <tbody>
                {(cyclone.trackWaypoints || []).map((wp, idx) => (
                  <tr key={idx} className={wp.time === 'Current' ? 'bg-rose-950/30 font-bold' : ''}>
                    <td className="font-mono text-white text-sm font-bold">{wp.time}</td>
                    <td className="font-mono text-sky-300 text-sm font-semibold">{wp.lat}° N, {wp.lon}° E</td>
                    <td className="text-sm text-slate-200 font-medium">{wp.intensity}</td>
                    <td className="font-mono text-rose-300 text-sm font-bold">{wp.windSpeed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
