import React from 'react';
import { 
  Droplets, 
  Waves, 
  Database, 
  Compass, 
  Layers, 
  ShieldCheck, 
  Sliders, 
  ArrowUpRight 
} from 'lucide-react';

export default function RiskFactorsPanel({ dashboard, onExploreFlashFlood, onSelectTab }) {
  if (!dashboard) return null;

  const {
    currentRainfall,
    soilSaturation,
    riverLevel,
    reservoirStorage,
    dataSourceStatus
  } = dashboard;

  const rain24h = currentRainfall?.last24h || 0;
  const soilVal = soilSaturation?.value || 0;
  const bankfullPct = riverLevel?.percentageOfBankfull || 0;
  const resPct = reservoirStorage?.percentage || 0;

  const factorRows = [
    {
      icon: Droplets,
      iconColor: 'text-sky-400',
      factor: '24-Hour Precipitation',
      currentValue: `${rain24h} mm`,
      threshold: '180 mm (Extreme Threshold)',
      pct: Math.min(100, Math.round((rain24h / 200) * 100)),
      contribution: `${Math.min(35, Math.round((rain24h / 200) * 35))} / 35 pts`,
      status: rain24h > 150 ? 'Critical' : 'Elevated',
      statusBadge: rain24h > 150 ? 'badge-extreme' : 'badge-high'
    },
    {
      icon: Compass,
      iconColor: 'text-emerald-400',
      factor: 'Antecedent Soil Saturation',
      currentValue: `${soilVal}%`,
      threshold: '75% (Runoff Threshold)',
      pct: soilVal,
      contribution: `${Math.min(25, Math.round((soilVal / 100) * 25))} / 25 pts`,
      status: soilVal > 80 ? 'Saturated' : 'Moist',
      statusBadge: soilVal > 80 ? 'badge-extreme' : 'badge-mod'
    },
    {
      icon: Waves,
      iconColor: 'text-blue-400',
      factor: 'River Channel Stage',
      currentValue: `${riverLevel?.current || 0} m (${bankfullPct}% Bankfull)`,
      threshold: `${riverLevel?.bankfull || 8.5} m (Bankfull Level)`,
      pct: Math.min(100, bankfullPct),
      contribution: `${Math.min(25, Math.round((bankfullPct / 100) * 25))} / 25 pts`,
      status: bankfullPct > 90 ? 'Danger Stage' : 'Warning Stage',
      statusBadge: bankfullPct > 90 ? 'badge-extreme' : 'badge-high'
    },
    {
      icon: Database,
      iconColor: 'text-purple-400',
      factor: 'Catchment Reservoir Storage',
      currentValue: `${resPct}% Full`,
      threshold: '85% (Spillway Release)',
      pct: resPct,
      contribution: `${Math.min(15, Math.round((resPct / 100) * 15))} / 15 pts`,
      status: resPct > 85 ? 'Spillway Active' : 'Buffer OK',
      statusBadge: resPct > 85 ? 'badge-high' : 'badge-low'
    },
    {
      icon: Layers,
      iconColor: 'text-amber-400',
      factor: 'Impervious Surface & Runoff Factor',
      currentValue: '+9.4% Built-up Expansion (2020–25)',
      threshold: 'CN 75 Curve Number',
      pct: 74,
      contribution: '8 / 10 pts',
      status: 'Infiltration Reduced',
      statusBadge: 'badge-mod'
    }
  ];

  return (
    <div className="gis-panel space-y-5">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
            Diagnostic Contributing Risk Factors & Hydro Breakdown
          </h3>
        </div>
        <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-900 px-3 py-1 rounded-md border border-white/10">
          Source: {dataSourceStatus || 'Simulated Sensor Feed'}
        </span>
      </div>

      {/* Factor Rows Grid */}
      <div className="space-y-3">
        {factorRows.map((row, idx) => {
          const Icon = row.icon;
          return (
            <div 
              key={idx} 
              className="bg-[#090f1e] p-4 sm:p-4.5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm"
            >
              {/* Factor Name & Icon */}
              <div className="flex items-center gap-3 min-w-[240px]">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10">
                  <Icon className={`w-5 h-5 ${row.iconColor}`} />
                </div>
                <div>
                  <span className="font-bold text-white block text-sm">{row.factor}</span>
                  <span className="text-xs text-slate-400 font-mono font-medium">Threshold: {row.threshold}</span>
                </div>
              </div>

              {/* Progress Meter */}
              <div className="flex-1 max-w-sm w-full space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300 font-mono font-semibold">
                  <span>Value: <strong className="text-white">{row.currentValue}</strong></span>
                  <span className="font-bold text-sky-400">{row.contribution}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      row.pct > 80 ? 'bg-red-500' : (row.pct > 50 ? 'bg-orange-500' : 'bg-sky-500')
                    }`}
                    style={{ width: `${row.pct}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-end">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.statusBadge}`}>
                  {row.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs text-slate-400 font-medium">
          Component weights calibrated via deterministic kinematic hydrologic equation
        </span>

        <button
          onClick={onExploreFlashFlood}
          className="btn-secondary text-sm font-bold flex items-center gap-2"
        >
          <Sliders className="w-4 h-4 text-sky-400" />
          <span>Inspect Transparent Formula Sliders</span>
          <ArrowUpRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
}
