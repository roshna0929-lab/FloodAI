import React from 'react';
import { 
  Layers, 
  Satellite, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Activity, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function LandUseChange({ landUseData }) {
  if (!landUseData) {
    return (
      <div className="p-16 text-center text-slate-400 space-y-3">
        <Activity className="w-8 h-8 animate-spin mx-auto text-sky-400" />
        <span className="text-base font-semibold">Loading land-use change detection intelligence...</span>
      </div>
    );
  }

  const { comparison, imperviousRunoffCoefficient, pipeline, scientificExplanation } = landUseData;

  const chartData = (comparison || []).map(item => ({
    name: item.category.split(' ')[0],
    fullName: item.category,
    '2020 Baseline (%)': item.year2020,
    '2025 Current (%)': item.year2025,
    change: item.change
  }));

  return (
    <div className="space-y-6">
      {/* 1. Header & Summary Banner */}
      <div className="gis-panel space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-emerald-400" />
              <h3 className="text-2xl font-extrabold text-white">Land-Use Change Detection (2020 vs 2025)</h3>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              Satellite-derived multispectral urban sprawl, wetland shrinkage, and impervious surface runoff coefficient evolution.
            </p>
          </div>

          <div className="bg-[#080e1c] px-4 py-2 rounded-xl border border-white/15 text-sm font-mono flex items-center gap-2 shadow-sm">
            <span className="text-slate-400">SCS-CN Runoff Coeff: </span>
            <span className="text-white font-bold">{imperviousRunoffCoefficient?.in2020}</span>
            <span className="text-slate-500">→</span>
            <span className="text-sky-400 font-extrabold">{imperviousRunoffCoefficient?.in2025}</span>
          </div>
        </div>

        {/* Scientific Explanation Alert */}
        <div className="p-5 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-sm text-slate-200 flex items-start gap-3.5 leading-relaxed">
          <Info className="w-6 h-6 text-sky-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <strong className="text-sky-300 font-bold block text-sm">Hydrologic Runoff Law:</strong>
            <p className="leading-relaxed font-normal">“{scientificExplanation}”</p>
            <div className="text-xs text-amber-300 font-mono font-bold mt-1">{imperviousRunoffCoefficient?.impact}</div>
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side Comparison Table and Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparison Table */}
        <div className="gis-panel space-y-4">
          <h4 className="text-base font-extrabold text-white uppercase tracking-wider border-b border-white/10 pb-3">
            Surface Category Transition Matrix (2020 vs 2025)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="intel-table">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>2020</th>
                  <th>2025</th>
                  <th>Net Change</th>
                </tr>
              </thead>
              <tbody>
                {(comparison || []).map((row, idx) => (
                  <tr key={idx}>
                    <td className="font-bold text-white text-sm">{row.category}</td>
                    <td className="font-mono text-slate-300 font-semibold">{row.year2020}%</td>
                    <td className="font-mono text-sky-400 font-bold">{row.year2025}%</td>
                    <td>
                      <span className={`inline-flex items-center gap-1.5 font-mono font-bold text-xs px-2.5 py-1 rounded-full ${
                        row.change > 0 && (row.category.includes('Built-up') || row.category.includes('Roads'))
                          ? 'badge-extreme'
                          : (row.change < 0 && (row.category.includes('Vegetation') || row.category.includes('Wetlands'))
                            ? 'badge-high'
                            : 'badge-low')
                      }`}>
                        {row.change > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {row.change > 0 ? `+${row.change}%` : `${row.change}%`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Bar Chart */}
        <div className="gis-panel space-y-4">
          <h4 className="text-base font-extrabold text-white uppercase tracking-wider border-b border-white/10 pb-3">
            Land Cover Distribution Shift (%)
          </h4>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', fontSize: '13px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="2020 Baseline (%)" fill="#64748b" radius={[6, 6, 0, 0]} />
                <Bar dataKey="2025 Current (%)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Simulated Monitoring Pipeline */}
      <div className="gis-panel space-y-4">
        <div className="text-sm uppercase font-extrabold text-white tracking-wider border-b border-white/10 pb-3">
          Autonomous Satellite Land-Cover Change Detection Pipeline
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {(pipeline || []).map((step) => (
            <div key={step.step} className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-mono text-xs font-bold flex items-center justify-center border border-sky-500/40">
                    {step.step}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {step.status}
                  </span>
                </div>
                <div className="text-sm font-bold text-white mb-1">{step.name}</div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {step.source || step.method || step.baseline || step.metric || step.integration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
