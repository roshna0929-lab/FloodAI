// Dynamic Live State Engine for all locations
// Simulates continuous sensor telemetry updates, rainfall accumulation, river levels, and risk recalculation

export class LiveStateEngine {
  constructor() {
    this.locationsState = {};
    this.initializeDefaultStates();
  }

  initializeDefaultStates() {
    const defaultProfiles = {
      chennai: {
        riskScore: 74,
        riskLevel: 'High',
        confidence: 88,
        rainfall1h: 38.4,
        rainfall3h: 76.2,
        rainfall6h: 118.0,
        rainfall24h: 182.5,
        forecast24h: 95.0,
        soilSaturation: 78.4,
        riverLevelM: 7.82,
        bankfullM: 8.50,
        bankfullPct: 92.0,
        reservoirStoragePct: 85.6,
        floodExtentKm2: 2.8,
        floodExtentRange: '2.4 – 3.3 km²',
        depthMin: 0.4,
        depthMax: 1.1,
        peakDepth: 1.25,
        floodDurationHours: 14.5,
        recessionStatus: 'Peak flooding',
        affectedRoads: 34,
        affectedBuildings: 1420,
        tempC: 27.8,
        humidity: 92,
        windSpeedKmph: 46,
        windDirection: 'ENE (75°)',
        pressureHpa: 994,
        lightningStrikes25km: 18,
        historicalAvgRecoveryHours: 32.0,
        currentRecoveryHoursElapsed: 14.5,
        recessionPercentage: 15
      },
      mumbai: {
        riskScore: 68,
        riskLevel: 'High',
        confidence: 85,
        rainfall1h: 42.0,
        rainfall3h: 88.5,
        rainfall6h: 135.0,
        rainfall24h: 215.0,
        forecast24h: 80.0,
        soilSaturation: 82.0,
        riverLevelM: 4.15,
        bankfullM: 4.50,
        bankfullPct: 92.2,
        reservoirStoragePct: 99.8,
        floodExtentKm2: 3.4,
        floodExtentRange: '2.9 – 4.0 km²',
        depthMin: 0.5,
        depthMax: 1.4,
        peakDepth: 1.55,
        floodDurationHours: 11.0,
        recessionStatus: 'Flood rising',
        affectedRoads: 48,
        affectedBuildings: 2180,
        tempC: 26.5,
        humidity: 95,
        windSpeedKmph: 38,
        windDirection: 'WSW (250°)',
        pressureHpa: 1001,
        lightningStrikes25km: 26,
        historicalAvgRecoveryHours: 24.0,
        currentRecoveryHoursElapsed: 11.0,
        recessionPercentage: 5
      },
      guwahati: {
        riskScore: 86,
        riskLevel: 'Extreme',
        confidence: 91,
        rainfall1h: 52.0,
        rainfall3h: 110.0,
        rainfall6h: 165.0,
        rainfall24h: 245.0,
        forecast24h: 120.0,
        soilSaturation: 89.5,
        riverLevelM: 50.32,
        bankfullM: 49.68,
        bankfullPct: 101.3,
        reservoirStoragePct: 88.8,
        floodExtentKm2: 5.8,
        floodExtentRange: '5.1 – 6.6 km²',
        depthMin: 0.8,
        depthMax: 1.8,
        peakDepth: 2.10,
        floodDurationHours: 28.0,
        recessionStatus: 'Peak flooding',
        affectedRoads: 62,
        affectedBuildings: 3950,
        tempC: 25.2,
        humidity: 96,
        windSpeedKmph: 24,
        windDirection: 'NNE (30°)',
        pressureHpa: 992,
        lightningStrikes25km: 34,
        historicalAvgRecoveryHours: 54.0,
        currentRecoveryHoursElapsed: 28.0,
        recessionPercentage: 20
      },
      kochi: {
        riskScore: 56,
        riskLevel: 'High',
        confidence: 84,
        rainfall1h: 22.0,
        rainfall3h: 54.0,
        rainfall6h: 92.0,
        rainfall24h: 148.0,
        forecast24h: 65.0,
        soilSaturation: 84.0,
        riverLevelM: 5.65,
        bankfullM: 6.80,
        bankfullPct: 83.1,
        reservoirStoragePct: 92.2,
        floodExtentKm2: 1.9,
        floodExtentRange: '1.5 – 2.4 km²',
        depthMin: 0.3,
        depthMax: 0.8,
        peakDepth: 0.95,
        floodDurationHours: 9.0,
        recessionStatus: 'Receding',
        affectedRoads: 18,
        affectedBuildings: 820,
        tempC: 28.0,
        humidity: 90,
        windSpeedKmph: 32,
        windDirection: 'SW (220°)',
        pressureHpa: 1006,
        lightningStrikes25km: 12,
        historicalAvgRecoveryHours: 28.0,
        currentRecoveryHoursElapsed: 9.0,
        recessionPercentage: 45
      },
      vijayawada: {
        riskScore: 72,
        riskLevel: 'High',
        confidence: 86,
        rainfall1h: 31.0,
        rainfall3h: 69.0,
        rainfall6h: 114.0,
        rainfall24h: 178.0,
        forecast24h: 55.0,
        soilSaturation: 76.5,
        riverLevelM: 14.20,
        bankfullM: 15.50,
        bankfullPct: 91.6,
        reservoirStoragePct: 98.4,
        floodExtentKm2: 3.1,
        floodExtentRange: '2.6 – 3.7 km²',
        depthMin: 0.5,
        depthMax: 1.2,
        peakDepth: 1.35,
        floodDurationHours: 16.0,
        recessionStatus: 'Receding',
        affectedRoads: 29,
        affectedBuildings: 1650,
        tempC: 29.4,
        humidity: 88,
        windSpeedKmph: 28,
        windDirection: 'E (90°)',
        pressureHpa: 1002,
        lightningStrikes25km: 8,
        historicalAvgRecoveryHours: 36.0,
        currentRecoveryHoursElapsed: 16.0,
        recessionPercentage: 35
      },
      kolkata: {
        riskScore: 48,
        riskLevel: 'Moderate',
        confidence: 83,
        rainfall1h: 18.5,
        rainfall3h: 42.0,
        rainfall6h: 68.0,
        rainfall24h: 112.0,
        forecast24h: 45.0,
        soilSaturation: 71.0,
        riverLevelM: 4.85,
        bankfullM: 5.50,
        bankfullPct: 88.2,
        reservoirStoragePct: 76.8,
        floodExtentKm2: 1.4,
        floodExtentRange: '1.1 – 1.8 km²',
        depthMin: 0.2,
        depthMax: 0.5,
        peakDepth: 0.65,
        floodDurationHours: 6.0,
        recessionStatus: 'Receding',
        affectedRoads: 14,
        affectedBuildings: 580,
        tempC: 30.1,
        humidity: 89,
        windSpeedKmph: 22,
        windDirection: 'S (180°)',
        pressureHpa: 1004,
        lightningStrikes25km: 15,
        historicalAvgRecoveryHours: 18.0,
        currentRecoveryHoursElapsed: 6.0,
        recessionPercentage: 60
      },
      delhi: {
        riskScore: 22,
        riskLevel: 'Low',
        confidence: 89,
        rainfall1h: 4.2,
        rainfall3h: 9.5,
        rainfall6h: 16.0,
        rainfall24h: 28.0,
        forecast24h: 15.0,
        soilSaturation: 42.0,
        riverLevelM: 204.30,
        bankfullM: 205.33,
        bankfullPct: 72.5,
        reservoirStoragePct: 35.0,
        floodExtentKm2: 0.4,
        floodExtentRange: '0.2 – 0.6 km²',
        depthMin: 0.1,
        depthMax: 0.25,
        peakDepth: 0.30,
        floodDurationHours: 2.0,
        recessionStatus: 'Near baseline',
        affectedRoads: 2,
        affectedBuildings: 40,
        tempC: 32.5,
        humidity: 62,
        windSpeedKmph: 14,
        windDirection: 'NW (315°)',
        pressureHpa: 1010,
        lightningStrikes25km: 2,
        historicalAvgRecoveryHours: 12.0,
        currentRecoveryHoursElapsed: 2.0,
        recessionPercentage: 90
      },
      hyderabad: {
        riskScore: 44,
        riskLevel: 'Moderate',
        confidence: 82,
        rainfall1h: 16.0,
        rainfall3h: 35.0,
        rainfall6h: 58.0,
        rainfall24h: 84.0,
        forecast24h: 30.0,
        soilSaturation: 61.0,
        riverLevelM: 4.25,
        bankfullM: 5.50,
        bankfullPct: 77.3,
        reservoirStoragePct: 81.0,
        floodExtentKm2: 1.1,
        floodExtentRange: '0.8 – 1.5 km²',
        depthMin: 0.2,
        depthMax: 0.55,
        peakDepth: 0.70,
        floodDurationHours: 5.0,
        recessionStatus: 'Receding',
        affectedRoads: 11,
        affectedBuildings: 390,
        tempC: 29.0,
        humidity: 78,
        windSpeedKmph: 19,
        windDirection: 'E (95°)',
        pressureHpa: 1008,
        lightningStrikes25km: 6,
        historicalAvgRecoveryHours: 16.0,
        currentRecoveryHoursElapsed: 5.0,
        recessionPercentage: 70
      },
      'morigaon-village': {
        riskScore: 89,
        riskLevel: 'Extreme',
        confidence: 93,
        rainfall1h: 48.0,
        rainfall3h: 96.0,
        rainfall6h: 154.0,
        rainfall24h: 220.0,
        forecast24h: 110.0,
        soilSaturation: 94.0,
        riverLevelM: 51.15,
        bankfullM: 49.80,
        bankfullPct: 102.7,
        reservoirStoragePct: 93.5,
        floodExtentKm2: 9.4,
        floodExtentRange: '8.2 – 11.0 km²',
        depthMin: 1.1,
        depthMax: 2.4,
        peakDepth: 2.65,
        floodDurationHours: 36.0,
        recessionStatus: 'Flood rising',
        affectedRoads: 24,
        affectedBuildings: 2150,
        tempC: 24.8,
        humidity: 97,
        windSpeedKmph: 22,
        windDirection: 'NE (45°)',
        pressureHpa: 991,
        lightningStrikes25km: 30,
        historicalAvgRecoveryHours: 72.0,
        currentRecoveryHoursElapsed: 36.0,
        recessionPercentage: 10
      }
    };

    const now = new Date().toISOString();
    for (const [key, profile] of Object.entries(defaultProfiles)) {
      this.locationsState[key] = {
        ...profile,
        lastUpdated: now,
        dataSource: 'Simulated Sensor Feed (AWS, ARG & Radar)',
        tickCount: 0
      };
    }
  }

