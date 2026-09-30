// Ground Validation intelligence metrics and multi-source ground truth records
export const VALIDATION_DATA = {
  chennai: {
    metrics: {
      precision: 0.88, // 88%
      recall: 0.85, // 85%
      f1Score: 0.865,
      falseAlarmRate: 0.12, // 12%
      missedEventRate: 0.15, // 15%
      spatialIoU: 0.81, // Intersection over Union for flood polygon extent
      depthErrorRMSE: '±0.16 m',
      forecastLeadTime: '4.8 hours',
      riskProbabilityCalibrationBrier: 0.082, // lower is better
      totalGroundSensors: 42,
      activeValidationPoints: 128
    },
    observationsTable: [
      {
        id: 'VAL-101',
        prediction: 'Depth: 0.8–1.1 m (Severe Inundation)',
        observed: 'Depth: 0.95 m (CWPRS Ultrasonic Sensor)',
        status: 'Correct',
        location: 'Velachery 100-Ft Bypass Road',
        time: '12 mins ago',
        source: 'Automated Water Level Sensor (CWPRS)',
        confidence: '95%'
      },
      {
        id: 'VAL-102',
        prediction: 'Depth: 0.4–0.7 m (Moderate Inundation)',
        observed: 'Depth: 0.52 m (Road Gauge Stick)',
        status: 'Correct',
        location: 'Kotturpuram Gandhi Mandapam Rd',
        time: '28 mins ago',
        source: 'GCC Field Observer (Geotagged)',
        confidence: '91%'
      },
      {
        id: 'VAL-103',
        prediction: 'Extent: 1.4 km² flooded zone',
        observed: 'Extent: 1.32 km² (Sentinel-1 SAR cross-check)',
        status: 'Correct',
        location: 'Pallikaranai Marsh Outer Fringe',
        time: '1 hour ago',
        source: 'Copernicus Sentinel-1 SAR Radar',
        confidence: '89%'
      },
      {
        id: 'VAL-104',
        prediction: 'Dry / No waterlogging (<0.1m)',
        observed: 'Waterlogging: 0.35 m (Localized drain block)',
        status: 'Incorrect (False Negative)',
        location: 'T. Nagar Panagal Park Subway',
        time: '2 hours ago',
        source: 'Citizen IoT App + Photograph',
        confidence: '78%'
      },
      {
        id: 'VAL-105',
        prediction: 'Depth: 0.6–0.9 m (High Alert)',
        observed: 'Depth: 0.72 m (Traffic Police Dept)',
        status: 'Correct',
        location: 'Mudichur Road Near Bridge',
        time: '3 hours ago',
        source: 'Traffic Police Drone Surveillance',
        confidence: '94%'
      },
      {
        id: 'VAL-106',
        prediction: 'Depth: 0.2–0.4 m (Shallow)',
        observed: 'Depth: 0.05 m (Water drained)',
        status: 'False Alarm',
        location: 'Guindy Race Course Peripheral Lane',
        time: '4 hours ago',
        source: 'PWD Field Inspection Unit',
        confidence: '83%'
      }
    ],
    calibrationCurve: [
      { predictedProbability: 10, observedFrequency: 8 },
      { predictedProbability: 25, observedFrequency: 22 },
      { predictedProbability: 50, observedFrequency: 48 },
      { predictedProbability: 75, observedFrequency: 79 },
      { predictedProbability: 90, observedFrequency: 88 }
    ]
  },
  mumbai: {
    metrics: {
      precision: 0.86,
      recall: 0.89,
      f1Score: 0.875,
      falseAlarmRate: 0.14,
      missedEventRate: 0.11,
      spatialIoU: 0.84,
      depthErrorRMSE: '±0.18 m',
      forecastLeadTime: '3.6 hours',
      riskProbabilityCalibrationBrier: 0.091,
      totalGroundSensors: 58,
      activeValidationPoints: 164
    },
    observationsTable: [
      {
        id: 'VAL-201',
        prediction: 'Depth: 1.1–1.5 m (Extreme Waterlogging)',
        observed: 'Depth: 1.30 m (Subway Gauge)',
        status: 'Correct',
        location: 'Milan Subway (Santacruz)',
        time: '15 mins ago',
        source: 'BMC Disaster Management Sensor',
        confidence: '96%'
      },
      {
        id: 'VAL-202',
        prediction: 'Depth: 0.7–1.0 m (Severe Inundation)',
        observed: 'Depth: 0.85 m (Railway Track Sensor)',
        status: 'Correct',
        location: 'Kurla West Railway Track km 15',
        time: '34 mins ago',
        source: 'Central Railway IoT Gauge',
        confidence: '92%'
      },
      {
        id: 'VAL-203',
        prediction: 'Depth: 0.4–0.6 m',
        observed: 'Depth: 0.20 m (Underground pumps working)',
        status: 'False Alarm',
        location: 'Hindmata Dadar Flyover Depressed Lane',
        time: '1 hour ago',
        source: 'Municipal Ward Officer Call',
        confidence: '84%'
      }
    ],
    calibrationCurve: [
      { predictedProbability: 10, observedFrequency: 11 },
      { predictedProbability: 25, observedFrequency: 24 },
      { predictedProbability: 50, observedFrequency: 53 },
      { predictedProbability: 75, observedFrequency: 74 },
      { predictedProbability: 90, observedFrequency: 87 }
    ]
  },
  guwahati: {
    metrics: {
      precision: 0.89,
      recall: 0.92,
      f1Score: 0.905,
      falseAlarmRate: 0.11,
      missedEventRate: 0.08,
      spatialIoU: 0.86,
      depthErrorRMSE: '±0.14 m',
      forecastLeadTime: '5.2 hours',
      riskProbabilityCalibrationBrier: 0.075,
      totalGroundSensors: 35,
      activeValidationPoints: 92
    },
    observationsTable: [
      {
        id: 'VAL-301',
        prediction: 'Depth: 1.2–1.8 m (Catastrophic Basin Flood)',
        observed: 'Depth: 1.45 m (SDRF Boat Marker)',
        status: 'Correct',
        location: 'Anil Nagar & Nabin Nagar Lane 4',
        time: '20 mins ago',
        source: 'SDRF Rescue Unit Geotagged Report',
        confidence: '97%'
      },
      {
        id: 'VAL-302',
        prediction: 'Extent: 4.8 km² flooded zone',
        observed: 'Extent: 4.65 km² (RISAT-1A SAR Scan)',
        status: 'Correct',
        location: 'Bharalu Catchment & Deepor Beel Fringe',
        time: '45 mins ago',
        source: 'ISRO RISAT Satellite Observation',
        confidence: '93%'
      }
    ],
    calibrationCurve: [
      { predictedProbability: 10, observedFrequency: 9 },
      { predictedProbability: 25, observedFrequency: 27 },
      { predictedProbability: 50, observedFrequency: 52 },
      { predictedProbability: 75, observedFrequency: 78 },
      { predictedProbability: 90, observedFrequency: 91 }
    ]
  },
  default: {
    metrics: {
      precision: 0.84,
      recall: 0.82,
      f1Score: 0.83,
      falseAlarmRate: 0.16,
      missedEventRate: 0.18,
      spatialIoU: 0.78,
      depthErrorRMSE: '±0.19 m',
      forecastLeadTime: '4.0 hours',
      riskProbabilityCalibrationBrier: 0.098,
      totalGroundSensors: 28,
      activeValidationPoints: 65
    },
    observationsTable: [
      {
        id: 'VAL-901',
        prediction: 'Depth: 0.3–0.6 m (Waterlogged)',
        observed: 'Depth: 0.45 m (Telemetry Sensor)',
        status: 'Correct',
        location: 'Central Arterial Drainage Corridor',
        time: '18 mins ago',
        source: 'Smart City Hydrologic Telemetry Sensor',
        confidence: '90%'
      },
      {
        id: 'VAL-902',
        prediction: 'Extent: 2.1 km² flooded area',
        observed: 'Extent: 1.95 km² (Satellite verify)',
        status: 'Correct',
        location: 'Low-lying Riverbank Terrace',
        time: '1 hour ago',
        source: 'Copernicus Sentinel-2 & High Res Drone',
        confidence: '87%'
      },
      {
        id: 'VAL-903',
        prediction: 'Depth: 0.2–0.4 m (Shallow)',
        observed: 'Depth: 0.08 m (Drained via gravity)',
        status: 'False Alarm',
        location: 'Market Place Sector 4 Sump',
        time: '2 hours ago',
        source: 'Municipal Sanitary Inspection Post',
        confidence: '81%'
      }
    ],
    calibrationCurve: [
      { predictedProbability: 10, observedFrequency: 12 },
      { predictedProbability: 25, observedFrequency: 23 },
      { predictedProbability: 50, observedFrequency: 49 },
      { predictedProbability: 75, observedFrequency: 72 },
      { predictedProbability: 90, observedFrequency: 85 }
    ]
  }
};
