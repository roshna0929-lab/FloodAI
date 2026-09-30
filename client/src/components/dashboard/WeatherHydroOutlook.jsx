import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  Waves, 
  CloudRain, 
  Database, 
  Compass, 
  AlertCircle,
  Clock
} from 'lucide-react';

export default function WeatherHydroOutlook({ riverData, rainfallData, dashboard, weatherData }) {
  // 1. Prepare Hydrograph Time Series from riverData or fallback to calibrated series
  const riverTimeSeries = riverData?.timeSeries || [
    { time: '-24h', level: 5.8, bankfull: 8.5 },
    { time: '-18h', level: 6.4, bankfull: 8.5 },
    { time: '-12h', level: 7.1, bankfull: 8.5 },
    { time: '-6h',  level: 7.5, bankfull: 8.5 },
    { time: 'Now',   level: dashboard?.riverLevel?.current || 7.82, bankfull: dashboard?.riverLevel?.bankfull || 8.5 },
    { time: '+6h',  level: 8.25, bankfull: 8.5, isForecast: true },
    { time: '+12h', level: 8.42, bankfull: 8.5, isForecast: true },
    { time: '+18h', level: 8.10, bankfull: 8.5, isForecast: true },
    { time: '+24h', level: 7.60, bankfull: 8.5, isForecast: true }
  ];

  const bankfullVal = dashboard?.riverLevel?.bankfull || 8.5;

  // 2. Prepare Precipitation Dynamic Accumulation
  const rainAccumulationSeries = [
    { period: '1h', amount: dashboard?.currentRainfall?.last1h || 38.4, type: 'Observed' },
    { period: '3h', amount: dashboard?.currentRainfall?.last3h || 76.2, type: 'Observed' },
    { period: '6h', amount: dashboard?.currentRainfall?.last6h || 118.0, type: 'Observed' },
    { period: '24h', amount: dashboard?.currentRainfall?.last24h || 182.5, type: 'Observed' },
    { period: '+24h (fc)', amount: dashboard?.forecastRainfall?.next24h || 95.0, type: 'Forecast' },
    { period: '+48h (fc)', amount: dashboard?.forecastRainfall?.next48h || 152.0, type: 'Forecast' }
  ];

  // Custom tooltip for Hydrograph
  const CustomHydroTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isFc = label.includes('+') || label.includes('(fc)');
      return (
        <div className="bg-[#0f172a] border border-white/20 p-3 rounded-xl shadow-2xl text-xs font-mono space-y-1">
          <div className="text-slate-300 font-bold flex items-center justify-between gap-3">
            <span>Interval: {label}</span>
            {isFc && (
              <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 font-bold">
                Forecast
              </span>
            )}
          </div>
          <div className="text-sky-300 font-bold text-sm">
            Water Level: {payload[0]?.value} m
          </div>
          <div className="text-slate-400 text-xs">
            Bankfull: {bankfullVal} m
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for Rainfall
  const CustomRainTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0]?.payload;
      return (
        <div className="bg-[#0f172a] border border-white/20 p-3 rounded-xl shadow-2xl text-xs font-mono space-y-1">
          <div className="text-slate-300 font-bold flex items-center justify-between gap-3">
            <span>Window: {label}</span>
            <span className={`text-xs uppercase px-2 py-0.5 rounded-full font-bold ${
              item?.type === 'Forecast' ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40' : 'bg-sky-950/80 text-sky-300 border border-sky-500/40'
            }`}>
              {item?.type === 'Forecast' ? 'Simulated' : 'Observed'}
            </span>
          </div>
          <div className="text-white font-bold text-sm">
            Precipitation: {payload[0]?.value} mm
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="gis-panel space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider flex items-center gap-2.5">
              <span>Weather & Hydrological Outlook</span>
              <span className="text-xs font-mono px-3 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 font-bold">
                Simulated Forecast Active
              </span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal mt-0.5">
              Multi-sensor telemetry assimilation: 48h antecedent observations + 24h predictive hydrograph
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-300 font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-400"></span>
            <span>Recorded Stage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
            <span>Forecast (+6h to +24h)</span>
          </div>
        </div>
      </div>

      {/* Two-Column Visual Trend Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left (7 cols): Hydrograph Stage Curve */}
        <div className="lg:col-span-7 bg-[#090f1e] border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Waves className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                River Stage Hydrograph (48h Observed + 24h Forecast)
              </span>
            </div>
            <span className="text-xs font-mono text-slate-300 font-semibold">
              Current: <strong className="text-sky-300 font-bold">{dashboard?.riverLevel?.current} m</strong> / {bankfullVal} m
            </span>
          </div>

          {/* Hydrograph Chart */}
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riverTimeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="stageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  domain={[2, 10]}
                />
                <Tooltip content={<CustomHydroTooltip />} />
                <ReferenceLine 
                  y={bankfullVal} 
                  stroke="#ef4444" 
                  strokeDasharray="4 4" 
                  label={{ value: `Bankfull (${bankfullVal}m)`, fill: '#ef4444', fontSize: 11, position: 'insideTopRight' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#38bdf8" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#stageGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-medium">
            <span>Hydraulic status: <strong className="text-amber-300 font-bold">{dashboard?.riverLevel?.trend?.toUpperCase()}</strong></span>
            <span className="text-slate-400 font-mono">Dashed red line: Bankfull spill threshold</span>
          </div>
        </div>

        {/* Right (5 cols): Dynamic Rainfall Dynamics & Reservoir Buffer */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Rainfall Accumulation Chart */}
          <div className="bg-[#090f1e] border border-white/10 rounded-2xl p-5 flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Rainfall Dynamics
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-sky-400 bg-slate-900 px-2.5 py-1 rounded-md border border-white/10">
                24h: {dashboard?.currentRainfall?.last24h} mm
              </span>
            </div>

            <div className="h-[125px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rainAccumulationSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="period" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomRainTooltip />} />
                  <Bar dataKey="amount" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Environmental Gauges Status Strip */}
          <div className="bg-[#090f1e] border border-white/10 rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs">
            {/* Reservoir Gauge */}
            <div className="border-r border-white/10 pr-4 space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span>Dam Storage</span>
                </div>
                <span className="font-mono text-white text-sm font-extrabold">{dashboard?.reservoirStorage?.percentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${dashboard?.reservoirStorage?.percentage > 85 ? 'bg-amber-500' : 'bg-purple-500'}`}
                  style={{ width: `${dashboard?.reservoirStorage?.percentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-400 block truncate font-medium">
                {dashboard?.reservoirStorage?.status || 'Regulated Outflow'}
              </span>
            </div>

            {/* Soil Infiltration Buffer */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Soil Moisture</span>
                </div>
                <span className="font-mono text-white text-sm font-extrabold">{dashboard?.soilSaturation?.value}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${dashboard?.soilSaturation?.value > 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${dashboard?.soilSaturation?.value}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-400 block truncate font-medium">
                Infiltration Buffer: &lt;15 mm
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