  // Live simulation tick: modifies telemetry slightly to simulate dynamic environmental drift
  simulateTick(locationId) {
    const s = this.locationsState[locationId];
    if (!s) return null;

    s.tickCount += 1;
    // Tiny jitter
    const rainDelta = (Math.random() - 0.45) * 1.5;
    s.rainfall1h = Math.max(0, Number((s.rainfall1h + rainDelta).toFixed(1)));
    s.rainfall24h = Math.max(0, Number((s.rainfall24h + Math.max(0, rainDelta)).toFixed(1)));

    const riverDelta = (Math.random() - 0.46) * 0.04;
    s.riverLevelM = Number((s.riverLevelM + riverDelta).toFixed(2));
    s.bankfullPct = Number(((s.riverLevelM / s.bankfullM) * 100).toFixed(1));

    const soilDelta = (Math.random() - 0.48) * 0.5;
    s.soilSaturation = Math.min(100, Math.max(10, Number((s.soilSaturation + soilDelta).toFixed(1))));

    // Recalculate transparent flash-flood score
    const flashBreakdown = this.calculateFlashFloodModel(locationId, s);
    s.flashFloodScore = flashBreakdown.totalScore;
    s.flashFloodBreakdown = flashBreakdown;

    // Recalculate total composite flood risk score
    s.riskScore = Math.min(100, Math.max(0, Math.round(
      flashBreakdown.totalScore * 0.45 +
      (s.bankfullPct > 100 ? 100 : s.bankfullPct) * 0.35 +
      (s.soilSaturation) * 0.20
    )));

    if (s.riskScore >= 75) s.riskLevel = 'Extreme';
    else if (s.riskScore >= 50) s.riskLevel = 'High';
    else if (s.riskScore >= 25) s.riskLevel = 'Moderate';
    else s.riskLevel = 'Low';

    s.lastUpdated = new Date().toISOString();
    return s;
  }

