import React from 'react';
import { 
  CloudRain, 
  Wind, 
  Thermometer, 
  Gauge, 
  Zap, 
  Radio, 
  Satellite, 
  Activity, 
  Clock, 
  Compass, 
  CheckCircle2, 
  Droplet 
} from 'lucide-react';

export default function WeatherStations({ weatherData }) {
  if (!weatherData) {
    return (
      <div className="p-16 text-center text-slate-400 space-y-3">
        <Activity className="w-8 h-8 animate-spin mx-auto text-sky-400" />
        <span className="text-base font-semibold">Loading multi-sensor meteorological feeds...</span>
      </div>
    );
  }

  const { stations, currentReadings, lastUpdated, source } = weatherData;

  return (
    <div className="space-y-6">
      {/* 1. Live Weather Sensor Readings */}
      <div className="gis-panel space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <Radio className="w-6 h-6 text-sky-400" />
              <h3 className="text-2xl font-extrabold text-white">Live Meteorological Telemetry & Atmospheric Mesh</h3>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              Synchronized automated observation feeds from surface Doppler weather radar, AWS, and geostationary satellites.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-slate-400">Data Source:</span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 text-sky-300 border border-sky-500/40 font-bold font-mono">
              {source}
            </span>
          </div>
        </div>

        {/* Real-time Atmospheric Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span>Temperature</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {currentReadings?.temperatureC}°C
            </div>
            <div className="text-xs text-slate-400 font-medium">Dew point: 25.2°C</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <Droplet className="w-4 h-4 text-blue-400" />
              <span>Humidity</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-blue-300">
              {currentReadings?.humidityPct}%
            </div>
            <div className="text-xs text-slate-400 font-medium">Near saturation</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <Wind className="w-4 h-4 text-teal-400" />
              <span>Wind Speed</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-teal-300">
              {currentReadings?.windSpeedKmph} <span className="text-xs font-semibold text-slate-400">km/h</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Dir: {currentReadings?.windDirection}</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <Gauge className="w-4 h-4 text-purple-400" />
              <span>Pressure</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-purple-300">
              {currentReadings?.pressureHpa} <span className="text-xs font-semibold text-slate-400">hPa</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Barometric trough</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Lightning</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-yellow-300">
              {currentReadings?.lightningActivity25km?.split(' ')?.[0] || '18'} <span className="text-xs font-semibold text-slate-400">strikes</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">25km radius (30m)</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <CloudRain className="w-4 h-4 text-sky-400" />
              <span>Forecast 24h</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-sky-300">
              +{currentReadings?.forecastRainfall24h} <span className="text-xs font-semibold text-slate-400">mm</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">NWP Ensemble</div>
          </div>
        </div>
      </div>

      {/* 2. Sensor Stations Grid */}
      <div className="gis-panel space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Satellite className="w-6 h-6 text-purple-400" />
          <h4 className="text-xl font-extrabold text-white">Station Observation Nodes & Ground Mesh</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(stations || []).map((stn, idx) => (
            <div key={idx} className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 flex items-start justify-between gap-4 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-base font-extrabold text-white">{stn.name}</span>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-white/10">
                    {stn.type}
                  </span>
                </div>
                {stn.rainfall1h !== undefined && (
                  <div className="text-sm text-slate-300 font-mono">
                    1-Hour Precipitation Rate: <strong className="text-sky-400 font-bold">{stn.rainfall1h} mm/h</strong>
                  </div>
                )}
                {stn.reflectivityDbz !== undefined && (
                  <div className="text-sm text-slate-300 font-mono">
                    Doppler Reflectivity: <strong className="text-amber-400 font-bold">{stn.reflectivityDbz} dBZ</strong> (Echo Top: {stn.echoTopsKm} km)
                  </div>
                )}
                {stn.cloudTopTempC !== undefined && (
                  <div className="text-sm text-slate-300 font-mono">
                    Cloud Top Temp: <strong className="text-purple-300 font-bold">{stn.cloudTopTempC}°C</strong> (Deep Convective Plume)
                  </div>
                )}
                <div className="text-xs text-slate-400 font-medium">Telemetry status: {stn.status}</div>
              </div>

              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ONLINE</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">Latency: {stn.latency || '2s'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
