import React from 'react';
import { ShieldCheck, Activity, Info } from 'lucide-react';

export default function CurrentRiskCard({ dashboard }) {
  if (!dashboard) return null;

  const {
    riskLevel,
    riskScore,
    confidence,
    uncertaintyRange,
    riskExplanation,
    dataSourceStatus
  } = dashboard;

  const getRiskTheme = (level) => {
    switch (level?.toLowerCase()) {
      case 'extreme':
        return {
          textColor: 'text-red-400',
          badgeClass: 'badge-extreme',
          borderColor: 'border-red-500/40',
          bgAccent: 'bg-red-950/30',
          dotColor: 'bg-red-500'
        };
      case 'high':
        return {
          textColor: 'text-orange-400',
          badgeClass: 'badge-high',
          borderColor: 'border-orange-500/40',
          bgAccent: 'bg-orange-950/30',
          dotColor: 'bg-orange-500'
        };
      case 'moderate':
        return {
          textColor: 'text-yellow-400',
          badgeClass: 'badge-mod',
          borderColor: 'border-yellow-500/40',
          bgAccent: 'bg-yellow-950/30',
          dotColor: 'bg-yellow-500'
        };
      default:
        return {
          textColor: 'text-emerald-400',
          badgeClass: 'badge-low',
          borderColor: 'border-emerald-500/40',
          bgAccent: 'bg-emerald-950/30',
          dotColor: 'bg-emerald-500'
        };
    }
  };

  const theme = getRiskTheme(riskLevel);

  return (
    <div className={`gis-panel p-6 sm:p-7 border ${theme.borderColor} ${theme.bgAccent}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Status & Explanation */}
        <div className="flex-1 space-y-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`w-3 h-3 rounded-full ${theme.dotColor} animate-pulse`}></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Current Flood Risk
            </span>
            <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full font-mono ${theme.badgeClass}`}>
              {riskLevel}
            </span>
            <span className="text-xs font-mono font-medium text-slate-400 hidden sm:inline">
              • Calibrated deterministic model
            </span>
          </div>

          <div className="flex items-baseline gap-4">
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.textColor}`}>
              {riskLevel?.toUpperCase()} ALERT
            </h2>
            <div className="text-sm font-mono text-slate-300">
              Risk Score: <strong className="text-white text-lg font-bold">{riskScore}</strong> / 100
            </div>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
            {riskExplanation?.recommendedInterpretation || 
              'High rainfall accumulation, elevated river stage, and antecedent soil moisture are currently elevating localized flood potential.'}
          </p>

          {/* Segmented Risk Gauge */}
          <div className="pt-3 max-w-lg space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
              <span className="text-emerald-400">LOW (0–24)</span>
              <span className="text-yellow-400">MODERATE (25–49)</span>
              <span className="text-orange-400">HIGH (50–74)</span>
              <span className="text-red-400">EXTREME (75–100)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-900 border border-white/15 flex overflow-hidden">
              <div className="h-full bg-emerald-500/80" style={{ width: '25%' }}></div>
              <div className="h-full bg-yellow-500/80" style={{ width: '25%' }}></div>
              <div className="h-full bg-orange-500/80" style={{ width: '25%' }}></div>
              <div className="h-full bg-red-500/80" style={{ width: '25%' }}></div>
            </div>
            <div className="relative w-full h-3">
              <div 
                className="absolute -top-1.5 w-3.5 h-3.5 bg-white rounded-full shadow-lg border-2 border-slate-950 -translate-x-1/2 transition-all duration-500"
                style={{ left: `${Math.min(98, Math.max(2, riskScore))}%` }}
                title={`Current Score: ${riskScore}`}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Side: Key Metadata Pods */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-[#080e1d] px-6 py-4 rounded-2xl border border-white/10 self-start lg:self-center shadow-lg">
          {/* Risk Score */}
          <div className="text-center px-3 space-y-1">
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Score</div>
            <div className="text-3xl font-extrabold font-mono text-white flex items-baseline justify-center">
              {riskScore}
              <span className="text-xs font-normal text-slate-400 ml-1">/100</span>
            </div>
            <span className="text-xs text-sky-400 font-mono font-bold block">{uncertaintyRange}</span>
          </div>

          <div className="hidden sm:block w-px h-12 bg-white/10"></div>

          {/* Model Confidence */}
          <div className="text-center px-3 space-y-1">
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Confidence</div>
            <div className="text-3xl font-extrabold font-mono text-sky-300">
              {confidence}%
            </div>
            <span className="text-xs text-emerald-400 font-mono font-bold block">Calibrated</span>
          </div>

          <div className="hidden sm:block w-px h-12 bg-white/10"></div>

          {/* Data Status */}
          <div className="text-center px-3 space-y-1">
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Data Status</div>
            <div className="text-sm font-bold text-white mt-1">
              Multi-sensor
            </div>
            <span className="text-xs text-amber-400 font-mono font-bold block">Simulated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
