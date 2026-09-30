import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  AlertTriangle, 
  Send, 
  Bell, 
  BellRing, 
  CheckCircle2, 
  PhoneCall, 
  Clock, 
  Building2, 
  Radio, 
  Flame, 
  CheckSquare, 
  Square, 
  Volume2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function EmergencyAlertDrawer({
  isOpen,
  onClose,
  locationData,
  dashboard,
  authorityDispatchReceipt,
  citizenNotifReceipt,
  onDispatchAuthorities,
  onSendCitizenNotification,
  isDispatchingAlert,
  isSendingCitizenNotif,
  actionStatuses,
  onToggleActionStatus,
  browserNotificationPermission,
  onRequestNotificationPermission
}) {
  const [activeSubTab, setActiveSubTab] = useState('authorities'); // 'authorities' | 'actions' | 'citizen'

  if (!isOpen) return null;

  const locName = locationData?.name || dashboard?.location || 'Monitored Basin';
  const riskLevel = dashboard?.riskLevel || 'High';
  const bankfullPct = dashboard?.riverLevel?.percentageOfBankfull || 0;
  const isExtreme = riskLevel === 'Extreme' || bankfullPct > 90;

  const defaultActions = [
    {
      id: 0,
      dept: 'Irrigation & Dam Operators',
      action: 'Regulate sluice gates and pre-release reservoir buffer by 20–25% before peak hydrograph wave arrives.',
      priority: 'URGENT',
      leadTime: '2–4 Hours',
      defaultStatus: 'In Progress'
    },
    {
      id: 1,
      dept: 'District Administration & NDRF',
      action: 'Pre-position motorized inflatable rescue boats and SDRF personnel in low-lying riparian wards.',
      priority: 'IMMEDIATE',
      leadTime: 'Immediate',
      defaultStatus: 'Initiated'
    },
    {
      id: 2,
      dept: 'Traffic & Highway Police',
      action: 'Erect barricades at submerged causeways and divert heavy vehicular traffic away from river corridors.',
      priority: 'HIGH PRIORITY',
      leadTime: '1 Hour',
      defaultStatus: 'Recommended'
    },
    {
      id: 3,
      dept: 'Municipal PWD & Stormwater',
      action: 'Deploy high-capacity dewatering pump sets (100+ HP) at depressed junctions and unblock intake grates.',
      priority: 'HIGH PRIORITY',
      leadTime: '2 Hours',
      defaultStatus: 'Recommended'
    },
    {
      id: 4,
      dept: 'Civil Defense & Health Dept',
      action: 'Activate multi-purpose flood relief shelters equipped with potable water, non-perishable rations, and power backup.',
      priority: 'IMMEDIATE',
      leadTime: 'Immediate',
      defaultStatus: 'Initiated'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#090f1d] border-l border-white/15 h-full overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-[#0c1529] border-b border-white/10 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isExtreme ? 'bg-red-950/80 text-red-400 border border-red-500/40' : 'bg-amber-950/80 text-amber-400 border border-amber-500/40'}`}>
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-normal">
                  Emergency Flood Alert & Action Center
                </h3>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${isExtreme ? 'badge-extreme' : 'badge-high'}`}>
                  {isExtreme ? 'RED WARNING' : 'ORANGE ALERT'}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Target Zone: <strong className="text-white">{locName} Catchment Basin</strong> • Lead Time: <span className="text-sky-300 font-semibold">+4 to +6 Hours</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tab Navigation */}
        <div className="px-5 sm:px-6 pt-4 pb-2 bg-[#090f1d] border-b border-white/10 flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('authorities')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'authorities'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Alert Authorities</span>
            {authorityDispatchReceipt && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('actions')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'actions'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Authority SOP Suggestions</span>
          </button>

          <button
            onClick={() => setActiveSubTab('citizen')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'citizen'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <BellRing className="w-4 h-4" />
            <span>Citizen Notifications</span>
            {citizenNotifReceipt && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 sm:p-6 flex-1 space-y-6">
          {/* TAB 1: ALERT AUTHORITIES */}
          {activeSubTab === 'authorities' && (
            <div className="space-y-5">
              <div className="bg-[#0c1529] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-normal">
                      Multi-Agency Emergency Dispatch
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Transmits Common Alerting Protocol (CAP-XML) & priority hotwire alerts to operational command centers.
                    </p>
                  </div>
                  <button
                    onClick={onDispatchAuthorities}
                    disabled={isDispatchingAlert}
                    className="btn-danger text-xs font-bold whitespace-nowrap self-start sm:self-center"
                  >
                    <Send className={`w-3.5 h-3.5 ${isDispatchingAlert ? 'animate-spin' : ''}`} />
                    <span>{isDispatchingAlert ? 'Transmitting...' : 'Transmit Alert to Authorities'}</span>
                  </button>
                </div>

                {/* Target Agencies List */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Designated Emergency Response Agencies:
                  </span>
                  
                  {[
                    { agency: 'State Disaster Management Authority (SDMA)', protocol: 'CAP-XML 1.2 Protocol', status: authorityDispatchReceipt ? 'Acknowledged (280ms)' : 'Online & Armed' },
                    { agency: 'District Emergency Operations Centre (DEOC) / Collectorate', protocol: 'Hotwire API & Red SMS', status: authorityDispatchReceipt ? 'Acknowledged (410ms)' : 'Online & Armed' },
                    { agency: 'Water Resources Dept / Dam Sluice Gate Control', protocol: 'SCADA Telemetry Alert', status: authorityDispatchReceipt ? 'Acknowledged (190ms)' : 'Online & Armed' },
                    { agency: 'NDRF 4th / 10th Battalion & State Fire Services', protocol: 'Emergency VHF Net & Push', status: authorityDispatchReceipt ? 'Transmitted (650ms)' : 'Armed' },
                    { agency: 'City Traffic & Highway Police Control', protocol: 'Public Safety Broadcast', status: authorityDispatchReceipt ? 'Transmitted (520ms)' : 'Armed' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-white/5 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-white block">{item.agency}</span>
                        <span className="text-slate-400 font-mono text-[11px]">{item.protocol}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] whitespace-nowrap ${
                        authorityDispatchReceipt 
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-sky-950/80 text-sky-300 border border-sky-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Dispatch Receipt Confirmation (if dispatched) */}
                {authorityDispatchReceipt && (
                  <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-4 text-xs space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Alert Dispatched & Acknowledged by District Operations</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300 font-mono text-[11px]">
                      <div>Dispatch ID: <strong className="text-white">{authorityDispatchReceipt.dispatchId}</strong></div>
                      <div>Alert Level: <strong className="text-red-400">{authorityDispatchReceipt.alertLevel}</strong></div>
                      <div>Timestamp: <span className="text-slate-400">{new Date(authorityDispatchReceipt.timestamp).toLocaleTimeString()}</span></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SUGGESTED ACTIONS FOR AUTHORITIES */}
          {activeSubTab === 'actions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white tracking-normal">
                    Operational SOP Suggestions for Incident Commanders
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Coordinated mitigation and safety directives categorized by responsible administrative department.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {defaultActions.map((item) => {
                  const currentStatus = actionStatuses?.[item.id] || item.defaultStatus;
                  return (
                    <div 
                      key={item.id} 
                      className="bg-[#0c1529] border border-white/10 hover:border-white/20 rounded-2xl p-4.5 space-y-3 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sky-400 text-xs uppercase tracking-normal">
                            {item.dept}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/10">
                            Lead Time: {item.leadTime}
                          </span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            item.priority === 'URGENT' ? 'bg-red-950/80 text-red-300 border border-red-500/30' :
                            item.priority === 'IMMEDIATE' ? 'bg-orange-950/80 text-orange-300 border border-orange-500/30' :
                            'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                          }`}>
                            {item.priority}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-200 leading-relaxed font-normal">
                        {item.action}
                      </p>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Execution Status:</span>
                        <button
                          onClick={() => onToggleActionStatus && onToggleActionStatus(item.id)}
                          className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border ${
                            currentStatus === 'Completed'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                              : currentStatus === 'In Progress'
                              ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                              : 'bg-slate-900 text-slate-300 border-white/10 hover:bg-slate-800'
                          }`}
                        >
                          {currentStatus === 'Completed' ? (
                            <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <span>{currentStatus} (Click to toggle)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CITIZEN NOTIFICATIONS */}
          {activeSubTab === 'citizen' && (
            <div className="space-y-5">
              <div className="bg-[#0c1529] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-normal">
                      Resident & Citizen Flood Alert Broadcast
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Sends immediate browser push alerts, in-app safety warnings, and mobile cell broadcasts to residents in flood-exposed zones.
                    </p>
                  </div>
                  <button
                    onClick={onSendCitizenNotification}
                    disabled={isSendingCitizenNotif}
                    className="btn-primary text-xs font-bold whitespace-nowrap self-start sm:self-center"
                  >
                    <BellRing className={`w-3.5 h-3.5 ${isSendingCitizenNotif ? 'animate-spin' : ''}`} />
                    <span>{isSendingCitizenNotif ? 'Broadcasting...' : 'Send Notification to User'}</span>
                  </button>
                </div>

                {/* Browser Push Permission State */}
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Bell className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white block">Device Web Push Notifications</span>
                      <span className="text-slate-400">
                        Status: <strong className="text-sky-300 font-mono">{browserNotificationPermission || 'Default (Click to enable)'}</strong>
                      </span>
                    </div>
                  </div>
                  {browserNotificationPermission !== 'granted' && (
                    <button
                      onClick={onRequestNotificationPermission}
                      className="btn-secondary text-xs font-bold py-1 px-3 self-start sm:self-center"
                    >
                      Enable Push Notifications
                    </button>
                  )}
                </div>

                {/* Citizen Notification Preview */}
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Live Citizen Notification Message
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Channels: Push • In-App • CBC</span>
                  </div>
                  <div className="text-sm text-white font-bold">
                    ⚠️ FLOOD WARNING FOR {locName.toUpperCase()}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    Severe runoff and river stage elevation forecast over the next 4–6 hours. Waterlogging likely in low-lying riparian wards. Move valuables to higher levels and avoid waterlogged roads.
                  </p>
                </div>

                {/* Citizen Safety Advisories (Do's and Don'ts) */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Citizen Safety Rules (Do's & Don'ts):
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    <div className="bg-slate-900/90 p-3 rounded-xl border-l-2 border-red-500 text-slate-200 flex items-start gap-2.5">
                      <span className="text-red-400 font-bold shrink-0">DO NOT:</span>
                      <span>Walk, swim, or drive through standing or flowing floodwater ("Turn Around, Don't Drown").</span>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-xl border-l-2 border-amber-500 text-slate-200 flex items-start gap-2.5">
                      <span className="text-amber-400 font-bold shrink-0">ACTION:</span>
                      <span>Turn off main electrical circuit breakers and LPG gas regulators if water enters your home.</span>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-xl border-l-2 border-emerald-500 text-slate-200 flex items-start gap-2.5">
                      <span className="text-emerald-400 font-bold shrink-0">PREPARE:</span>
                      <span>Assemble an emergency grab-bag: essential medicines, drinking water, phone power bank, torch, identity papers.</span>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-xl border-l-2 border-sky-500 text-slate-200 flex items-start gap-2.5">
                      <span className="text-sky-400 font-bold shrink-0">RELOCATE:</span>
                      <span>Move elderly family members, pets, and key belongings to upper floors or nearest designated municipal shelter.</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Hotlines */}
                <div className="bg-slate-950/80 rounded-xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white">Emergency Helplines:</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300 font-mono font-bold">
                    <span>Police & Rescue: <strong className="text-white">112</strong></span>
                    <span>Disaster Control Room: <strong className="text-white">1070</strong> / <strong className="text-white">1077</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#0c1529] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>FloodAI Emergency Dispatch Protocol v2.4</span>
          <button
            onClick={onClose}
            className="btn-secondary text-xs font-bold py-1.5 px-4"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}