  calculateFlashFloodModel(locationId, state) {
    // 5 transparent input components:
    // 1. Rainfall Accumulation & Intensity (max 35 pts)
    // 2. Antecedent Soil Saturation (max 25 pts)
    // 3. Terrain Slope & Elevation (max 15 pts)
    // 4. Watershed & Flow Accumulation (max 15 pts)
    // 5. Drainage & Impervious Condition (max 10 pts)

    const rainScore = Math.min(35, Math.round((state.rainfall24h / 200) * 35));
    const soilScore = Math.min(25, Math.round((state.soilSaturation / 100) * 25));

    let terrainScore = 10;
    let watershedScore = 11;
    let drainageScore = 8;

    if (locationId === 'guwahati' || locationId === 'morigaon-village') {
      terrainScore = 14; watershedScore = 14; drainageScore = 9;
    } else if (locationId === 'mumbai') {
      terrainScore = 11; watershedScore = 13; drainageScore = 9;
    } else if (locationId === 'delhi') {
      terrainScore = 5; watershedScore = 6; drainageScore = 4;
    }

    const total = Math.min(100, rainScore + soilScore + terrainScore + watershedScore + drainageScore);

    return {
      rainfallContribution: { score: rainScore, max: 35, label: 'Rainfall Accumulation & Intensity' },
      soilContribution: { score: soilScore, max: 25, label: 'Antecedent Soil Saturation' },
      terrainContribution: { score: terrainScore, max: 15, label: 'Terrain Slope & Flow Accumulation' },
      watershedContribution: { score: watershedScore, max: 15, label: 'Watershed & Basin Confluence' },
      drainageContribution: { score: drainageScore, max: 10, label: 'Drainage Imperviousness & Bottlenecks' },
      totalScore: total,
      riskLevel: total >= 75 ? 'High' : (total >= 45 ? 'Moderate' : 'Low')
    };
  }

