import React, { useState, useMemo } from 'react';
import { 
  History, 
  Search, 
  ArrowUpDown, 
  Filter, 
  Activity, 
  Calendar, 
  Download,
  AlertTriangle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function HistoricalIntel({ historicalData }) {
  const [filterQuery, setFilterQuery] = useState('');
  const [sortField, setSortField] = useState('year');
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' or 'desc'
  const [onlyFloods, setOnlyFloods] = useState(false);

  if (!historicalData || !Array.isArray(historicalData)) {
    return (
      <div className="p-16 text-center text-slate-400 space-y-3">
        <Activity className="w-8 h-8 animate-spin mx-auto text-sky-400" />
        <span className="text-base font-semibold">Loading 55-year historical intelligence records...</span>
      </div>
    );
  }

  // Filter and sort table data
  const filteredData = useMemo(() => {
    let list = [...historicalData];

    if (onlyFloods) {
      list = list.filter(item => item.floodEvents > 0 || item.isSuperEvent);
    }

    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      list = list.filter(item => 
        item.year.toString().includes(q) ||
        (item.eventName && item.eventName.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [historicalData, filterQuery, sortField, sortDirection, onlyFloods]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header and 55-Year Analytics Overview */}
      <div className="gis-panel space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <History className="w-6 h-6 text-sky-400" />
              <h3 className="text-2xl font-extrabold text-white">55-Year Historical Intelligence (1970 – 2025)</h3>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              Decadal hydro-climatological trends, extreme monsoon surges, and historical recovery durations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-sky-300 px-3 py-1.5 rounded-full bg-slate-900 border border-white/15">
              55 Annual Cycles Logged
            </span>
          </div>
        </div>

        {/* 55-Year Time Series Chart: Annual Rainfall & Max 24h Rainfall */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-extrabold uppercase text-white text-sm tracking-wider">
              Annual Cumulative Rainfall (mm) & Max 24-Hour Deluge Trend (1970–2025)
            </span>
            <div className="flex items-center gap-4 text-xs font-mono font-bold">
              <span className="text-sky-400 flex items-center gap-1.5">
                <span className="w-3.5 h-2 bg-sky-500/70 border border-sky-400 rounded-sm"></span> Annual Rain (mm)
              </span>
              <span className="text-amber-400 flex items-center gap-1.5">
                <span className="w-3.5 h-0.5 bg-amber-400"></span> Max 24h Rain (mm)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={historicalData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} interval={4} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={11} unit="mm" />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} unit="mm" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', fontSize: '13px' }}
                />
                <Bar yAxisId="left" dataKey="annualRainfall" name="Annual Rain (mm)" fill="#0284c7" opacity={0.7} radius={[3, 3, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="max24hRainfall" name="Max 24h Rain (mm)" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. Interactive Historical Events Table */}
      <div className="gis-panel space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h4 className="text-base font-extrabold text-white uppercase tracking-wider">Historical Flood Event Registry</h4>
            <p className="text-sm text-slate-300 font-medium">Click any column header to sort</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Flood filter toggle */}
            <button
              onClick={() => setOnlyFloods(prev => !prev)}
              className={onlyFloods ? "btn-primary text-sm font-bold" : "btn-secondary text-sm font-bold"}
            >
              <Filter className="w-4 h-4" />
              <span>{onlyFloods ? 'Showing Flood Events Only' : 'Filter Flood Events'}</span>
            </button>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search year or event..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="input-gis pl-9 pr-3 py-1.5 text-sm w-56"
              />
            </div>
          </div>
        </div>

        {/* Historical Table */}
        <div className="overflow-x-auto max-h-96 overflow-y-auto rounded-xl border border-white/10">
          <table className="intel-table">
            <thead className="sticky top-0 z-10 bg-[#091122]">
              <tr>
                <th onClick={() => handleSort('year')} className="cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1.5">
                    <span>Year</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th onClick={() => handleSort('annualRainfall')} className="cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1.5">
                    <span>Annual Rain</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th onClick={() => handleSort('max24hRainfall')} className="cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1.5">
                    <span>Max 24h Rain</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th onClick={() => handleSort('floodEvents')} className="cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1.5">
                    <span>Flood Events</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th onClick={() => handleSort('maxExtentKm2')} className="cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1.5">
                    <span>Max Extent</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th onClick={() => handleSort('maxDepthM')} className="cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1.5">
                    <span>Max Depth</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th onClick={() => handleSort('avgDurationHours')} className="cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1.5">
                    <span>Avg Duration</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th onClick={() => handleSort('recoveryDays')} className="cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1.5">
                    <span>Recovery Time</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th>Event Classification</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.year} className={row.isSuperEvent ? 'bg-red-950/25 font-medium' : ''}>
                  <td className="font-mono font-bold text-white text-sm">
                    {row.year}
                    {row.isSuperEvent && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-red-600 text-white font-extrabold tracking-wide">
                        DELUGE
                      </span>
                    )}
                  </td>
                  <td className="font-mono font-semibold">{row.annualRainfall} mm</td>
                  <td className="font-mono text-sky-400 font-bold">{row.max24hRainfall} mm</td>
                  <td className="font-mono">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      row.floodEvents > 2 ? 'badge-extreme' : (row.floodEvents > 0 ? 'badge-mod' : 'text-slate-400')
                    }`}>
                      {row.floodEvents}
                    </span>
                  </td>
                  <td className="font-mono font-semibold">{row.maxExtentKm2} km²</td>
                  <td className="font-mono text-blue-300 font-semibold">{row.maxDepthM} m</td>
                  <td className="font-mono font-medium">{row.avgDurationHours} hrs</td>
                  <td className="font-mono text-emerald-400 font-bold">{row.recoveryDays} days</td>
                  <td className="text-sm text-slate-200 font-medium">{row.eventName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
