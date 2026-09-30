import React from 'react';
import { 
  Clock, 
  Droplets, 
  Maximize2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Activity, 
  History, 
  TrendingDown, 
  Info 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function FloodTimeline({ floodData }) {
  if (!floodData) {
    return (
      <div className="p-16 text-center text-slate-400 space-y-3">
        <Activity className="w-8 h-8 animate-spin mx-auto text-sky-400" />
        <span className="text-base font-semibold">Loading flood detection and recovery intelligence...</span>
      </div>
    );
  }

  const {
    floodExtentKm2,
    floodExtentUncertaintyRange,
    estimatedDepthM,
    peakDepthM,
    currentDurationHours,
    estimatedRecessionHours,
    historicalAvgRecoveryHours,
    confidenceInterval,
    recessionStatus,
    recessionPercentage,
    timeSincePeak,
    estimatedTimeToNormal,
    timelineStages,
    timeSeriesGraph,
    scientificDepthNote
  } = floodData;

  const recoveryProgressPct = recessionPercentage || 25;

  return (
    <div className="space-y-6">
      {/* 1. Summary & Current Status Banner */}
      <div className="gis-panel space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <Clock className="w-6 h-6 text-amber-400" />
              <h3 className="text-2xl font-extrabold text-white">Flood Event Stage & Recovery Timeline</h3>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              Multi-sensor satellite SAR extent tracking, hydrograph recession curves, and historical recovery comparison.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Recovery Status:</span>
            <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${
              recessionStatus === 'Flood rising' ? 'badge-extreme' :
              recessionStatus === 'Peak flooding' ? 'badge-high' :
              recessionStatus === 'Receding' ? 'badge-mod' :
              'badge-low'
            }`}>
              {recessionStatus} ({recoveryProgressPct}% Receded)
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Inundation Extent</div>
            <div className="text-3xl font-extrabold font-mono text-sky-300">
              {floodExtentKm2} km²
            </div>
            <div className="text-xs text-slate-300 font-medium">Bounds: <strong className="text-white font-mono">{floodExtentUncertaintyRange}</strong></div>
          </div>

          <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Estimated Depth & Peak</div>
            <div className="text-3xl font-extrabold font-mono text-blue-300">
              {estimatedDepthM}
            </div>
            <div className="text-xs text-slate-300 font-medium">Peak Channel: <strong className="text-white font-bold">{peakDepthM} m</strong></div>
          </div>

          <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Duration & Recession</div>
            <div className="text-3xl font-extrabold font-mono text-amber-300">
              {currentDurationHours} hrs
            </div>
            <div className="text-xs text-slate-300 font-medium">Since peak: <strong className="text-white">{timeSincePeak}</strong></div>
          </div>

          <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Recovery vs Historical</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-300">
              {estimatedTimeToNormal}
            </div>
            <div className="text-xs text-slate-300 font-medium">Historical Avg: <strong className="text-white font-mono">{historicalAvgRecoveryHours} hrs</strong></div>
          </div>
        </div>

        {/* Scientific Uncertainty Alert on Depth */}
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-sm text-slate-200 flex items-start gap-3.5 leading-relaxed">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-bold">Model Depth Disclaimer:</strong> {scientificDepthNote}
          </div>
        </div>
      </div>

      {/* 2. Sequential Event Progress Timeline */}
      <div className="gis-panel space-y-5">
        <div className="text-sm uppercase font-extrabold text-white tracking-wider border-b border-white/10 pb-3">
          Simulated Event Progression Sequence
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3.5">
          {(timelineStages || []).map((stage, idx) => {
            const isDone = stage.status === 'Completed' || stage.status === 'Passed';
            const isActive = stage.status === 'Active' || stage.status === 'Approaching';
            return (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                  isDone 
                    ? 'bg-[#080e1c] border-sky-500/30 text-slate-200' 
                    : isActive 
                      ? 'bg-amber-950/40 border-amber-500/50 text-white ring-1 ring-amber-500/40' 
                      : 'bg-slate-900/40 border-white/5 text-slate-400'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-white">
                      {stage.time}
                    </span>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    ) : isActive ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-white leading-snug">{stage.name}</div>
                  <div className="text-xs text-slate-300 leading-relaxed font-normal">{stage.detail}</div>
                </div>
                <div className="text-xs uppercase font-extrabold mt-2 text-sky-400 font-mono">
                  {stage.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Inundation Extent & Depth Decay Curve */}
      <div className="gis-panel space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="text-sm uppercase font-extrabold text-white tracking-wider">
            Temporal Inundation Extent (km²) & Flood Depth (m) Over Time
          </div>
          <div className="flex items-center gap-4 text-xs font-mono font-bold">
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-3.5 h-2 bg-sky-500/50 border border-sky-400 rounded-sm"></span> Flood Extent (km²)
            </span>
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-3.5 h-2 bg-blue-500/50 border border-blue-400 rounded-sm"></span> Depth (m)
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeriesGraph || []} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorExtent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorDepth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', fontSize: '13px' }}
              />
              <Area type="monotone" dataKey="extentKm2" name="Extent (km²)" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorExtent)" />
              <Area type="monotone" dataKey="depthM" name="Depth (m)" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDepth)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