  getDashboard(locationId) {
    let s = this.locationsState[locationId];
    if (!s) {
      s = this.locationsState['chennai'];
    }
    const flash = this.calculateFlashFloodModel(locationId, s);

    // Explanations
    const contributingFactors = [
      `24-hour rainfall is ${s.rainfall24h} mm (${Math.round((s.rainfall24h / 220) * 100)}% of extreme historical threshold)`,
      `Soil saturation is at ${s.soilSaturation}% (low ground absorption remaining)`,
      `River water level is at ${s.bankfullPct}% of estimated bankfull threshold (${s.riverLevelM}m of ${s.bankfullM}m)`,
      `Upstream reservoir storage is at ${s.reservoirStoragePct}% capacity`,
      `Built-up impervious surface in catchment has increased significantly since 2020`
    ];

    let recommendedInterpretation = '';
    if (s.riskScore >= 75) {
      recommendedInterpretation = 'Extreme flood threat: River water levels, rapid rainfall accumulation, and saturated soil conditions are synchronously peaking. Lowland drainage channels are over capacity.';
    } else if (s.riskScore >= 50) {
      recommendedInterpretation = 'High flood alert: Rainfall, soil saturation, and river discharge are simultaneously elevated. Waterlogging and street inundation occurring in depressed sub-basins.';
    } else if (s.riskScore >= 25) {
      recommendedInterpretation = 'Moderate risk: Localized ponding possible in poor drainage junctions. River and catchment storage buffers remain within safe operational bounds.';
    } else {
      recommendedInterpretation = 'Low flood risk: River and reservoir levels are normal. Catchment infiltration capacity is ample for forecast precipitation.';
    }

    return {
      locationId,
      riskLevel: s.riskLevel,
      riskScore: s.riskScore,
      confidence: s.confidence,
      uncertaintyRange: `±${Math.round((100 - s.confidence) * 0.15)} pts`,
      currentRainfall: {
        last1h: s.rainfall1h,
        last3h: s.rainfall3h,
        last6h: s.rainfall6h,
        last24h: s.rainfall24h,
        unit: 'mm'
      },
      forecastRainfall: {
        next24h: s.forecast24h,
        next48h: Math.round(s.forecast24h * 1.6),
        trend: s.forecast24h > 60 ? 'increasing' : 'stable',
        unit: 'mm'
      },
      riverLevel: {
        current: s.riverLevelM,
        bankfull: s.bankfullM,
        percentageOfBankfull: s.bankfullPct,
        unit: 'm',
        trend: s.bankfullPct > 90 ? 'rising' : (s.bankfullPct > 75 ? 'stable' : 'falling')
      },
      reservoirStorage: {
        percentage: s.reservoirStoragePct,
        status: s.reservoirStoragePct > 90 ? 'Spillway Discharging' : 'Controlled Regulation'
      },
      soilSaturation: {
        value: s.soilSaturation,
        unit: '%',
        status: s.soilSaturation > 80 ? 'Saturated' : (s.soilSaturation > 60 ? 'Moist' : 'Normal')
      },
      floodExtent: {
        currentKm2: s.floodExtentKm2,
        uncertaintyRange: s.floodExtentRange,
        unit: 'km²'
      },
      floodDepth: {
        estimatedMinM: s.depthMin,
        estimatedMaxM: s.depthMax,
        peakM: s.peakDepth,
        unit: 'm',
        disclaimer: 'Estimated depth – uncertainty exists because satellite observations may not directly measure water depth.'
      },
      floodDuration: {
        currentHours: s.floodDurationHours,
        recessionStatus: s.recessionStatus,
        estimatedTimeToNormalHours: Math.max(2, Math.round(s.historicalAvgRecoveryHours - (s.floodDurationHours * 0.6)))
      },
      affectedInfrastructure: {
        roads: s.affectedRoads,
        buildings: s.affectedBuildings
      },
      lastUpdated: s.lastUpdated,
      dataSourceStatus: s.dataSource,
      flashFloodModel: flash,
      riskExplanation: {
        contributingFactors,
        recommendedInterpretation,
        disclaimer: 'Notice: This platform is a research prototype. Risk indices are statistical computational estimates and NOT official government emergency warnings.'
      }
    };
  }

