// Generates 55 years of realistic simulated historical data (1970 to 2025)
export function generateHistoricalData(locationId) {
  const currentYear = 2025;
  const startYear = 1970;
  const data = [];

  // Base profile per location
  let baseRain = 1300;
  let baseMax24 = 140;
  let baseEvents = 1;
  let baseExtent = 15;
  let baseDepth = 0.6;
  let baseDuration = 18;
  let baseRecovery = 2.5;

  if (locationId === 'chennai') {
    baseRain = 1400; baseMax24 = 210; baseEvents = 2; baseExtent = 48; baseDepth = 1.2; baseDuration = 36; baseRecovery = 4.2;
  } else if (locationId === 'mumbai') {
    baseRain = 2400; baseMax24 = 260; baseEvents = 3; baseExtent = 55; baseDepth = 1.4; baseDuration = 28; baseRecovery = 3.8;
  } else if (locationId === 'guwahati' || locationId === 'morigaon-village') {
    baseRain = 2100; baseMax24 = 190; baseEvents = 4; baseExtent = 75; baseDepth = 1.8; baseDuration = 64; baseRecovery = 7.5;
  } else if (locationId === 'kochi') {
    baseRain = 3100; baseMax24 = 220; baseEvents = 2; baseExtent = 35; baseDepth = 1.1; baseDuration = 32; baseRecovery = 3.9;
  } else if (locationId === 'vijayawada') {
    baseRain = 1050; baseMax24 = 160; baseEvents = 1; baseExtent = 42; baseDepth = 0.9; baseDuration = 30; baseRecovery = 3.5;
  } else if (locationId === 'kolkata') {
    baseRain = 1750; baseMax24 = 180; baseEvents = 2; baseExtent = 38; baseDepth = 0.8; baseDuration = 24; baseRecovery = 2.8;
  } else if (locationId === 'delhi') {
    baseRain = 750; baseMax24 = 110; baseEvents = 1; baseExtent = 22; baseDepth = 0.5; baseDuration = 16; baseRecovery = 2.0;
  } else if (locationId === 'hyderabad') {
    baseRain = 850; baseMax24 = 135; baseEvents = 1; baseExtent = 28; baseDepth = 0.7; baseDuration = 20; baseRecovery = 2.4;
  }

  for (let y = startYear; y <= currentYear; y++) {
    // Climate trend factor: slight upward variability towards recent decades
    const climateShift = 1 + ((y - 1970) / 55) * 0.18;
    // Deterministic pseudo-randomness based on year and location
    const seed = Math.sin(y * 997 + (locationId.charCodeAt(0) || 65)) * 10000;
    const r1 = (seed - Math.floor(seed));
    const r2 = Math.cos(y * 331) * 0.5 + 0.5;

    // Special historical milestone benchmark years
    let isSuperEvent = false;
    let eventName = 'Monsoon Depression';

    if (locationId === 'chennai' && y === 2015) {
      isSuperEvent = true; eventName = 'Historic 2015 Northeast Monsoon Floods';
    } else if (locationId === 'mumbai' && y === 2005) {
      isSuperEvent = true; eventName = '26 July 2005 Extreme Cloudburst';
    } else if (locationId === 'kochi' && y === 2018) {
      isSuperEvent = true; eventName = 'August 2018 Great Kerala Floods';
    } else if (locationId === 'hyderabad' && y === 2020) {
      isSuperEvent = true; eventName = 'October 2020 Deep Depression Floods';
    } else if (locationId === 'vijayawada' && y === 2024) {
      isSuperEvent = true; eventName = 'September 2024 Budameru Flash Inundation';
    } else if (locationId === 'delhi' && y === 2023) {
      isSuperEvent = true; eventName = 'July 2023 Record Yamuna Spillover (208.66m)';
    } else if ((locationId === 'guwahati' || locationId === 'morigaon-village') && (y === 2004 || y === 2022)) {
      isSuperEvent = true; eventName = `${y} Brahmaputra Basin Deluge`;
    }

    const annualRainfall = isSuperEvent
      ? Math.round(baseRain * 1.65)
      : Math.round((baseRain * (0.75 + r1 * 0.55)) * climateShift);

    const max24hRainfall = isSuperEvent
      ? Math.round(baseMax24 * 2.1)
      : Math.round((baseMax24 * (0.65 + r2 * 0.7)) * climateShift);

    const floodEvents = isSuperEvent
      ? baseEvents + 3
      : Math.max(0, Math.round(baseEvents * (0.4 + r1 * 1.2) + (climateShift > 1.1 ? 0.3 : 0)));

    const maxExtentKm2 = isSuperEvent
      ? Number((baseExtent * 2.4).toFixed(1))
      : Number((baseExtent * (0.6 + r2 * 0.8)).toFixed(1));

    const maxDepthM = isSuperEvent
      ? Number((baseDepth * 2.2).toFixed(2))
      : Number((baseDepth * (0.5 + r1 * 0.9)).toFixed(2));

    const avgDurationHours = isSuperEvent
      ? Math.round(baseDuration * 2.5)
      : Math.round(baseDuration * (0.7 + r2 * 0.6));

    const recoveryDays = isSuperEvent
      ? Number((baseRecovery * 2.6).toFixed(1))
      : Number((baseRecovery * (0.65 + r1 * 0.7)).toFixed(1));

    data.push({
      year: y,
      annualRainfall,
      max24hRainfall,
      floodEvents,
      maxExtentKm2,
      maxDepthM,
      avgDurationHours,
      recoveryDays,
      eventName: isSuperEvent ? eventName : (floodEvents > 0 ? (r1 > 0.6 ? 'Depression' : 'Monsoon Surge') : 'Normal Season'),
      isSuperEvent
    });
  }

  return data;
}
