// River and Reservoir intelligence data with dynamic hydraulic capacity notes
export const RIVER_RESERVOIR_DATA = {
  chennai: {
    river: {
      name: 'Adyar River (Downstream Reach)',
      location: 'Kotturpuram Gauging Station (Chainage 18.4 km)',
      width: '185 m',
      geometry: 'Trapezoidal channel with urban tidal estuary constriction',
      currentLevel: 7.82,
      bankfullLevel: 8.50,
      bankfullPercentage: 92.0,
      discharge: '28,400 cusecs (804 m³/s)',
      flowVelocity: '2.4 m/s',
      upstreamRainfall: 142.5, // mm in catchment
      downstreamCondition: 'High spring tide (1.4m) hindering gravity discharge at Adyar Estuary',
      historicalMaxLevel: 9.80, // Dec 2015
      historicalFloodLevel: 8.20,
      dangerLevel: 8.00,
      trend: 'rising',
      estimatedTimeToThreshold: '2.5 hours at current inflow rate',
      hydraulicCapacityNote:
        'Estimated hydraulic capacity changes with channel geometry, sedimentation, vegetation, obstructions, downstream conditions and water level.',
      timeSeries: [
        { time: '-48h', level: 3.2, bankfull: 8.5, historicalMax: 9.8 },
        { time: '-42h', level: 3.8, bankfull: 8.5, historicalMax: 9.8 },
        { time: '-36h', level: 4.5, bankfull: 8.5, historicalMax: 9.8 },
        { time: '-30h', level: 5.4, bankfull: 8.5, historicalMax: 9.8 },
        { time: '-24h', level: 6.2, bankfull: 8.5, historicalMax: 9.8 },
        { time: '-18h', level: 6.9, bankfull: 8.5, historicalMax: 9.8 },
        { time: '-12h', level: 7.3, bankfull: 8.5, historicalMax: 9.8 },
        { time: '-6h',  level: 7.6, bankfull: 8.5, historicalMax: 9.8 },
        { time: 'Now',  level: 7.82, bankfull: 8.5, historicalMax: 9.8 },
        { time: '+6h (fc)', level: 8.25, bankfull: 8.5, historicalMax: 9.8 },
        { time: '+12h (fc)', level: 8.42, bankfull: 8.5, historicalMax: 9.8 },
        { time: '+18h (fc)', level: 8.10, bankfull: 8.5, historicalMax: 9.8 },
        { time: '+24h (fc)', level: 7.60, bankfull: 8.5, historicalMax: 9.8 }
      ]
    },
    reservoirs: [
      {
        name: 'Chembarambakkam Tank',
        currentStorage: '3,120 Mcft',
        capacity: '3,645 Mcft',
        storagePercentage: 85.6,
        inflow: '8,200 cusecs (232 m³/s)',
        outflow: '6,500 cusecs (184 m³/s)',
        release: 'Controlled gate discharge into Adyar floodway',
        spillwayCondition: '6 of 19 radial shutter gates opened (2.0 m lifted)',
        catchmentRainfall: '148 mm in 24h',
        downstreamRisk: 'High - Directly feeds Kotturpuram flood zone',
        historicalCondition: 'Catastrophic 29,000 cusecs sudden release on 1 Dec 2015'
      },
      {
        name: 'Red Hills (Puzhal) Reservoir',
        currentStorage: '2,680 Mcft',
        capacity: '3,300 Mcft',
        storagePercentage: 81.2,
        inflow: '4,100 cusecs',
        outflow: '2,800 cusecs',
        release: 'Surplus course to Kosasthalaiyar River',
        spillwayCondition: '4 overflow weirs active',
        catchmentRainfall: '122 mm in 24h',
        downstreamRisk: 'Moderate - North Chennai industrial belt watch',
        historicalCondition: 'Normal monitored monsoon buffer'
      },
      {
        name: 'Poondi Reservoir (Sathyamurthy Sagar)',
        currentStorage: '2,450 Mcft',
        capacity: '3,231 Mcft',
        storagePercentage: 75.8,
        inflow: '5,600 cusecs',
        outflow: '3,000 cusecs',
        release: 'Discharge into Kosasthalaiyar',
        spillwayCondition: 'Regulated spillway discharge',
        catchmentRainfall: '115 mm in 24h',
        downstreamRisk: 'Moderate',
        historicalCondition: 'Buffer reservoir active'
      }
    ]
  },
  mumbai: {
    river: {
      name: 'Mithi River (Kurla S-Bend Reach)',
      location: 'CST Bridge, Kurla West (Chainage 11.2 km)',
      width: '60 m (Constrained from original 120m)',
      geometry: 'Concrete retaining wall with severe industrial bends and culvert bottlenecks',
      currentLevel: 4.15,
      bankfullLevel: 4.50,
      bankfullPercentage: 92.2,
      discharge: '450 m³/s',
      flowVelocity: '3.1 m/s',
      upstreamRainfall: 215.0,
      downstreamCondition: 'Mahim Bay high spring tide (4.65m) causing tidal seawater backflow',
      historicalMaxLevel: 5.60, // 26 July 2005
      historicalFloodLevel: 4.20,
      dangerLevel: 4.00,
      trend: 'rising',
      estimatedTimeToThreshold: '1.2 hours at peak tide confluence',
      hydraulicCapacityNote:
        'Estimated hydraulic capacity changes with channel geometry, sedimentation, vegetation, obstructions, downstream conditions and water level.',
      timeSeries: [
        { time: '-48h', level: 1.8, bankfull: 4.5, historicalMax: 5.6 },
        { time: '-36h', level: 2.2, bankfull: 4.5, historicalMax: 5.6 },
        { time: '-24h', level: 2.9, bankfull: 4.5, historicalMax: 5.6 },
        { time: '-12h', level: 3.6, bankfull: 4.5, historicalMax: 5.6 },
        { time: 'Now',  level: 4.15, bankfull: 4.5, historicalMax: 5.6 },
        { time: '+6h (fc)', level: 4.45, bankfull: 4.5, historicalMax: 5.6 },
        { time: '+12h (fc)', level: 3.90, bankfull: 4.5, historicalMax: 5.6 },
        { time: '+24h (fc)', level: 3.10, bankfull: 4.5, historicalMax: 5.6 }
      ]
    },
    reservoirs: [
      {
        name: 'Vihar Lake',
        currentStorage: '91,200 Million Litres',
        capacity: '91,400 Million Litres',
        storagePercentage: 99.8,
        inflow: '180 m³/s',
        outflow: '175 m³/s',
        release: 'Uncontrolled spillway overflow into Mithi riverbed',
        spillwayCondition: 'Freely overflowing over weir crest by 0.35m',
        catchmentRainfall: '240 mm in 24h',
        downstreamRisk: 'Extreme - Directly surcharges Kurla urban reach',
        historicalCondition: 'Spillover triggers severe suburban railway inundation'
      },
      {
        name: 'Powai Lake',
        currentStorage: '5,400 Million Litres',
        capacity: '5,400 Million Litres',
        storagePercentage: 100.0,
        inflow: '45 m³/s',
        outflow: '45 m³/s',
        release: 'Natural outlet spillway into Mithi headwaters',
        spillwayCondition: 'Over-topping spillway active',
        catchmentRainfall: '210 mm in 24h',
        downstreamRisk: 'High',
        historicalCondition: 'Non-potable lake functioning as buffer'
      }
    ]
  },
  guwahati: {
    river: {
      name: 'Brahmaputra River (Guwahati D.C. Court Gauge)',
      location: 'Saraighat - Uzanbazar Gauge Station',
      width: '1,200 m (Braided channel reach)',
      geometry: 'Deep bedrock gorge at Saraighat with severe sandbars and siltation',
      currentLevel: 50.32,
      bankfullLevel: 49.68,
      bankfullPercentage: 101.3,
      discharge: '52,800 m³/s',
      flowVelocity: '3.8 m/s',
      upstreamRainfall: 165.0,
      downstreamCondition: 'Heavy backwater blocking sluice gates of Bharalu, Mora Bharalu & Basistha',
      historicalMaxLevel: 51.46, // Record deluges
      historicalFloodLevel: 49.68,
      dangerLevel: 49.68,
      trend: 'rising',
      estimatedTimeToThreshold: 'Over danger level by +0.64m; worsening backflow',
      hydraulicCapacityNote:
        'Estimated hydraulic capacity changes with channel geometry, sedimentation, vegetation, obstructions, downstream conditions and water level.',
      timeSeries: [
        { time: '-48h', level: 48.2, bankfull: 49.68, historicalMax: 51.46 },
        { time: '-36h', level: 48.9, bankfull: 49.68, historicalMax: 51.46 },
        { time: '-24h', level: 49.4, bankfull: 49.68, historicalMax: 51.46 },
        { time: '-12h', level: 49.9, bankfull: 49.68, historicalMax: 51.46 },
        { time: 'Now',  level: 50.32, bankfull: 49.68, historicalMax: 51.46 },
        { time: '+6h (fc)', level: 50.60, bankfull: 49.68, historicalMax: 51.46 },
        { time: '+12h (fc)', level: 50.85, bankfull: 49.68, historicalMax: 51.46 },
        { time: '+24h (fc)', level: 50.40, bankfull: 49.68, historicalMax: 51.46 }
      ]
    },
    reservoirs: [
      {
        name: 'Deepor Beel Ramsar Wetland Basin',
        currentStorage: '28.4 MCM',
        capacity: '32.0 MCM',
        storagePercentage: 88.8,
        inflow: '120 m³/s',
        outflow: '35 m³/s (Restricted through Khanajan channel)',
        release: 'Sluice gate regulated into Brahmaputra',
        spillwayCondition: 'Khanajan sluice closed due to Brahmaputra flood lock',
        catchmentRainfall: '175 mm in 24h',
        downstreamRisk: 'Extreme - Surcharged wetland inundating Boragaon and Gorchuk',
        historicalCondition: 'Natural water sponge facing rapid urban siltation'
      }
    ]
  },
  kochi: {
    river: {
      name: 'Periyar River (Aluva Bridge Reach)',
      location: 'Aluva Sivarathri Manappuram (Chainage 12.0 km)',
      width: '240 m',
      geometry: 'Bifurcating deltaic river channel into Mangalapuzha and Marthandavarma arms',
      currentLevel: 5.65,
      bankfullLevel: 6.80,
      bankfullPercentage: 83.1,
      discharge: '2,200 m³/s',
      flowVelocity: '2.1 m/s',
      upstreamRainfall: 185.0,
      downstreamCondition: 'Vembanad estuary facing Arabian Sea tidal counter-pressure',
      historicalMaxLevel: 9.15, // August 2018 deluge
      historicalFloodLevel: 6.50,
      dangerLevel: 6.20,
      trend: 'rising',
      estimatedTimeToThreshold: '4.8 hours before warning stage if Idukki releases increase',
      hydraulicCapacityNote:
        'Estimated hydraulic capacity changes with channel geometry, sedimentation, vegetation, obstructions, downstream conditions and water level.',
      timeSeries: [
        { time: '-48h', level: 3.1, bankfull: 6.8, historicalMax: 9.15 },
        { time: '-24h', level: 4.2, bankfull: 6.8, historicalMax: 9.15 },
        { time: 'Now',  level: 5.65, bankfull: 6.8, historicalMax: 9.15 },
        { time: '+12h (fc)', level: 6.20, bankfull: 6.8, historicalMax: 9.15 },
        { time: '+24h (fc)', level: 5.80, bankfull: 6.8, historicalMax: 9.15 }
      ]
    },
    reservoirs: [
      {
        name: 'Idukki Arch Dam & Cheruthoni Reservoir',
        currentStorage: '1,840 MCM',
        capacity: '1,996 MCM',
        storagePercentage: 92.2,
        inflow: '850 m³/s',
        outflow: '450 m³/s',
        release: '2 shutter gates open at Cheruthoni Dam (1.5 m)',
        spillwayCondition: 'Controlled orange alert regulated discharge',
        catchmentRainfall: '210 mm in 24h',
        downstreamRisk: 'High - Direct cascade to Bhoothathankettu & Aluva',
        historicalCondition: 'All 5 gates opened in Aug 2018 producing unprecedented flood'
      },
      {
        name: 'Idamalayar Dam',
        currentStorage: '890 MCM',
        capacity: '1,017 MCM',
        storagePercentage: 87.5,
        inflow: '380 m³/s',
        outflow: '250 m³/s',
        release: 'Controlled discharge through spillway shutters',
        spillwayCondition: '2 radial gates lifted',
        catchmentRainfall: '190 mm in 24h',
        downstreamRisk: 'Moderate - Confluent with Periyar at Malayattoor',
        historicalCondition: 'High hydro-electric reservoir operations'
      }
    ]
  },
  vijayawada: {
    river: {
      name: 'Krishna River & Budameru Rivulet System',
      location: 'Prakasam Barrage & Velagaleru Regulator',
      width: '1,120 m (Barrage span)',
      geometry: 'Broad alluvial floodplain with upstream flood banks and Budameru diversion',
      currentLevel: 14.20,
      bankfullLevel: 15.50,
      bankfullPercentage: 91.6,
      discharge: '7,80,000 cusecs (22,087 m³/s)',
      flowVelocity: '2.8 m/s',
      upstreamRainfall: 178.0,
      downstreamCondition: 'Full sea outflow into Bay of Bengal through Hamsaladeevi',
      historicalMaxLevel: 17.80, // Oct 2009 record
      historicalFloodLevel: 14.80,
      dangerLevel: 14.50,
      trend: 'rising',
      estimatedTimeToThreshold: '1.8 hours before second warning flag',
      hydraulicCapacityNote:
        'Estimated hydraulic capacity changes with channel geometry, sedimentation, vegetation, obstructions, downstream conditions and water level.',
      timeSeries: [
        { time: '-48h', level: 9.5, bankfull: 15.5, historicalMax: 17.8 },
        { time: '-24h', level: 11.8, bankfull: 15.5, historicalMax: 17.8 },
        { time: 'Now',  level: 14.2, bankfull: 15.5, historicalMax: 17.8 },
        { time: '+12h (fc)', level: 15.1, bankfull: 15.5, historicalMax: 17.8 },
        { time: '+24h (fc)', level: 14.3, bankfull: 15.5, historicalMax: 17.8 }
      ]
    },
    reservoirs: [
      {
        name: 'Prakasam Barrage',
        currentStorage: '3.07 TMC',
        capacity: '3.07 TMC',
        storagePercentage: 100.0,
        inflow: '7,80,000 cusecs',
        outflow: '7,80,000 cusecs',
        release: 'All 70 crest gates lifted fully',
        spillwayCondition: 'Full discharge capacity engaged',
        catchmentRainfall: '185 mm in 24h',
        downstreamRisk: 'High - Low-lying Krishna Lanka under inundation',
        historicalCondition: 'Handled 11.10 lakh cusecs in 2009 deluge'
      },
      {
        name: 'Velagaleru Regulatory Dam (Budameru)',
        currentStorage: '0.85 TMC',
        capacity: '0.90 TMC',
        storagePercentage: 94.4,
        inflow: '35,000 cusecs',
        outflow: '28,000 cusecs',
        release: 'Surplus course into Budameru Diversion Channel (BDC)',
        spillwayCondition: 'Over capacity; 3 breaches recorded on left bund',
        catchmentRainfall: '220 mm in 24h',
        downstreamRisk: 'Critical - Submerging Singh Nagar & Payakapuram',
        historicalCondition: 'Breached in Sept 2024 causing citywide urban deluge'
      }
    ]
  },
  kolkata: {
    river: {
      name: 'Hooghly River (Tidal Estuarine Reach)',
      location: 'Millennium Park Gauging Station (Chainage 120 km from sea)',
      width: '800 m',
      geometry: 'Tidal macro-estuary with semi-diurnal bore tides and lock-gates',
      currentLevel: 4.85,
      bankfullLevel: 5.50,
      bankfullPercentage: 88.2,
      discharge: '3,800 m³/s',
      flowVelocity: '2.5 m/s (Tidal reverse flow)',
      upstreamRainfall: 110.0,
      downstreamCondition: 'Bay of Bengal spring tide (5.2m) closing all municipal outfall sluices',
      historicalMaxLevel: 6.40,
      historicalFloodLevel: 5.20,
      dangerLevel: 5.00,
      trend: 'stable',
      estimatedTimeToThreshold: '6.0 hours (tide dependent cycle)',
      hydraulicCapacityNote:
        'Estimated hydraulic capacity changes with channel geometry, sedimentation, vegetation, obstructions, downstream conditions and water level.',
      timeSeries: [
        { time: '-24h', level: 3.2, bankfull: 5.5, historicalMax: 6.4 },
        { time: 'Now',  level: 4.85, bankfull: 5.5, historicalMax: 6.4 },
        { time: '+12h (fc)', level: 4.30, bankfull: 5.5, historicalMax: 6.4 },
        { time: '+24h (fc)', level: 3.60, bankfull: 5.5, historicalMax: 6.4 }
      ]
    },
    reservoirs: [
      {
        name: 'DVC Maithon & Panchet Reservoir System',
        currentStorage: '1,420 MCM',
        capacity: '1,850 MCM',
        storagePercentage: 76.8,
        inflow: '1,800 m³/s',
        outflow: '1,100 m³/s',
        release: 'Regulated discharge into Damodar river course',
        spillwayCondition: 'Regulated gate operation',
        catchmentRainfall: '95 mm in 24h',
        downstreamRisk: 'Moderate - Howrah & Hooghly lowlands buffer',
        historicalCondition: 'Crucial flood control system for lower Bengal delta'
      }
    ]
  },
  delhi: {
    river: {
      name: 'Yamuna River (Delhi Old Railway Bridge - ORB)',
      location: 'Old Yamuna Bridge (ORB) Iron Bridge Reach',
      width: '320 m',
      geometry: 'Alluvial river channel constrained by stone pitching and metro viaduct piers',
      currentLevel: 204.30,
      bankfullLevel: 205.33,
      bankfullPercentage: 72.5,
      discharge: '48,500 cusecs (1,373 m³/s)',
      flowVelocity: '1.2 m/s',
      upstreamRainfall: 35.0,
      downstreamCondition: 'Free flow through Okhla Barrage gates into Haryana/UP reach',
      historicalMaxLevel: 208.66, // July 2023 all-time record
      historicalFloodLevel: 205.33,
      dangerLevel: 205.33,
      trend: 'falling',
      estimatedTimeToThreshold: 'Currently 1.03m below warning mark (204.50m)',
      hydraulicCapacityNote:
        'Estimated hydraulic capacity changes with channel geometry, sedimentation, vegetation, obstructions, downstream conditions and water level.',
      timeSeries: [
        { time: '-48h', level: 204.9, bankfull: 205.33, historicalMax: 208.66 },
        { time: '-24h', level: 204.6, bankfull: 205.33, historicalMax: 208.66 },
        { time: 'Now',  level: 204.3, bankfull: 205.33, historicalMax: 208.66 },
        { time: '+12h (fc)', level: 204.1, bankfull: 205.33, historicalMax: 208.66 },
        { time: '+24h (fc)', level: 203.8, bankfull: 205.33, historicalMax: 208.66 }
      ]
    },
    reservoirs: [
      {
        name: 'Hathnikund Barrage (Upstream Haryana)',
        currentStorage: 'Run-of-the-river',
        capacity: 'Variable diversion',
        storagePercentage: 35.0,
        inflow: '52,000 cusecs',
        outflow: '48,500 cusecs',
        release: 'Unregulated spill into Yamuna riverbed towards Delhi',
        spillwayCondition: 'Normal regulated monsoon flow',
        catchmentRainfall: '45 mm in 24h (Himachal & Uttarakhand hills)',
        downstreamRisk: 'Low - 36-48 hours travel time to Delhi ORB',
        historicalCondition: 'Released 3.59 lakh cusecs in July 2023 causing Delhi flooding'
      }
    ]
  },
  hyderabad: {
    river: {
      name: 'Musi River (Moosarambagh Reach)',
      location: 'Moosarambagh Causeway Gauging Station',
      width: '90 m',
      geometry: 'Urban drainage channel with concrete checkdams and silted riverbed',
      currentLevel: 4.25,
      bankfullLevel: 5.50,
      bankfullPercentage: 77.3,
      discharge: '12,500 cusecs (354 m³/s)',
      flowVelocity: '1.9 m/s',
      upstreamRainfall: 68.0,
      downstreamCondition: 'Downstream flow to Wadapally confluence with Krishna River normal',
      historicalMaxLevel: 7.20, // Oct 2020
      historicalFloodLevel: 5.00,
      dangerLevel: 4.80,
      trend: 'stable',
      estimatedTimeToThreshold: '6.5 hours if upper twin reservoirs open further gates',
      hydraulicCapacityNote:
        'Estimated hydraulic capacity changes with channel geometry, sedimentation, vegetation, obstructions, downstream conditions and water level.',
      timeSeries: [
        { time: '-24h', level: 3.6, bankfull: 5.5, historicalMax: 7.2 },
        { time: 'Now',  level: 4.25, bankfull: 5.5, historicalMax: 7.2 },
        { time: '+12h (fc)', level: 4.40, bankfull: 5.5, historicalMax: 7.2 },
        { time: '+24h (fc)', level: 4.00, bankfull: 5.5, historicalMax: 7.2 }
      ]
    },
    reservoirs: [
      {
        name: 'Himayat Sagar Reservoir',
        currentStorage: '2.45 TMC',
        capacity: '2.97 TMC',
        storagePercentage: 82.5,
        inflow: '3,200 cusecs',
        outflow: '2,400 cusecs',
        release: '2 crest gates opened by 1 foot',
        spillwayCondition: 'Regulated discharge into Musi tributary (Esi River)',
        catchmentRainfall: '75 mm in 24h',
        downstreamRisk: 'Moderate - Chaderghat causeway alert',
        historicalCondition: 'All 8 gates opened in Oct 2020 deluge'
      },
      {
        name: 'Osman Sagar (Gandipet)',
        currentStorage: '3.10 TMC',
        capacity: '3.90 TMC',
        storagePercentage: 79.5,
        inflow: '2,800 cusecs',
        outflow: '1,800 cusecs',
        release: '2 crest gates lifted',
        spillwayCondition: 'Controlled surplus weir release',
        catchmentRainfall: '70 mm in 24h',
        downstreamRisk: 'Moderate',
        historicalCondition: 'Historic 1920 flood prevention reservoir'
      }
    ]
  },
  'morigaon-village': {
    river: {
      name: 'Brahmaputra Main Channel & Kolong Anabranch',
      location: 'Mayong Pabho-Kati Embankment Reach',
      width: '2,400 m (Braided floodplain expanse)',
      geometry: 'Unstable alluvial braided river with active shifting chars and sandbars',
      currentLevel: 51.15,
      bankfullLevel: 49.80,
      bankfullPercentage: 102.7,
      discharge: '58,400 m³/s',
      flowVelocity: '3.9 m/s',
      upstreamRainfall: 195.0,
      downstreamCondition: 'Severe overtopping of non-paved rural bunds along Bhuragaon sector',
      historicalMaxLevel: 52.40,
      historicalFloodLevel: 49.80,
      dangerLevel: 49.80,
      trend: 'rising',
      estimatedTimeToThreshold: 'Already 1.35m ABOVE danger mark; embankment breach alert active',
      hydraulicCapacityNote:
        'Estimated hydraulic capacity changes with channel geometry, sedimentation, vegetation, obstructions, downstream conditions and water level.',
      timeSeries: [
        { time: '-48h', level: 49.2, bankfull: 49.8, historicalMax: 52.4 },
        { time: '-24h', level: 50.1, bankfull: 49.8, historicalMax: 52.4 },
        { time: 'Now',  level: 51.15, bankfull: 49.8, historicalMax: 52.4 },
        { time: '+12h (fc)', level: 51.60, bankfull: 49.8, historicalMax: 52.4 },
        { time: '+24h (fc)', level: 51.20, bankfull: 49.8, historicalMax: 52.4 }
      ]
    },
    reservoirs: [
      {
        name: 'Kopili Hydel Dam (NEEPCO Khandong)',
        currentStorage: '215 MCM',
        capacity: '230 MCM',
        storagePercentage: 93.5,
        inflow: '1,400 m³/s',
        outflow: '1,250 m³/s',
        release: 'Major spillway discharge into Kopili River valley',
        spillwayCondition: '4 gates open under extreme inflow',
        catchmentRainfall: '240 mm in 24h (Meghalaya hills)',
        downstreamRisk: 'Extreme - Floods Kampur and Morigaon plains',
        historicalCondition: 'Upstream hydel discharge heavily impacts Morigaon district'
      }
    ]
  }
};