  getExtremeRainfall(locationId) {
    const s = this.locationsState[locationId] || this.locationsState['chennai'];
    return {
      locationId,
      max1h: s.rainfall1h,
      max3h: s.rainfall3h,
      max6h: s.rainfall6h,
      max12h: Math.round(s.rainfall6h * 1.35),
      max24h: s.rainfall24h,
      multiDayCumulative: Math.round(s.rainfall24h * 1.55),
      rainfallIntensity: `${s.rainfall1h > 35 ? 'Heavy Downpour' : (s.rainfall1h > 15 ? 'Moderate Rain' : 'Light Showers')} (${s.rainfall1h} mm/hr)`,
      rainfallAnomaly: `+${Math.round(((s.rainfall24h - 45) / 45) * 100)}% above 30-year daily normal`,
      anomalyCategory: s.rainfall24h > 180 ? 'Exceptional' : (s.rainfall24h > 120 ? 'Severe' : (s.rainfall24h > 60 ? 'Unusual' : 'Normal')),
      historicalExtreme24h: 310.0, // Benchmark historical record
      comparisonWithHistoricalMax: `${Math.round((s.rainfall24h / 310.0) * 100)}% of all-time 24h historical peak`,
      returnPeriods: [
        { period: '2-Year Event', thresholdMm: 95, exceedanceProbability: '50% Annual Probability', currentStatus: s.rainfall24h >= 95 ? 'Exceeded' : 'Below' },
        { period: '5-Year Event', thresholdMm: 130, exceedanceProbability: '20% Annual Probability', currentStatus: s.rainfall24h >= 130 ? 'Exceeded' : 'Below' },
        { period: '10-Year Event', thresholdMm: 165, exceedanceProbability: '10% Annual Probability', currentStatus: s.rainfall24h >= 165 ? 'Exceeded' : 'Below' },
        { period: '25-Year Event', thresholdMm: 210, exceedanceProbability: '4% Annual Probability', currentStatus: s.rainfall24h >= 210 ? 'Exceeded' : 'Below' },
        { period: '50-Year Event', thresholdMm: 260, exceedanceProbability: '2% Annual Probability', currentStatus: s.rainfall24h >= 260 ? 'Approaching' : 'Below' },
        { period: '100-Year Event', thresholdMm: 310, exceedanceProbability: '1% Annual Probability', currentStatus: s.rainfall24h >= 310 ? 'Exceeded' : 'Below' }
      ],
      scientificWording: 'A 100-year event does not mean it occurs only once every 100 years. It represents an estimated 1% annual exceedance probability under the statistical assumptions used.'
    };
  }

