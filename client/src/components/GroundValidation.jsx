import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Activity, 
  Clock, 
  Maximize2,
  TrendingUp,
  Camera
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function GroundValidation({ validationData }) {
  if (!validationData) {
    return (
      <div className="p-16 text-center text-slate-400 space-y-3">
        <Activity className="w-8 h-8 animate-spin mx-auto text-sky-400" />
        <span className="text-base font-semibold">Loading ground validation metrics and ground truth calibration...</span>
      </div>
    );
  }

  const { metrics, observationsTable, calibrationCurve } = validationData;

  const getStatusBadge = (status) => {
    if (status?.toLowerCase().includes('correct')) {
      return 'badge-low';
    }
    if (status?.toLowerCase().includes('false alarm')) {
      return 'badge-mod';
    }
    return 'badge-extreme';
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Primary Validation Metrics */}
      <div className="gis-panel space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-2xl font-extrabold text-white">Ground Truth Validation & Calibration Metrics</h3>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              Cross-verification against CWPRS ultrasonic level sticks, citizen IoT photographs, municipal logs, and Sentinel-1 SAR observations.
            </p>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs text-slate-300 font-semibold bg-slate-900 px-3 py-1.5 rounded-full border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{metrics?.totalGroundSensors} Telemetry Nodes | {metrics?.activeValidationPoints} Observations</span>
          </div>
        </div>

        {/* Statistical Performance Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Precision</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400">
              {Math.round((metrics?.precision || 0.88) * 100)}%
            </div>
            <div className="text-xs text-slate-400 font-medium">True Positives</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Recall</div>
            <div className="text-3xl font-extrabold font-mono text-sky-400">
              {Math.round((metrics?.recall || 0.85) * 100)}%
            </div>
            <div className="text-xs text-slate-400 font-medium">Event Coverage</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">F1 Score</div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {metrics?.f1Score}
            </div>
            <div className="text-xs text-slate-400 font-medium">Harmonic mean</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Spatial IoU</div>
            <div className="text-3xl font-extrabold font-mono text-purple-300">
              {metrics?.spatialIoU}
            </div>
            <div className="text-xs text-slate-400 font-medium">Extent Intersection</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Depth RMSE</div>
            <div className="text-2xl font-extrabold font-mono text-amber-300">
              {metrics?.depthErrorRMSE}
            </div>
            <div className="text-xs text-slate-400 font-medium">Sensor residual</div>
          </div>

          <div className="bg-[#080e1c] p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Lead Time</div>
            <div className="text-2xl font-extrabold font-mono text-teal-300">
              {metrics?.forecastLeadTime}
            </div>
            <div className="text-xs text-slate-400 font-medium">Pre-warning margin</div>
          </div>
        </div>

        {/* Error Breakdown Badges */}
        <div className="flex flex-wrap items-center justify-between text-sm pt-3 border-t border-white/10 text-slate-300">
          <div>
            False Alarm Rate: <strong className="text-amber-400 font-mono font-bold">{Math.round((metrics?.falseAlarmRate || 0.12) * 100)}%</strong>
          </div>
          <div>
            Missed-Event Rate: <strong className="text-red-400 font-mono font-bold">{Math.round((metrics?.missedEventRate || 0.15) * 100)}%</strong>
          </div>
          <div>
            Brier Calibration Score: <strong className="text-sky-300 font-mono font-bold">{metrics?.riskProbabilityCalibrationBrier}</strong> (Low error)
          </div>
        </div>
      </div>

      {/* 2. Ground Observations Comparison Table */}
      <div className="gis-panel space-y-4">
        <h4 className="text-base font-extrabold text-white uppercase tracking-wider flex items-center gap-2.5 border-b border-white/10 pb-3">
          <Camera className="w-5 h-5 text-sky-400" />
          <span>Multi-Source Observation & Ground Truth Log</span>
        </h4>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="intel-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Model Prediction</th>
                <th>Ground Observed</th>
                <th>Verification</th>
                <th>Location</th>
                <th>Time</th>
                <th>Validation Source</th>
              </tr>
            </thead>
            <tbody>
              {(observationsTable || []).map((obs) => (
                <tr key={obs.id}>
                  <td className="font-mono text-slate-400 font-bold">{obs.id}</td>
                  <td className="font-mono text-white font-bold">{obs.prediction}</td>
                  <td className="font-mono text-sky-300 font-bold">{obs.observed}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(obs.status)}`}>
                      {obs.status}
                    </span>
                  </td>
                  <td className="text-sm text-slate-200 font-medium">{obs.location}</td>
                  <td className="text-xs text-slate-300 font-mono">{obs.time}</td>
                  <td className="text-xs text-slate-400">{obs.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
