import React from 'react';
import { 
  Waves, 
  Database, 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Activity, 
  Droplets, 
  Info, 
  CheckCircle2 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';

export default function RiverReservoir({ riverData, reservoirData }) {
  if (!riverData) {
    return (
      <div className="p-16 text-center text-slate-400 space-y-3">
        <Activity className="w-8 h-8 animate-spin mx-auto text-sky-400" />
        <span className="text-base font-semibold">Loading river and reservoir telemetry...</span>
      </div>
    );
  }

  const {
    name,
    location,
    width,
    geometry,
    currentLevel,
    bankfullLevel,
    bankfullPercentage,
    discharge,
    flowVelocity,
    upstreamRainfall,
    downstreamCondition,
    historicalMaxLevel,
    historicalFloodLevel,
    trend,
    estimatedTimeToThreshold,
    hydraulicCapacityNote,
    timeSeries
  } = riverData;

  const reservoirs = reservoirData?.reservoirs || [];

  return (
    <div className="space-y-6">
      {/* 1. River Intelligence Panel */}
      <div className="gis-panel space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <Waves className="w-6 h-6 text-sky-400" />
              <h3 className="text-2xl font-extrabold text-white">{name}</h3>
            </div>
            <p className="text-sm text-slate-300 font-medium">{location}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
              trend === 'rising' ? 'badge-extreme' :
              trend === 'falling' ? 'badge-low' :
              'badge-high'
            }`}>
              {trend === 'rising' && <TrendingUp className="w-4 h-4" />}
              {trend === 'falling' && <TrendingDown className="w-4 h-4" />}
              {trend === 'stable' && <Minus className="w-4 h-4" />}
              <span>Trend: {trend?.toUpperCase()}</span>
            </span>

            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-slate-900 border border-white/15 text-sky-300">
              Discharge: {discharge}
            </span>
          </div>
        </div>

        {/* River Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Current River Gauge</div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {currentLevel} m <span className="text-sm font-semibold text-slate-400">/ {bankfullLevel} m</span>
            </div>
            <div className="text-xs text-sky-300 font-mono font-bold">
              {bankfullPercentage}% of Bankfull Level
            </div>
          </div>

          <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Channel Morphology</div>
            <div className="text-base font-bold text-white">{width} Width</div>
            <div className="text-xs text-slate-300 truncate font-medium" title={geometry}>{geometry}</div>
          </div>

          <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Flow Dynamics</div>
            <div className="text-base font-bold text-white">Velocity: {flowVelocity}</div>
            <div className="text-xs text-slate-300 font-medium">Upstream Rain: <strong className="text-white">{upstreamRainfall} mm</strong></div>
          </div>

          <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Time to Danger Stage</div>
            <div className="text-base font-bold text-amber-300">{estimatedTimeToThreshold}</div>
            <div className="text-xs text-slate-300 font-medium">Hist. Record: <strong className="text-white font-mono">{historicalMaxLevel} m</strong></div>
          </div>
        </div>

        {/* Scientific Notice on Hydraulic Capacity */}
        <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-sm text-slate-200 flex items-start gap-3.5 leading-relaxed">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-bold">Hydraulic Capacity Notice:</strong> {hydraulicCapacityNote}
          </div>
        </div>

        {/* River Level Hydrograph Chart */}
        <div className="pt-5 border-t border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-sm uppercase font-extrabold text-white tracking-wider">
              River Stage Hydrograph (48-Hour Historical + 24-Hour Predictive Forecast)
            </div>
            <div className="flex items-center gap-4 text-xs font-mono font-semibold">
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="w-3 h-1 bg-sky-400 rounded-full"></span> Water Level (m)
              </span>
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-3 h-0.5 bg-red-400 border-dashed"></span> Bankfull ({bankfullLevel}m)
              </span>
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="w-3 h-0.5 bg-purple-400"></span> Hist Max ({historicalMaxLevel}m)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries || []} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} unit="m" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', fontSize: '13px' }}
                />
                <ReferenceLine y={bankfullLevel} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Bankfull Level', fill: '#ef4444', fontSize: 11 }} />
                <ReferenceLine y={historicalMaxLevel} stroke="#c084fc" strokeDasharray="2 2" label={{ value: 'Hist Max', fill: '#c084fc', fontSize: 11 }} />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  name="Water Level (m)" 
                  stroke="#38bdf8" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#38bdf8' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. Reservoir & Dam Intelligence Cascade */}
      <div className="gis-panel space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Database className="w-6 h-6 text-purple-400" />
          <div>
            <h3 className="text-xl font-extrabold text-white">Upstream Reservoirs & Controlled Storage</h3>
            <p className="text-sm text-slate-300 font-medium">Catchment impoundment status and downstream discharge gates</p>
          </div>
        </div>

        {/* Visual Cascade Process Flow */}
        <div className="p-5 rounded-2xl bg-[#080e1c] border border-white/10 space-y-3">
          <div className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Hydrological Cascade Pipeline:</div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2.5 rounded-xl border border-white/10 font-bold text-white">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span>Catchment Rainfall</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2.5 rounded-xl border border-white/10 font-bold text-white">
              <Waves className="w-4 h-4 text-blue-400" />
              <span>Inflow Runoff</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2.5 rounded-xl border border-white/10 font-bold text-white">
              <Database className="w-4 h-4 text-purple-400" />
              <span>Reservoir Storage</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2.5 rounded-xl border border-white/10 font-bold text-white">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Spillway Release</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <div className="flex items-center gap-2 bg-red-950/60 px-3.5 py-2.5 rounded-xl border border-red-500/40 font-bold text-red-300">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Downstream Risk</span>
            </div>
          </div>
        </div>

        {/* Reservoirs Table */}
        <div className="overflow-x-auto">
          <table className="intel-table">
            <thead>
              <tr>
                <th>Reservoir / Dam Name</th>
                <th>Current Storage</th>
                <th>Storage %</th>
                <th>Inflow</th>
                <th>Outflow</th>
                <th>Spillway Status</th>
                <th>Downstream Risk</th>
              </tr>
            </thead>
            <tbody>
              {reservoirs.map((res, idx) => (
                <tr key={idx}>
                  <td className="font-bold text-white">
                    <div>{res.name}</div>
                    <div className="text-xs text-slate-400 font-normal mt-0.5">{res.historicalCondition}</div>
                  </td>
                  <td className="font-mono font-semibold">{res.currentStorage}</td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-20 h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            res.storagePercentage > 90 ? 'bg-red-500' : (res.storagePercentage > 75 ? 'bg-amber-500' : 'bg-emerald-500')
                          }`}
                          style={{ width: `${res.storagePercentage}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-sm font-extrabold text-white">{res.storagePercentage}%</span>
                    </div>
                  </td>
                  <td className="font-mono font-bold text-sky-400">{res.inflow}</td>
                  <td className="font-mono font-bold text-amber-400">{res.outflow}</td>
                  <td className="text-sm text-slate-200 font-medium">{res.spillwayCondition}</td>
                  <td>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      res.downstreamRisk?.toLowerCase().includes('extreme') || res.downstreamRisk?.toLowerCase().includes('critical')
                        ? 'badge-extreme'
                        : (res.downstreamRisk?.toLowerCase().includes('high')
                          ? 'badge-high'
                          : 'badge-mod')
                    }`}>
                      {res.downstreamRisk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