  getWeather(locationId) {
    const s = this.locationsState[locationId] || this.locationsState['chennai'];
    return {
      locationId,
      stations: [
        { name: 'Automated Weather Station (AWS-01 City Central)', type: 'AWS', rainfall1h: s.rainfall1h, status: 'Online (Simulated)', latency: '4s' },
        { name: 'Automated Rain Gauge (ARG-04 Catchment)', type: 'ARG', rainfall1h: Number((s.rainfall1h * 1.15).toFixed(1)), status: 'Online (Simulated)', latency: '8s' },
        { name: 'S-Band Doppler Weather Radar (DWR)', type: 'Radar', reflectivityDbz: 48.5, echoTopsKm: 12.4, status: 'Active Scan' },
        { name: 'INSAT-3DR Rapid Satellite Precipitation', type: 'Satellite', cloudTopTempC: -68.4, precipitationRateMmHr: s.rainfall1h, status: 'Geostationary Feed' }
      ],
      currentReadings: {
        temperatureC: s.tempC,
        humidityPct: s.humidity,
        windSpeedKmph: s.windSpeedKmph,
        windDirection: s.windDirection,
        pressureHpa: s.pressureHpa,
        lightningActivity25km: `${s.lightningStrikes25km} strikes in past 30 mins`,
        lastRainfall1h: s.rainfall1h,
        lastRainfall3h: s.rainfall3h,
        lastRainfall6h: s.rainfall6h,
        lastRainfall24h: s.rainfall24h,
        forecastRainfall24h: s.forecast24h
      },
      lastUpdated: s.lastUpdated,
      source: 'Simulated multi-sensor fusion (IMD/AWS/Doppler mesh)'
    };
  }

  getFloodIntelligence(locationId) {
    const s = this.locationsState[locationId] || this.locationsState['chennai'];
    return {
      locationId,
      floodExtentKm2: s.floodExtentKm2,
      floodExtentUncertaintyRange: s.floodExtentRange,
      estimatedDepthM: `${s.depthMin} – ${s.depthMax} m`,
      peakDepthM: s.peakDepth,
      currentDurationHours: s.floodDurationHours,
      estimatedRecessionHours: Math.round(s.historicalAvgRecoveryHours * 0.65),
      historicalAvgRecoveryHours: s.historicalAvgRecoveryHours,
      confidenceInterval: `${s.confidence}%`,
      recessionStatus: s.recessionStatus,
      recessionPercentage: s.recessionPercentage,
      timeSincePeak: `${Math.round(s.floodDurationHours * 0.4)} hours`,
      estimatedTimeToNormal: `${Math.max(2, Math.round(s.historicalAvgRecoveryHours - s.floodDurationHours))} hours`,
      timelineStages: [
        { name: 'Rainfall Commences', time: '-18h', status: 'Completed', detail: 'Convective storm cloudburst onset' },
        { name: 'Surface Accumulation', time: '-14h', status: 'Completed', detail: 'Depressions & arterial roads waterlogged' },
        { name: 'Flood Onset Stage', time: '-10h', status: 'Completed', detail: 'Drainage network surcharges; river level rising' },
        { name: 'Flood Peak', time: '-4h', status: s.recessionStatus === 'Flood rising' ? 'Approaching' : 'Passed', detail: 'Maximum water depth recorded in low-lying zones' },
        { name: 'Recession Starts', time: 'Now', status: s.recessionPercentage > 10 ? 'Active' : 'Pending', detail: 'Pumping stations & gravity outfalls operating' },
        { name: 'Return to Baseline', time: '+18h (fc)', status: 'Forecast', detail: 'Roads cleared; river recedes below warning mark' }
      ],
      timeSeriesGraph: [
        { time: '-24h', extentKm2: 0.2, depthM: 0.1, baseline: 0 },
        { time: '-18h', extentKm2: 0.8, depthM: 0.3, baseline: 0 },
        { time: '-12h', extentKm2: 1.9, depthM: 0.7, baseline: 0 },
        { time: '-6h',  extentKm2: 2.7, depthM: 1.1, baseline: 0 },
        { time: 'Peak', extentKm2: 3.1, depthM: 1.25, baseline: 0 },
        { time: 'Now',  extentKm2: s.floodExtentKm2, depthM: (s.depthMin + s.depthMax) / 2, baseline: 0 },
        { time: '+6h',  extentKm2: Number((s.floodExtentKm2 * 0.75).toFixed(1)), depthM: Number(((s.depthMin + s.depthMax) * 0.35).toFixed(2)), baseline: 0 },
        { time: '+18h', extentKm2: 0.3, depthM: 0.1, baseline: 0 }
      ],
      scientificDepthNote: 'Estimated depth – uncertainty exists because satellite observations (optical & SAR) may not directly measure water depth; bathymetry and digital elevation models (DEM) are fused with hydrologic routing.'
    };
  }
}

export const liveStateEngine = new LiveStateEngine();
