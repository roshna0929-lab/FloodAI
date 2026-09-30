import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import MainDashboard from './components/MainDashboard';
import GisMap from './components/GisMap';
import FlashFloodModel from './components/FlashFloodModel';
import RiverReservoir from './components/RiverReservoir';
import FloodTimeline from './components/FloodTimeline';
import ExtremeRainfall from './components/ExtremeRainfall';
import WeatherStations from './components/WeatherStations';
import HistoricalIntel from './components/HistoricalIntel';
import LandUseChange from './components/LandUseChange';
import CoastalCyclone from './components/CoastalCyclone';
import GroundValidation from './components/GroundValidation';
import FeedbackLoop from './components/FeedbackLoop';
import EmergencyAlertDrawer from './components/EmergencyAlertDrawer';

export default function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState('chennai');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Emergency alerts & notification states
  const [isEmergencyDrawerOpen, setIsEmergencyDrawerOpen] = useState(false);
  const [authorityDispatchReceipt, setAuthorityDispatchReceipt] = useState(null);
  const [citizenNotifReceipt, setCitizenNotifReceipt] = useState(null);
  const [isDispatchingAlert, setIsDispatchingAlert] = useState(false);
  const [isSendingCitizenNotif, setIsSendingCitizenNotif] = useState(false);
  const [actionStatuses, setActionStatuses] = useState({
    0: 'In Progress',
    1: 'Initiated',
    2: 'Recommended',
    3: 'Recommended',
    4: 'Initiated'
  });
  const [browserNotificationPermission, setBrowserNotificationPermission] = useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  
  // Data states
  const [locationData, setLocationData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [rainfallData, setRainfallData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [riverData, setRiverData] = useState(null);
  const [reservoirData, setReservoirData] = useState(null);
  const [floodData, setFloodData] = useState(null);
  const [landUseData, setLandUseData] = useState(null);
  const [coastalData, setCoastalData] = useState(null);
  const [validationData, setValidationData] = useState(null);

  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());
  const [autoRefreshRate, setAutoRefreshRate] = useState(30); // 30 seconds default
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Fetch Location list
  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(json => {
        if (json.data && Array.isArray(json.data)) {
          setLocations(json.data);
        }
      })
      .catch(err => {
        console.warn('Backend loading, using initial mock locations', err);
      });
  }, []);

  // 2. Load all telemetry for selected location
  const loadLocationTelemetry = useCallback(async (locId) => {
    try {
      const [
        locRes,
        dashRes,
        histRes,
        rainRes,
        weathRes,
        rivRes,
        resRes,
        floodRes,
        landRes,
        coastRes,
        valRes
      ] = await Promise.all([
        fetch(`/api/location/${locId}`).then(r => r.json()),
        fetch(`/api/dashboard/${locId}`).then(r => r.json()),
        fetch(`/api/historical/${locId}`).then(r => r.json()),
        fetch(`/api/rainfall/${locId}`).then(r => r.json()),
        fetch(`/api/weather/${locId}`).then(r => r.json()),
        fetch(`/api/rivers/${locId}`).then(r => r.json()),
        fetch(`/api/reservoirs/${locId}`).then(r => r.json()),
        fetch(`/api/flood/${locId}`).then(r => r.json()),
        fetch(`/api/land-use/${locId}`).then(r => r.json()),
        fetch(`/api/coastal/${locId}`).then(r => r.json()),
        fetch(`/api/validation/${locId}`).then(r => r.json())
      ]);

      if (locRes.data) setLocationData(locRes.data);
      if (dashRes.data) setDashboardData(dashRes.data);
      if (histRes.data) setHistoricalData(histRes.data);
      if (rainRes.data) setRainfallData(rainRes.data);
      if (weathRes.data) setWeatherData(weathRes.data);
      if (rivRes.data) setRiverData(rivRes.data);
      if (resRes.data) setReservoirData(resRes.data);
      if (floodRes.data) setFloodData(floodRes.data);
      if (landRes.data) setLandUseData(landRes.data);
      if (coastRes.data) setCoastalData(coastRes.data);
      if (valRes.data) setValidationData(valRes.data);

      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error('Error loading location telemetry:', err);
    }
  }, []);

  // Load telemetry when selected location changes
  useEffect(() => {
    loadLocationTelemetry(selectedLocationId);
  }, [selectedLocationId, loadLocationTelemetry]);

  // 3. Trigger live refresh
  const triggerRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/refresh/${selectedLocationId}`, { method: 'POST' });
      const json = await res.json();
      if (json.data?.dashboard) {
        setDashboardData(json.data.dashboard);
      }
      // Reload submodules
      await loadLocationTelemetry(selectedLocationId);
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  // 4. Auto-refresh loop
  useEffect(() => {
    if (autoRefreshRate <= 0) return;
    const interval = setInterval(() => {
      triggerRefresh();
    }, autoRefreshRate * 1000);
    return () => clearInterval(interval);
  }, [autoRefreshRate, selectedLocationId]);

  // Emergency Alert & Citizen Notification Handlers
  const playAlertChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch (e) {
      // Audio autoplay policy
    }
  };

  const handleDispatchAuthorities = async () => {
    setIsDispatchingAlert(true);
    try {
      const res = await fetch(`/api/alerts/dispatch/${selectedLocationId}`, { method: 'POST' });
      const json = await res.json();
      if (json.data) {
        setAuthorityDispatchReceipt(json.data);
      } else {
        setAuthorityDispatchReceipt({
          dispatchId: `DISPATCH-AUTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          alertLevel: dashboardData?.riskLevel === 'Extreme' ? 'RED WARNING (LEVEL-3)' : 'ORANGE ALERT (LEVEL-2)',
          timestamp: new Date().toISOString()
        });
      }
    } catch (err) {
      setAuthorityDispatchReceipt({
        dispatchId: `DISPATCH-AUTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        alertLevel: dashboardData?.riskLevel === 'Extreme' ? 'RED WARNING (LEVEL-3)' : 'ORANGE ALERT (LEVEL-2)',
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsDispatchingAlert(false);
    }
  };

  const handleSendCitizenNotification = async () => {
    setIsSendingCitizenNotif(true);
    try {
      const res = await fetch(`/api/notifications/send-citizen/${selectedLocationId}`, { method: 'POST' });
      const json = await res.json();
      const notif = json.data || {
        alertTitle: `⚠️ FLOOD WARNING FOR ${locationData?.name?.toUpperCase() || 'CURRENT CATCHMENT'}`,
        alertBody: `Severe runoff and river stage elevation forecast in next 4–6 hours. Move valuables to higher levels and avoid waterlogged roads.`,
        timestamp: new Date().toISOString()
      };
      setCitizenNotifReceipt(notif);
      playAlertChime();
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(notif.alertTitle, { body: notif.alertBody, icon: '/favicon.ico' });
      }
    } catch (err) {
      const fallback = {
        alertTitle: `⚠️ FLOOD WARNING FOR ${locationData?.name?.toUpperCase() || 'CURRENT CATCHMENT'}`,
        alertBody: `Severe runoff and river stage elevation forecast in next 4–6 hours. Move valuables to higher levels and avoid waterlogged roads.`,
        timestamp: new Date().toISOString()
      };
      setCitizenNotifReceipt(fallback);
      playAlertChime();
    } finally {
      setIsSendingCitizenNotif(false);
    }
  };

  const handleToggleActionStatus = (id) => {
    setActionStatuses(prev => {
      const current = prev[id] || 'Recommended';
      const next = current === 'Recommended' ? 'In Progress' : current === 'In Progress' ? 'Completed' : 'Recommended';
      return { ...prev, [id]: next };
    });
  };

  const handleRequestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const perm = await Notification.requestPermission();
      setBrowserNotificationPermission(perm);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100 antialiased">
      {/* Platform Header with Search, Hierarchies, and Refresh Controls */}
      <Header
        locations={locations}
        selectedLocationId={selectedLocationId}
        onSelectLocation={setSelectedLocationId}
        locationData={locationData}
        lastUpdated={lastUpdated}
        autoRefreshRate={autoRefreshRate}
        onChangeAutoRefresh={setAutoRefreshRate}
        onManualRefresh={triggerRefresh}
        isRefreshing={isRefreshing}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenEmergencyAlert={() => setIsEmergencyDrawerOpen(true)}
      />

      {/* Emergency Alert & Citizen Notification Drawer */}
      <EmergencyAlertDrawer
        isOpen={isEmergencyDrawerOpen}
        onClose={() => setIsEmergencyDrawerOpen(false)}
        locationData={locationData}
        dashboard={dashboardData}
        authorityDispatchReceipt={authorityDispatchReceipt}
        citizenNotifReceipt={citizenNotifReceipt}
        onDispatchAuthorities={handleDispatchAuthorities}
        onSendCitizenNotification={handleSendCitizenNotification}
        isDispatchingAlert={isDispatchingAlert}
        isSendingCitizenNotif={isSendingCitizenNotif}
        actionStatuses={actionStatuses}
        onToggleActionStatus={handleToggleActionStatus}
        browserNotificationPermission={browserNotificationPermission}
        onRequestNotificationPermission={handleRequestNotificationPermission}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <MainDashboard 
            dashboard={dashboardData}
            locationData={locationData}
            riverData={riverData}
            rainfallData={rainfallData}
            weatherData={weatherData}
            reservoirData={reservoirData}
            coastalData={coastalData}
            onExploreMap={() => setActiveTab('map')}
            onExploreFlashFlood={() => setActiveTab('flash-flood')}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'map' && (
          <GisMap 
            locationData={locationData}
            coastalData={coastalData}
            dashboard={dashboardData}
          />
        )}

        {activeTab === 'flash-flood' && (
          <FlashFloodModel 
            dashboard={dashboardData}
            locationData={locationData}
          />
        )}

        {activeTab === 'rivers' && (
          <RiverReservoir 
            riverData={riverData}
            reservoirData={reservoirData}
          />
        )}

        {activeTab === 'timeline' && (
          <FloodTimeline 
            floodData={floodData}
          />
        )}

        {activeTab === 'extreme-rain' && (
          <ExtremeRainfall 
            rainfallData={rainfallData}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherStations 
            weatherData={weatherData}
          />
        )}

        {activeTab === 'historical' && (
          <HistoricalIntel 
            historicalData={historicalData}
          />
        )}

        {activeTab === 'land-use' && (
          <LandUseChange 
            landUseData={landUseData}
          />
        )}

        {activeTab === 'coastal' && (
          <CoastalCyclone 
            coastalData={coastalData}
            locationData={locationData}
          />
        )}

        {activeTab === 'validation' && (
          <GroundValidation 
            validationData={validationData}
          />
        )}

        {activeTab === 'feedback-loop' && (
          <FeedbackLoop 
            lastUpdated={lastUpdated}
            onManualRefresh={triggerRefresh}
            isRefreshing={isRefreshing}
          />
        )}
      </main>

      {/* Platform Global Footer */}
      <footer className="w-full bg-[#0a1120] border-t border-white/10 mt-auto py-6 text-sm text-slate-400">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-white text-base tracking-tight">FloodAI</span>
            <span className="text-slate-300 font-medium">– Live Flood Intelligence Platform Prototype</span>
          </div>

          <div className="text-center md:text-right text-xs text-slate-400 max-w-lg leading-relaxed font-normal">
            Notice: Developed as a high-fidelity research & engineering prototype. Risk values, flood depths, and recurrence return periods are statistical models and NOT official emergency warnings.
          </div>
        </div>
      </footer>
    </div>
  );
}
