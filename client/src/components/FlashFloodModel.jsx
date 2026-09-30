import React, { useState } from 'react';
import { 
  Sliders, 
  Droplets, 
  Compass, 
  Mountain, 
  GitBranch, 
  Layers, 
  RotateCcw,
  Info,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function FlashFloodModel({ dashboard, locationData }) {
  const initialRain = dashboard?.currentRainfall?.last24h || 182;
  const initialSoil = dashboard?.soilSaturation?.value || 78;
  const initialSlope = locationData?.id === 'guwahati' ? 14 : (locationData?.id === 'mumbai' ? 11 : 9);
  const initialWatershed = locationData?.id === 'guwahati' ? 14 : 11;
  const initialDrainage = locationData?.id === 'mumbai' ? 9 : 8;

  const [rainfallInput, setRainfallInput] = useState(initialRain);
  const [soilInput, setSoilInput] = useState(initialSoil);
  const [slopeScore, setSlopeScore] = useState(initialSlope);
  const [watershedScore, setWatershedScore] = useState(initialWatershed);
  const [drainageScore, setDrainageScore] = useState(initialDrainage);

  // Dynamic formula calculation
  const calculatedRainScore = Math.min(35, Math.round((rainfallInput / 200) * 35));
  const calculatedSoilScore = Math.min(25, Math.round((soilInput / 100) * 25));
  const totalScore = Math.min(100, calculatedRainScore + calculatedSoilScore + slopeScore + watershedScore + drainageScore);

  const getSeverity = (score) => {
    if (score >= 75) return { label: 'HIGH', color: 'text-red-400', badgeClass: 'badge-extreme' };
    if (score >= 45) return { label: 'MODERATE', color: 'text-amber-400', badgeClass: 'badge-mod' };
    return { label: 'LOW', color: 'text-emerald-400', badgeClass: 'badge-low' };
  };

  const severity = getSeverity(totalScore);

  const resetToLive = () => {
    setRainfallInput(initialRain);
    setSoilInput(initialSoil);
    setSlopeScore(initialSlope);
    setWatershedScore(initialWatershed);
    setDrainageScore(initialDrainage);
  };

  const components = [
    { name: 'Rainfall Accumulation & Intensity', score: calculatedRainScore, max: 35, pct: Math.round((calculatedRainScore / 35) * 100), color: 'bg-sky-500' },
    { name: 'Antecedent Soil Saturation', score: calculatedSoilScore, max: 25, pct: Math.round((calculatedSoilScore / 25) * 100), color: 'bg-emerald-500' },
    { name: 'Terrain Slope & Flow Acceleration', score: slopeScore, max: 15, pct: Math.round((slopeScore / 15) * 100), color: 'bg-amber-500' },
    { name: 'Watershed Tributary Confluence', score: watershedScore, max: 15, pct: Math.round((watershedScore / 15) * 100), color: 'bg-blue-500' },
    { name: 'Drainage Imperviousness & Impedance', score: drainageScore, max: 10, pct: Math.round((drainageScore / 10) * 100), color: 'bg-rose-500' }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Executive Score */}
      <div className="gis-panel space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Rule-Based Formulation</span>
            <h3 className="text-2xl font-extrabold text-white">Flash-Flood Potential Model</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal mt-1">
              Deterministic scoring based on kinematic wave flow, antecedent moisture capacity, and terrain elevation gradients.
            </p>
          </div>

          <button onClick={resetToLive} className="btn-secondary text-sm font-bold self-start md:self-auto">
            <RotateCcw className="w-4 h-4 text-sky-400" />
            <span>Reset to Live Values</span>
          </button>
        </div>

        {/* Hero Score Pod */}
        <div className="p-6 rounded-2xl bg-[#080e1c] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="text-center px-5 py-3 rounded-2xl bg-slate-900 border border-white/10 shadow-md">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider block mb-1">Flash Score</span>
              <div className="text-4xl font-extrabold font-mono text-sky-400 flex items-baseline justify-center">
                {totalScore}
                <span className="text-sm font-semibold text-slate-400 ml-1">/100</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Potential:</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${severity.badgeClass}`}>
                  {severity.label}
                </span>
              </div>
              <div className="text-base font-extrabold text-white">
                Score: {totalScore} / 100 – {severity.label} POTENTIAL
              </div>
              <div className="text-xs text-slate-300 font-mono font-medium leading-relaxed">
                Formula: Rain ({calculatedRainScore}) + Soil ({calculatedSoilScore}) + Terrain ({slopeScore}) + Watershed ({watershedScore}) + Drainage ({drainageScore})
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-300 hidden sm:block space-y-1">
            <div>Target Catchment: <strong className="text-white text-sm font-bold">{locationData?.name}</strong></div>
            <div className="text-emerald-400 font-bold text-xs">Real-Time Interactive Mode Active</div>
          </div>
        </div>
      </div>

      {/* 2. Visual Component Contributions & Progress Bars */}
      <div className="gis-panel space-y-5">
        <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-white/10 pb-3">
          Mathematical Component Contributions
        </h4>

        <div className="space-y-4">
          {components.map((comp, idx) => (
            <div key={idx} className="bg-[#080e1c] p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-white">{comp.name}</span>
                <span className="font-mono font-extrabold text-sky-400">
                  {comp.score} <span className="text-slate-400 font-normal text-xs">/ {comp.max} pts</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${comp.color}`}
                  style={{ width: `${comp.pct}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-slate-400 font-mono font-medium">
                <span>0 pts</span>
                <span className="text-slate-300 font-semibold">{comp.pct}% Contribution Capacity</span>
                <span>{comp.max} max pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Tuning Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Precipitation & Soil Sliders */}
        <div className="gis-panel p-6 space-y-5">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
            <Sliders className="w-4 h-4 text-sky-400" />
            <span>Hydrometeorological Variables</span>
          </h4>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-200 font-bold">24h Cumulative Precipitation</span>
              <span className="font-mono text-sky-400 font-extrabold text-base">{rainfallInput} mm</span>
            </div>
            <input
              type="range"
              min={0}
              max={300}
              step={2}
              value={rainfallInput}
              onChange={(e) => setRainfallInput(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono font-medium">
              <span>0 mm (Dry)</span>
              <span className="text-slate-300 font-semibold">Yields: {calculatedRainScore} / 35 pts</span>
              <span>300 mm (Extreme)</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-slate-200 font-bold">Antecedent Soil Moisture Saturation</span>
              <span className="font-mono text-emerald-400 font-extrabold text-base">{soilInput}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={1}
              value={soilInput}
              onChange={(e) => setSoilInput(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono font-medium">
              <span>10% (Porous)</span>
              <span className="text-slate-300 font-semibold">Yields: {calculatedSoilScore} / 25 pts</span>
              <span>100% (Saturated)</span>
            </div>
          </div>
        </div>

        {/* Morphometric Sliders */}
        <div className="gis-panel p-6 space-y-5">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
            <Mountain className="w-4 h-4 text-amber-400" />
            <span>Catchment & Drainage Variables</span>
          </h4>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-200 font-bold">Terrain Slope & Relief Factor</span>
              <span className="font-mono text-amber-400 font-extrabold text-base">{slopeScore} / 15 pts</span>
            </div>
            <input
              type="range"
              min={2}
              max={15}
              value={slopeScore}
              onChange={(e) => setSlopeScore(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono font-medium">
              <span>Flat Basin</span>
              <span className="text-slate-300 font-semibold">Yields: {slopeScore} / 15 pts</span>
              <span>Steep Foothills</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-slate-200 font-bold">Drainage Imperviousness Index</span>
              <span className="font-mono text-rose-400 font-extrabold text-base">{drainageScore} / 10 pts</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={drainageScore}
              onChange={(e) => setDrainageScore(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono font-medium">
              <span>Permeable Soil</span>
              <span className="text-slate-300 font-semibold">Yields: {drainageScore} / 10 pts</span>
              <span>Urban Concrete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
