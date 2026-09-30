import React from 'react';
import { 
  CloudRain, 
  Activity, 
  AlertTriangle, 
  Info, 
  Calendar, 
  TrendingUp, 
  Layers,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';

export default function ExtremeRainfall({ rainfallData }) {
  if (!rainfallData) {
    return (
      <div className="p-16 text-center text-slate-400 space-y-3">
        <Activity className="w-8 h-8 animate-spin mx-auto text-sky-400" />
        <span className="text-base font-semibold">Loading extreme rainfall statistical analytics...</span>
      </div>
    );
  }

  const {
    max1h,
    max3h,
    max6h,
    max12h,
    max24h,
    multiDayCumulative,
    rainfallIntensity,
    rainfallAnomaly,
    anomalyCategory,
    historicalExtreme24h,
    comparisonWithHistoricalMax,
    returnPeriods,
    scientificWording
  } = rainfallData;

  const getAnomalyBadge = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'exceptional':
        return 'badge-extreme';
      case 'severe':
        return 'badge-high';
      case 'unusual':
        return 'badge-mod';
      default:
        return 'badge-low';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header and Anomaly Banner */}
      <div className="gis-panel space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <CloudRain className="w-6 h-6 text-sky-400" />
              <h3 className="text-2xl font-extrabold text-white">Extreme Rainfall Analytics & Frequency Analysis</h3>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              Gumbel extreme value distribution (GEV) and statistical annual exceedance recurrence intervals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Classification:</span>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${getAnomalyBadge(anomalyCategory)}`}>
              {anomalyCategory?.toUpperCase()} ANOMALY
            </span>
          </div>
        </div>

        {/* Intensity Accumulation Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Max 1-Hour</div>
            <div className="text-2xl font-extrabold font-mono text-sky-300">{max1h} mm</div>
            <div className="text-xs text-slate-400 font-medium">Peak cloudburst</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Max 3-Hour</div>
            <div className="text-2xl font-extrabold font-mono text-sky-300">{max3h} mm</div>
            <div className="text-xs text-slate-400 font-medium">Intense surge</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Max 6-Hour</div>
            <div className="text-2xl font-extrabold font-mono text-sky-300">{max6h} mm</div>
            <div className="text-xs text-slate-400 font-medium">Basin filling</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Max 12-Hour</div>
            <div className="text-2xl font-extrabold font-mono text-sky-300">{max12h} mm</div>
            <div className="text-xs text-slate-400 font-medium">Sustained storm</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Max 24-Hour</div>
            <div className="text-2xl font-extrabold font-mono text-amber-300">{max24h} mm</div>
            <div className="text-xs text-slate-400 font-medium">Daily total</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Multi-Day Cumul.</div>
            <div className="text-2xl font-extrabold font-mono text-red-400">{multiDayCumulative} mm</div>
            <div className="text-xs text-slate-400 font-medium">48-72h event</div>
          </div>
        </div>

        {/* Anomaly & Historical Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 text-sm text-slate-200 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Intensity & Anomaly</span>
              <strong className="text-white text-base font-extrabold block">{rainfallIntensity}</strong>
              <div className="text-sky-300 font-semibold text-sm">{rainfallAnomaly}</div>
            </div>
            <Activity className="w-10 h-10 text-sky-500/30 flex-shrink-0" />
          </div>

          <div className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 text-sm text-slate-200 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Historical Record Comparison</span>
              <strong className="text-white text-base font-extrabold block">{comparisonWithHistoricalMax}</strong>
              <div className="text-slate-300 text-xs font-medium">All-time 24h benchmark: <strong className="text-white font-mono">{historicalExtreme24h} mm</strong></div>
            </div>
            <Calendar className="w-10 h-10 text-amber-500/30 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* 2. Statistical Return Periods Table & Scientific Explanation */}
      <div className="gis-panel space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h4 className="text-xl font-extrabold text-white">Estimated Annual Exceedance Probability & Return Periods</h4>
        </div>

        {/* SCIENTIFICALLY CORRECT WORDING ALERT */}
        <div className="p-5 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-sm text-slate-200 flex items-start gap-3.5 leading-relaxed">
          <Info className="w-6 h-6 text-sky-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-sky-300 font-bold block text-sm">Scientific Hydrological Formulation:</strong>
            <p className="leading-relaxed font-normal">“{scientificWording}”</p>
          </div>
        </div>

        {/* Return Periods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(returnPeriods || []).map((rp, idx) => {
            const isExceeded = rp.currentStatus === 'Exceeded';
            const isApproaching = rp.currentStatus === 'Approaching';
            return (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  isExceeded 
                    ? 'bg-red-950/30 border-red-500/50' 
                    : isApproaching 
                      ? 'bg-amber-950/30 border-amber-500/50' 
                      : 'bg-slate-900/60 border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-extrabold text-white">{rp.period}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full font-mono ${
                      isExceeded ? 'badge-extreme' : (isApproaching ? 'badge-high' : 'badge-low')
                    }`}>
                      {rp.currentStatus}
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-extrabold text-sky-300 mt-2">
                    {rp.thresholdMm} <span className="text-sm font-semibold text-slate-400">mm / 24h</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-xs text-slate-300 flex justify-between font-medium">
                  <span className="text-slate-400">Frequency:</span>
                  <strong className="text-white font-bold">{rp.exceedanceProbability}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
