import React, { useState, useRef, useEffect } from 'react';
import { 
  Waves, 
  MapPin, 
  RefreshCw, 
  AlertTriangle, 
  Clock, 
  Layers, 
  Activity, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ShieldAlert, 
  Info, 
  Sliders, 
  Database, 
  CloudRain, 
  Radio, 
  History, 
  Compass, 
  LayoutDashboard,
  BellRing
} from 'lucide-react';

export default function Header({ 
  locations, 
  selectedLocationId, 
  onSelectLocation, 
  locationData, 
  lastUpdated, 
  autoRefreshRate, 
  onChangeAutoRefresh, 
  onManualRefresh, 
  isRefreshing, 
  activeTab, 
  onSelectTab,
  onOpenEmergencyAlert
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = (locations || []).filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (loc.basin && loc.basin.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeLoc = (locations || []).find(l => l.id === selectedLocationId) || locations?.[0];

  // Primary navigation (6 top modules)
  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'GIS Map', icon: Layers },
    { id: 'flash-flood', label: 'Flood Model', icon: Sliders },
    { id: 'rivers', label: 'Hydrology', icon: Waves },
    { id: 'weather', label: 'Weather', icon: Radio },
    { id: 'historical', label: 'History', icon: History }
  ];

  // Secondary navigation (Advanced modules under More)
  const secondaryNavItems = [
    { id: 'timeline', label: 'Timeline & Recovery', icon: Clock },
    { id: 'extreme-rain', label: 'Extreme Rainfall', icon: CloudRain },
    { id: 'land-use', label: 'Land-Use Change', icon: Compass },
    { id: 'coastal', label: 'Coastal & Surge', icon: Waves },
    { id: 'validation', label: 'Ground Truth Validation', icon: ShieldAlert },
    { id: 'feedback-loop', label: 'Assimilation Loop (30s)', icon: RefreshCw }
  ];

  const isMoreTabActive = secondaryNavItems.some(item => item.id === activeTab);
  const activeSecondaryItem = secondaryNavItems.find(item => item.id === activeTab);

  return (
    <header className="w-full bg-[#0a1120] border-b border-white/10 sticky top-0 z-40 shadow-lg">
      {/* Top Header Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center shadow-lg shadow-sky-600/30 text-white flex-shrink-0">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl font-extrabold text-white tracking-tight">FloodAI</span>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/30">
                Live Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5">Hydrological Risk Monitoring & Inundation Platform</p>
          </div>
        </div>

        {/* Center: Search & Current Location */}
        <div className="relative flex-1 max-w-md min-w-[280px]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by city, district, village, or basin..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowLocationDropdown(true);
              }}
              onFocus={() => setShowLocationDropdown(true)}
              className="input-gis w-full pl-9 pr-24 py-2 text-sm placeholder:text-slate-500"
            />
            {activeLoc && (
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-sky-400 bg-slate-900 px-2 py-1 rounded-md border border-white/10">
                {activeLoc.name}
              </span>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showLocationDropdown && (
            <div 
              className="absolute left-0 right-0 top-full mt-1.5 bg-[#0f172a] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 max-h-72 overflow-y-auto"
              onMouseLeave={() => setShowLocationDropdown(false)}
            >
              <div className="px-4 py-2 text-xs uppercase font-bold text-slate-400 bg-slate-900/90 border-b border-white/10 tracking-wider">
                Select Monitored Catchment
              </div>
              {filteredLocations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => {
                    onSelectLocation(loc.id);
                    setShowLocationDropdown(false);
                    setSearchQuery('');
                  }}
                  className={`w-full px-4 py-2.5 text-left flex items-center justify-between text-sm cursor-pointer hover:bg-slate-800 transition-colors ${
                    selectedLocationId === loc.id ? 'bg-sky-950/60 text-sky-300 font-semibold' : 'text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white">{loc.name}</span>
                      <span className="text-slate-400 ml-2 text-xs font-normal">({loc.state})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">{loc.basin}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      loc.riskLevel === 'Extreme' ? 'badge-extreme' :
                      loc.riskLevel === 'High' ? 'badge-high' :
                      loc.riskLevel === 'Moderate' ? 'badge-mod' :
                      'badge-low'
                    }`}>
                      {loc.riskLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Controls & Badges */}
        <div className="flex items-center gap-3">
          {/* Emergency Alert & Dispatch Bell Button */}
          <button
            onClick={onOpenEmergencyAlert}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/70 border border-red-500/50 text-red-300 text-xs font-bold hover:bg-red-900/70 transition-colors cursor-pointer relative"
            title="Open Emergency Flood Alert & Citizen Notification Center"
          >
            <BellRing className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="hidden sm:inline">Emergency Alerts</span>
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping absolute -top-0.5 -right-0.5"></span>
          </button>

          {/* Prototype Badge */}
          <button 
            onClick={() => setShowDisclaimerModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/25 transition-colors cursor-pointer"
            title="View system prototype notice & model uncertainty notice"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Simulated / Demo</span>
            <Info className="w-3.5 h-3.5 text-amber-400/90" />
          </button>

          {/* Auto Refresh Selector */}
          <div className="flex items-center gap-2 bg-[#090f1e] border border-white/15 rounded-lg px-2.5 py-1.5 text-sm">
            <Clock className="w-4 h-4 text-slate-400" />
            <select
              value={autoRefreshRate}
              onChange={(e) => onChangeAutoRefresh(Number(e.target.value))}
              className="bg-transparent text-xs font-bold text-slate-200 outline-none cursor-pointer"
            >
              <option value={0} className="bg-slate-900 text-white">Manual Refresh</option>
              <option value={30} className="bg-slate-900 text-white">Auto: 30s</option>
              <option value={60} className="bg-slate-900 text-white">Auto: 1m</option>
            </select>
          </div>

          {/* Manual Refresh Button */}
          <button
            onClick={onManualRefresh}
            disabled={isRefreshing}
            className="btn-secondary py-1.5 px-3 text-sm font-bold"
            title="Trigger simulated live sensor telemetry cycle"
          >
            <RefreshCw className={`w-4 h-4 text-sky-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Sub-bar: Hierarchies & Quick Location Chips */}
      <div className="bg-[#080d1a] border-t border-white/10 px-4 sm:px-6 py-2 text-xs">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Quick Location Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap mr-1">
              Basins:
            </span>
            {(locations || []).map(loc => {
              const isSelected = selectedLocationId === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => onSelectLocation(loc.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-400 shadow-sm shadow-sky-600/40'
                      : 'bg-[#111928] text-slate-300 border-white/10 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {loc.name}
                </button>
              );
            })}
          </div>

          {/* Sync Status Timestamp */}
          <div className="flex items-center gap-2 text-xs text-slate-300 font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Sync: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Live'}</span>
          </div>
        </div>
      </div>

      {/* Hydrological & Geographic Hierarchy Breadcrumbs */}
      {locationData && (
        <div className="bg-[#060a14] border-t border-white/5 px-4 sm:px-6 py-1.5 text-xs text-slate-400">
          <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              <span className="text-sky-400 font-bold uppercase">Geo:</span>
              <span className="text-slate-300">{locationData.geographicHierarchy?.country}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-300">{locationData.geographicHierarchy?.state}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-300">{locationData.geographicHierarchy?.district}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-white font-bold">{locationData.geographicHierarchy?.city || locationData.geographicHierarchy?.town}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-sky-300 font-mono font-semibold">{locationData.geographicHierarchy?.coordinates}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              <span className="text-blue-400 font-bold uppercase">Hydro:</span>
              <span className="text-slate-300">{locationData.hydrologicalHierarchy?.basin}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-300">{locationData.hydrologicalHierarchy?.subBasin}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-blue-300 font-bold">{locationData.hydrologicalHierarchy?.riverStream}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-[#0a1120] border-t border-white/10 px-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 py-2">
          {/* Primary Nav Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {primaryNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* More Modules Dropdown */}
          <div className="relative flex-shrink-0" ref={moreMenuRef}>
            <button
              onClick={() => setShowMoreMenu(prev => !prev)}
              className={`nav-tab-btn flex items-center gap-2 ${
                isMoreTabActive ? 'active' : ''
              }`}
              title="Advanced hydrological analysis and telemetry modules"
            >
              <Sliders className={`w-4 h-4 ${isMoreTabActive ? 'text-sky-400' : 'text-slate-400'}`} />
              <span>
                {isMoreTabActive && activeSecondaryItem ? activeSecondaryItem.label : 'More Modules'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMoreMenu ? 'rotate-180 text-sky-400' : 'text-slate-400'}`} />
            </button>

            {showMoreMenu && (
              <div className="nav-dropdown animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 text-xs uppercase font-bold tracking-wider text-slate-400 border-b border-white/10 mb-1">
                  Advanced Intelligence Modules
                </div>
                {secondaryNavItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setShowMoreMenu(false);
                      }}
                      className={`nav-dropdown-item ${isActive ? 'active' : ''}`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                      <span className="font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Disclaimer Modal */}
      {showDisclaimerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
          <div className="bg-[#0f172a] border border-white/20 rounded-2xl max-w-lg w-full p-7 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400 mb-4">
              <AlertTriangle className="w-7 h-7 flex-shrink-0" />
              <h3 className="text-lg font-bold text-white">FloodAI Prototype System Notice</h3>
            </div>
            <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
              <p>
                <strong className="text-white">Research & Demonstration Prototype:</strong> FloodAI is engineered as an interactive proof-of-concept. All current sensor readings, river stages, and radar reflectivities reflect high-fidelity <span className="text-sky-300 font-bold">simulated data</span>.
              </p>
              <p>
                <strong className="text-white">Not Official Emergency Warnings:</strong> Risk scores, return period estimations, and flood inundation depths are computed from rule-based numerical models and must <span className="text-amber-300 font-bold">not be interpreted as official emergency alerts</span>. For official alerts, consult the Central Water Commission (CWC), India Meteorological Department (IMD), or local SDMA.
              </p>
              <p>
                <strong className="text-white">Satellite Observation Bounds:</strong> Satellite observations (optical & SAR) directly measure water surface extent; depth is calculated using DEM bathymetric routing with ±0.15–0.30m confidence bounds.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDisclaimerModal(false)}
                className="btn-primary"
              >
                Close & Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
