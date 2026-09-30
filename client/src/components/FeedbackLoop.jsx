import React from 'react';
import { 
  RefreshCw, 
  ArrowRight, 
  Database, 
  Activity, 
  CloudRain, 
  Waves, 
  Layers, 
  Clock, 
  ShieldCheck, 
  History, 
  CheckCircle2, 
  Cpu 
} from 'lucide-react';

export default function FeedbackLoop({ lastUpdated, onManualRefresh, isRefreshing }) {
  const steps = [
    { num: 1, name: 'Historical Baseline Data', desc: '55-year baseline precipitation & flood return frequencies', icon: History, color: 'text-blue-400' },
    { num: 2, name: 'Baseline Terrain Model', desc: 'SCS-CN curve numbers and digital elevation bathymetry', icon: Cpu, color: 'text-indigo-400' },
    { num: 3, name: 'Current Live Telemetry', desc: 'Live AWS rain gauges, Doppler radar dBZ, & river stages', icon: CloudRain, color: 'text-sky-400' },
    { num: 4, name: 'Current Risk Matrix', desc: 'Synchronous assessment of soil saturation & bankfull stages', icon: Activity, color: 'text-amber-400' },
    { num: 5, name: 'NWP Forecast Feeds', desc: '24h/48h ensemble rainfall predictions and upstream runoff', icon: CloudRain, color: 'text-sky-400' },
    { num: 6, name: 'Future Risk Projection', desc: 'Projected hydrograph peaks and reservoir surcharge risk', icon: Activity, color: 'text-orange-400' },
    { num: 7, name: 'Satellite Inundation', desc: 'Copernicus Sentinel-1 SAR backscatter & water delineation', icon: Layers, color: 'text-rose-400' },
    { num: 8, name: 'Extent & Depth Routing', desc: '2D hydraulic routing over high-resolution elevation grid', icon: Waves, color: 'text-purple-400' },
    { num: 9, name: 'Recession Monitoring', desc: 'Pumping operations and gravity outfall discharge tracking', icon: Clock, color: 'text-teal-400' },
    { num: 10, name: 'Recovery Analytics', desc: 'Drainage decay curves compared against historical norms', icon: RefreshCw, color: 'text-emerald-400' },
    { num: 11, name: 'Ground Truth Validation', desc: 'CWPRS sensors, citizen IoT, & UAV photo verification', icon: ShieldCheck, color: 'text-emerald-400' },
    { num: 12, name: 'Historical Archive Loop', desc: 'Re-assimilate validated event into 55-year baseline repository', icon: Database, color: 'text-sky-300' }
  ];

  return (
    <div className="space-y-6">
      <div className="gis-panel space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <RefreshCw className={`w-6 h-6 text-sky-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <h3 className="text-2xl font-extrabold text-white">Continuous Live Data & Feedback Assimilation Loop</h3>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              End-to-end cyclic assimilation pipeline running every 30 seconds to refresh, recalculate, route, and calibrate flood intelligence.
            </p>
          </div>

          <button
            onClick={onManualRefresh}
            disabled={isRefreshing}
            className="btn-primary text-sm font-bold"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Simulate Pipeline Cycle</span>
          </button>
        </div>

        {/* 12-Step Visual Graph */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num} 
                className="bg-[#080e1c] p-5 rounded-2xl border border-white/10 relative hover:border-sky-500/50 transition-all flex flex-col justify-between space-y-3 group shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-sky-300 text-xs font-mono font-bold flex items-center justify-center border border-white/15">
                      {step.num}
                    </span>
                    <Icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {step.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Synchronized</span>
                  </span>
                  <span className="font-mono">Step {step.num}/12</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cyclic Return Indicator */}
        <div className="p-5 rounded-2xl bg-sky-950/30 border border-sky-500/30 text-sm text-center text-slate-200 flex items-center justify-center gap-3 leading-relaxed">
          <RefreshCw className="w-5 h-5 text-sky-400 animate-spin flex-shrink-0" style={{ animationDuration: '10s' }} />
          <span>
            Every observation cycle completes at <strong className="text-white">Step 12</strong> by updating the statistical baseline, continually reducing uncertainty for future flash flood forecasts.
          </span>
        </div>
      </div>
    </div>
  );
}
