import React, { useState } from 'react';
import { 
  Activity, 
  MapPin, 
  ChevronRight, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  FileText,
  Sliders,
  Waves
} from 'lucide-react';

import CurrentRiskCard from './dashboard/CurrentRiskCard';
import KeyConditionsGrid from './dashboard/KeyConditionsGrid';
import WeatherHydroOutlook from './dashboard/WeatherHydroOutlook';
import FloodIntelligencePanel from './dashboard/FloodIntelligencePanel';
import RiskFactorsPanel from './dashboard/RiskFactorsPanel';
import DashboardMapPreview from './dashboard/DashboardMapPreview';

export default function MainDashboard({ 
  dashboard, 
  locationData,
  riverData,
  rainfallData,
  weatherData,
  reservoirData,
  coastalData,
  onExploreMap, 
  onExploreFlashFlood,
  onSelectTab
}) {
  const [showScientificDetails, setShowScientificDetails] = useState(false);

  if (!dashboard) {
    return (
      <div className="flex flex-col items-center justify-center p-24 text-slate-400 gap-4">
        <Activity className="w-8 h-8 animate-spin text-sky-400" />
        <span className="text-base font-semibold">Synchronizing live hydrological telemetry...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. Location + System/Data Status Bar */}
      <div className="bg-[#090f1e] border border-white/10 rounded-2xl px-5 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm shadow-md">
        <div className="flex items-center gap-2.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <span className="font-extrabold text-white text-base">
            {locationData?.name || 'Monitored Catchment'}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-medium">
            {locationData?.state || 'State'}, {locationData?.country || 'India'}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-sky-300 font-mono font-bold text-xs px-2 py-0.5 rounded bg-sky-950/80 border border-sky-500/20">
            {locationData?.hydrologicalHierarchy?.basin || 'River Basin'}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="text-blue-300 font-semibold">
            {locationData?.hydrologicalHierarchy?.riverStream || 'Main Channel'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-200">Multi-Sensor Assimilation Active</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="font-mono text-slate-300 font-bold">
            Sync: {dashboard?.lastUpdated ? new Date(dashboard.lastUpdated).toLocaleTimeString() : 'Live'}
          </span>
        </div>
      </div>

      {/* 2. Redesigned Current Flood Risk Card */}
      <CurrentRiskCard dashboard={dashboard} />

      {/* 3. Key Hydrological Conditions (Responsive 8-card Grid) */}
      <KeyConditionsGrid dashboard={dashboard} />

      {/* 4. Weather & Hydrological Trends Section */}
      <WeatherHydroOutlook 
        riverData={riverData}
        rainfallData={rainfallData}
        dashboard={dashboard}
        weatherData={weatherData}
      />

      {/* 5. Flood Intelligence & Recommended Actions (Decision Engine) */}
      <FloodIntelligencePanel 
        dashboard={dashboard}
        locationData={locationData}
        onExploreMap={onExploreMap}
        onSelectTab={onSelectTab}
      />

      {/* 6. Diagnostic Contributing Risk Factors */}
      <RiskFactorsPanel 
        dashboard={dashboard}
        onExploreFlashFlood={onExploreFlashFlood}
        onSelectTab={onSelectTab}
      />

      {/* 7. GIS Map Spatial Preview */}
      <DashboardMapPreview 
        locationData={locationData}
        dashboard={dashboard}
        onExploreMap={onExploreMap}
      />

      {/* 8. Detailed Analysis & Scientific Accordion (Clean Expandable Section) */}
      <div className="gis-panel">
        <button
          onClick={() => setShowScientificDetails(prev => !prev)}
          className="w-full flex items-center justify-between text-sm text-slate-200 font-bold cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-sky-400" />
            <span>Advanced Scientific Formulations, Hydrological Weights & Model Disclaimers</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-sky-400 font-bold">
            <span>{showScientificDetails ? 'Hide Details' : 'Expand Details'}</span>
            {showScientificDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {showScientificDetails && (
          <div className="mt-5 pt-5 border-t border-white/10 space-y-5 text-sm text-slate-300 animate-in fade-in duration-200">
            {/* Formula Breakdown */}
            <div className="bg-[#080e1c] p-5 rounded-xl border border-white/10 space-y-3">
              <div className="font-bold text-white flex items-center gap-2.5 text-sm">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>Deterministic Flash Flood Risk Scoring Equation</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Risk score $S \in [0, 100]$ is computed deterministically from 5 weighted environmental inputs:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-white/10 space-y-1">
                  <span className="text-sky-400 block font-bold text-sm">Rainfall (35 pts)</span>
                  <span className="text-slate-300 block leading-relaxed">24h intensity & peak accumulation</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-white/10 space-y-1">
                  <span className="text-emerald-400 block font-bold text-sm">Soil Moisture (25 pts)</span>
                  <span className="text-slate-300 block leading-relaxed">Antecedent saturation index</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-white/10 space-y-1">
                  <span className="text-blue-400 block font-bold text-sm">Slope Relief (15 pts)</span>
                  <span className="text-slate-300 block leading-relaxed">Topographic wetness index</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-white/10 space-y-1">
                  <span className="text-purple-400 block font-bold text-sm">Watershed (15 pts)</span>
                  <span className="text-slate-300 block leading-relaxed">Catchment drainage confluence</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-white/10 space-y-1">
                  <span className="text-amber-400 block font-bold text-sm">Drainage (10 pts)</span>
                  <span className="text-slate-300 block leading-relaxed">Impervious surface ratio</span>
                </div>
              </div>
            </div>

            {/* Scientific Disclaimers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 leading-relaxed">
                <strong className="text-white block mb-1.5 text-sm font-bold">DEM Routing Bathymetric Uncertainty:</strong>
                Satellite observations (Optical & SAR) detect surface water boundaries. Flood depth values are computed using Digital Elevation Model (DEM) hydrologic routing and carry uncertainty bounds of approximately ±0.15–0.30 meters.
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 leading-relaxed">
                <strong className="text-white block mb-1.5 text-sm font-bold">Statistical Return Periods:</strong>
                Recurrence return periods (e.g., 100-year event) represent annual exceedance probabilities (e.g., 1% annual probability under stationary assumptions) rather than literal calendar intervals.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3 leading-relaxed">
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-amber-300 font-bold">Prototype Notice:</strong> All predictions and telemetry are research proof-of-concept estimates. For life-safety and emergency evacuations, consult official advisories from the Central Water Commission (CWC), India Meteorological Department (IMD), and State Disaster Management Authorities (SDMA).
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
