// Detailed Geographic & Hydrological metadata for sample locations
export const LOCATIONS = [
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    lat: 13.0827,
    lon: 80.2707,
    isCoastal: true,
    baseRiskScore: 74,
    riskLevel: 'High',
    confidence: 88,
    geographicHierarchy: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Chennai',
      city: 'Greater Chennai Corporation',
      town: 'Mylapore - Velachery Zone',
      village: 'Kotturpuram / Adyar Floodplain',
      coordinates: '13.0827° N, 80.2707° E'
    },
    hydrologicalHierarchy: {
      basin: 'Bay of Bengal Coastal Basin',
      subBasin: 'Palar-Adyar Sub-basin',
      watershed: 'Chembarambakkam Catchment Watershed (980 km²)',
      riverStream: 'Adyar River & Buckingham Canal',
      localArea: 'Velachery-Madipakkam Lowland Depression'
    },
    terrain: {
      elevation: '6.5 m ASL',
      slope: '0.8% (Extremely Flat)',
      drainageCondition: 'Constrained by coastal tide & urban density',
      soilType: 'Clayey Alluvium with Low Permeability',
      antecedentSoilMoisture: 78
    },
    population: '11.5 Million',
    vulnerableHotspots: [
      { name: 'Velachery Lake Environs', risk: 'Severe', pop: 45000 },
      { name: 'Madipakkam Lowland', risk: 'Severe', pop: 38000 },
      { name: 'Mudichur Outer Floodway', risk: 'Critical', pop: 29000 },
      { name: 'Kotturpuram Riverbank', risk: 'Moderate', pop: 18000 }
    ],
    evacuationCentres: [
      { name: 'Jawaharlal Nehru Indoor Stadium', lat: 13.0833, lon: 80.2755, capacity: 4500, status: 'Open & Ready' },
      { name: 'Velachery Community Hall', lat: 12.9815, lon: 80.2180, capacity: 1200, status: 'Active Relief Hub' },
      { name: 'Anna University Convention Hall', lat: 13.0125, lon: 80.2355, capacity: 2500, status: 'Standby' },
      { name: 'Tambaram Govt High School', lat: 12.9249, lon: 80.1260, capacity: 800, status: 'Open' }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    lat: 19.0760,
    lon: 72.8777,
    isCoastal: true,
    baseRiskScore: 68,
    riskLevel: 'High',
    confidence: 85,
    geographicHierarchy: {
      country: 'India',
      state: 'Maharashtra',
      district: 'Mumbai Suburban',
      city: 'Municipal Corporation of Greater Mumbai (MCGM)',
      town: 'Kurla - Bandra Kurla Complex (BKC)',
      village: 'Kranti Nagar / Mithi Bank',
      coordinates: '19.0760° N, 72.8777° E'
    },
    hydrologicalHierarchy: {
      basin: 'West Coast Coastal Drainage',
      subBasin: 'Ulhas - Salsette Sub-basin',
      watershed: 'Vihar-Powai Catchment (103 km²)',
      riverStream: 'Mithi River (17.8 km) & Mahim Creek',
      localArea: 'Kurla Low-lying Rail & Road Corridors'
    },
    terrain: {
      elevation: '8.0 m ASL',
      slope: '1.2% (Coastal Plain surrounded by basalt hills)',
      drainageCondition: 'Tidal locking during high spring tides (>4.5m)',
      soilType: 'Coastal Estuarine Silt & Reclaimed Marine Clay',
      antecedentSoilMoisture: 82
    },
    population: '21.3 Million',
    vulnerableHotspots: [
      { name: 'Kurla West (Bail Bazaar)', risk: 'Critical', pop: 62000 },
      { name: 'Hindmata Dadar Basin', risk: 'Severe', pop: 48000 },
      { name: 'Milan Subway & Andheri Subway', risk: 'Severe', pop: 22000 },
      { name: 'Sion Circle Lowland', risk: 'Moderate', pop: 35000 }
    ],
    evacuationCentres: [
      { name: 'Kurla Municipal School Centre', lat: 19.0722, lon: 72.8812, capacity: 1800, status: 'Open' },
      { name: 'Bandra Reclamation Relief Camp', lat: 19.0435, lon: 72.8310, capacity: 3200, status: 'Open & Ready' },
      { name: 'Dadar BMC Community Hall', lat: 19.0178, lon: 72.8478, capacity: 1500, status: 'Active' }
    ]
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    lat: 17.3850,
    lon: 78.4867,
    isCoastal: false,
    baseRiskScore: 44,
    riskLevel: 'Moderate',
    confidence: 82,
    geographicHierarchy: {
      country: 'India',
      state: 'Telangana',
      district: 'Hyderabad & Rangareddy',
      city: 'Greater Hyderabad Municipal Corporation (GHMC)',
      town: 'Charminar - Malakpet Zone',
      village: 'Chaderghat / Musi Floodplain',
      coordinates: '17.3850° N, 78.4867° E'
    },
    hydrologicalHierarchy: {
      basin: 'Krishna River Basin',
      subBasin: 'Musi River Sub-basin (11,200 km²)',
      watershed: 'Osmansagar & Himayatsagar Upper Catchment',
      riverStream: 'Musi River & Kukatpally Nala Network',
      localArea: 'Moosarambagh Causeways & Amberpet Bridge'
    },
    terrain: {
      elevation: '542 m ASL',
      slope: '2.5% (Undulating Deccan Plateau with Granitic Outcrops)',
      drainageCondition: 'Severely encroached chain of medieval cascade tanks',
      soilType: 'Red Gravelly Loam (Chalka) & Black Cotton Clay in depressions',
      antecedentSoilMoisture: 61
    },
    population: '10.8 Million',
    vulnerableHotspots: [
      { name: 'Nadeem Colony (Tolichowki)', risk: 'Severe', pop: 28000 },
      { name: 'Hafiz Baba Nagar (Old City)', risk: 'Critical', pop: 36000 },
      { name: 'Alwal Lake Downstream Corridor', risk: 'Moderate', pop: 19000 },
      { name: 'Moosarambagh Causeway', risk: 'Severe', pop: 14000 }
    ],
    evacuationCentres: [
      { name: 'Lal Bahadur Shastri Stadium Hub', lat: 17.3980, lon: 78.4720, capacity: 5000, status: 'Open & Ready' },
      { name: 'Tolichowki Govt Function Hall', lat: 17.3985, lon: 78.4110, capacity: 1600, status: 'Active' },
      { name: 'Malakpet Municipal Indoor Court', lat: 17.3750, lon: 78.5020, capacity: 1400, status: 'Standby' }
    ]
  },
  {
    id: 'guwahati',
    name: 'Guwahati',
    state: 'Assam',
    country: 'India',
    lat: 26.1445,
    lon: 91.7362,
    isCoastal: false,
    baseRiskScore: 86,
    riskLevel: 'Extreme',
    confidence: 91,
    geographicHierarchy: {
      country: 'India',
      state: 'Assam',
      district: 'Kamrup Metropolitan',
      city: 'Guwahati Municipal Corporation',
      town: 'Dispur - Bharalumukh Zone',
      village: 'Anil Nagar / Nabin Nagar Valley',
      coordinates: '26.1445° N, 91.7362° E'
    },
    hydrologicalHierarchy: {
      basin: 'Brahmaputra Continental Basin (580,000 km²)',
      subBasin: 'Middle Brahmaputra Valley Sub-basin',
      watershed: 'Deepor Beel & Bharalu Catchment',
      riverStream: 'Brahmaputra River (Discharge >45,000 m³/s) & Bharalu River',
      localArea: 'Rukminigaon, Anil Nagar Natural Basin'
    },
    terrain: {
      elevation: '55 m ASL (surrounded by steep 250m hills)',
      slope: 'Hills: 35%, Valley Floor: 0.3% (Severe natural bowl)',
      drainageCondition: 'River Brahmaputra water level higher than city drains during peak monsoon',
      soilType: 'Alluvial silt with high liquefaction & hill soil erosion runoff',
      antecedentSoilMoisture: 89
    },
    population: '1.4 Million',
    vulnerableHotspots: [
      { name: 'Anil Nagar & Nabin Nagar', risk: 'Catastrophic', pop: 32000 },
      { name: 'Rukminigaon Downstream', risk: 'Critical', pop: 24000 },
      { name: 'Bharalumukh Sluice Gate Zone', risk: 'Severe', pop: 18000 },
      { name: 'Jorabat Foothill Choke Point', risk: 'Severe', pop: 15000 }
    ],
    evacuationCentres: [
      { name: 'Sarusajai National Stadium Complex', lat: 26.1150, lon: 91.7650, capacity: 6000, status: 'Active Emergency Hub' },
      { name: 'GMC Kalyan Mandap Ulubari', lat: 26.1680, lon: 91.7510, capacity: 1400, status: 'Open' },
      { name: 'Dispur Govt College Centre', lat: 26.1420, lon: 91.7890, capacity: 2000, status: 'Open & Ready' }
    ]
  },
  {
    id: 'kochi',
    name: 'Kochi',
    state: 'Kerala',
    country: 'India',
    lat: 9.9312,
    lon: 76.2673,
    isCoastal: true,
    baseRiskScore: 56,
    riskLevel: 'High',
    confidence: 84,
    geographicHierarchy: {
      country: 'India',
      state: 'Kerala',
      district: 'Ernakulam',
      city: 'Kochi Municipal Corporation',
      town: 'Aluva - Kalamassery Corridor',
      village: 'Eloor / Varapuzha Island Belt',
      coordinates: '9.9312° N, 76.2673° E'
    },
    hydrologicalHierarchy: {
      basin: 'Periyar River Basin (5,398 km²)',
      subBasin: 'Lower Periyar & Vembanad Estuary',
      watershed: 'Idukki - Bhoothathankettu Catchment System',
      riverStream: 'Periyar River (Distributary Network) & Arabian Sea Estuary',
      localArea: 'Aluva Manappuram & Eloor Industrial Island'
    },
    terrain: {
      elevation: '3.2 m ASL',
      slope: '0.5% (Extremely low-lying estuarine delta)',
      drainageCondition: 'Bi-directional tidal currents; high sea-tide slows river drainage',
      soilType: 'Hydromorphic coastal alluvium & peaty kari soil',
      antecedentSoilMoisture: 84
    },
    population: '2.9 Million',
    vulnerableHotspots: [
      { name: 'Aluva Manappuram Temple Grounds', risk: 'Critical', pop: 22000 },
      { name: 'Eloor Industrial Island', risk: 'Severe', pop: 31000 },
      { name: 'Varapuzha Bridge Approaches', risk: 'Moderate', pop: 16000 },
      { name: 'Kalamassery Canal Corridor', risk: 'Moderate', pop: 25000 }
    ],
    evacuationCentres: [
      { name: 'Aluva St. Xavier’s College Camp', lat: 10.1080, lon: 76.3520, capacity: 2200, status: 'Open & Ready' },
      { name: 'Kalamassery Town Hall Hub', lat: 10.0510, lon: 76.3250, capacity: 1600, status: 'Open' },
      { name: 'Ernakulam Town Hall Centre', lat: 9.9880, lon: 76.2840, capacity: 2400, status: 'Standby' }
    ]
  },
  {
    id: 'vijayawada',
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    lat: 16.5062,
    lon: 80.6480,
    isCoastal: false,
    baseRiskScore: 72,
    riskLevel: 'High',
    confidence: 86,
    geographicHierarchy: {
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'NTR District (formerly Krishna)',
      city: 'Vijayawada Municipal Corporation',
      town: 'Bhavanipuram - Ajit Singh Nagar Zone',
      village: 'Payakapuram / Budameru Diversion Channel',
      coordinates: '16.5062° N, 80.6480° E'
    },
    hydrologicalHierarchy: {
      basin: 'Krishna River Basin (258,948 km²)',
      subBasin: 'Lower Krishna Sub-basin below Nagarjuna Sagar',
      watershed: 'Prakasam Barrage & Budameru Rivulet Catchment',
      riverStream: 'Krishna River & Budameru Flash Rivulet',
      localArea: 'Singh Nagar, Payakapuram, Krishna Lanka Embankment'
    },
    terrain: {
      elevation: '19.0 m ASL',
      slope: '1.1% (Flanked by Indrakeeladri and Kondapalli hills)',
      drainageCondition: 'Flash inundation when Budameru overflows into urban drains',
      soilType: 'Heavy black clay and alluvial river deposits',
      antecedentSoilMoisture: 76
    },
    population: '1.8 Million',
    vulnerableHotspots: [
      { name: 'Ajit Singh Nagar Lowlands', risk: 'Severe', pop: 54000 },
      { name: 'Krishna Lanka Riverfront Colony', risk: 'Critical', pop: 41000 },
      { name: 'Payakapuram Budameru Basin', risk: 'Severe', pop: 35000 },
      { name: 'Ranigari Thota Floodplain', risk: 'Moderate', pop: 18000 }
    ],
    evacuationCentres: [
      { name: 'Indira Gandhi Municipal Stadium', lat: 16.5020, lon: 80.6440, capacity: 4800, status: 'Active Rescue Hub' },
      { name: 'Singh Nagar Community Shelter', lat: 16.5350, lon: 80.6380, capacity: 2100, status: 'Open' },
      { name: 'Gowthami Municipal High School', lat: 16.5120, lon: 80.6290, capacity: 1300, status: 'Standby' }
    ]
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    lat: 22.5726,
    lon: 88.3639,
    isCoastal: true,
    baseRiskScore: 48,
    riskLevel: 'Moderate',
    confidence: 83,
    geographicHierarchy: {
      country: 'India',
      state: 'West Bengal',
      district: 'Kolkata',
      city: 'Kolkata Municipal Corporation (KMC)',
      town: 'Behala - Jadavpur Southern Zone',
      village: 'Thakurpukur / Tiljala Drainage Canal',
      coordinates: '22.5726° N, 88.3639° E'
    },
    hydrologicalHierarchy: {
      basin: 'Ganges - Brahmaputra - Meghna Delta',
      subBasin: 'Bhagirathi - Hooghly River Sub-basin',
      watershed: 'East Kolkata Wetlands Drainage Basin (125 km²)',
      riverStream: 'Hooghly River (Tidal) & Circular/Beliaghata Canals',
      localArea: 'Behala Chowrasta, Topsia, Central Avenue'
    },
    terrain: {
      elevation: '6.0 m ASL',
      slope: '0.4% (Tilted eastward toward the Sundarbans wetlands)',
      drainageCondition: 'Lockgates closed when Hooghly high tide exceeds 4.8m; relies on pumping',
      soilType: 'Deltaic silt, clay and peat pockets',
      antecedentSoilMoisture: 71
    },
    population: '15.1 Million',
    vulnerableHotspots: [
      { name: 'Behala Sakherbazar Corridor', risk: 'Moderate', pop: 65000 },
      { name: 'College Street & Thanthania Pumping Zone', risk: 'Severe', pop: 29000 },
      { name: 'Tiljala / Topsia Low-lying Slums', risk: 'Severe', pop: 48000 }
    ],
    evacuationCentres: [
      { name: 'Netaji Indoor Stadium Complex', lat: 22.5695, lon: 88.3420, capacity: 5500, status: 'Open & Ready' },
      { name: 'Behala Sarat Sadan Shelter', lat: 22.4980, lon: 88.3180, capacity: 1800, status: 'Standby' }
    ]
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi (NCT)',
    country: 'India',
    lat: 28.6139,
    lon: 77.2090,
    isCoastal: false,
    baseRiskScore: 22,
    riskLevel: 'Low',
    confidence: 89,
    geographicHierarchy: {
      country: 'India',
      state: 'National Capital Territory of Delhi',
      district: 'Central & East Delhi',
      city: 'Municipal Corporation of Delhi (MCD)',
      town: 'Civil Lines - Kashmiri Gate Zone',
      village: 'Monastery Market / Yamuna Bazar Floodplain',
      coordinates: '28.6139° N, 77.2090° E'
    },
    hydrologicalHierarchy: {
      basin: 'Ganges River Basin',
      subBasin: 'Yamuna River Sub-basin (366,223 km²)',
      watershed: 'Hathnikund to Okhla Barrage Reach (22 km river stretch in NCT)',
      riverStream: 'Yamuna River & Najafgarh Drain',
      localArea: 'Kashmere Gate ISBT, Bela Road, Mayur Vihar Khadar'
    },
    terrain: {
      elevation: '216 m ASL',
      slope: '1.0% (Yamuna active floodplain is 204m ASL)',
      drainageCondition: 'Controlled by Hathnikund Barrage releases (Haryana) and Okhla Barrage',
      soilType: 'Recent Yamuna alluvial sand and sandy loam',
      antecedentSoilMoisture: 42
    },
    population: '33.0 Million',
    vulnerableHotspots: [
      { name: 'Yamuna Bazar & Monastery Market', risk: 'Moderate', pop: 12000 },
      { name: 'Kashmere Gate Low Ring Road', risk: 'Moderate', pop: 8500 },
      { name: 'Mayur Vihar Extension Khadar Farmlands', risk: 'Low', pop: 9500 }
    ],
    evacuationCentres: [
      { name: 'Thyagaraj Stadium Emergency Hub', lat: 28.5770, lon: 77.2180, capacity: 4200, status: 'Standby' },
      { name: 'Kashmere Gate Community Centre', lat: 28.6670, lon: 77.2310, capacity: 1500, status: 'Open' }
    ]
  },
  {
    id: 'morigaon-village',
    name: 'Morigaon Flood-Prone Village (Mayong)',
    state: 'Assam',
    country: 'India',
    lat: 26.2482,
    lon: 92.0465,
    isCoastal: false,
    baseRiskScore: 89,
    riskLevel: 'Extreme',
    confidence: 93,
    geographicHierarchy: {
      country: 'India',
      state: 'Assam',
      district: 'Morigaon',
      city: 'Mayong Revenue Circle',
      town: 'Pabho-Kati Rural Block',
      village: 'Bhuragaon Char Settlement (River Island & Floodplain)',
      coordinates: '26.2482° N, 92.0465° E'
    },
    hydrologicalHierarchy: {
      basin: 'Brahmaputra River Basin',
      subBasin: 'Pobitora Wildlife & Kopili River Confluence',
      watershed: 'Kopili - Kolong Sub-watershed',
      riverStream: 'Brahmaputra Main Channel & Kolong Anabranch',
      localArea: 'Lowland Agricultural Embankment Breach Zone'
    },
    terrain: {
      elevation: '48 m ASL',
      slope: '0.2% (Extremely flat active sandbar & char land)',
      drainageCondition: 'Total inundation when Brahmaputra breaches earthen bunds',
      soilType: 'Active silt & unstable sandy alluvium subject to riverbank erosion',
      antecedentSoilMoisture: 94
    },
    population: '14,800 (Rural community)',
    vulnerableHotspots: [
      { name: 'Bhuragaon Embankment Point km 14', risk: 'Catastrophic', pop: 4800 },
      { name: 'Mayong Riverside Agricultural Hamlets', risk: 'Critical', pop: 6200 },
      { name: 'Pobitora Fringe Pasture Lands', risk: 'Severe', pop: 3800 }
    ],
    evacuationCentres: [
      { name: 'Mayong Higher Secondary Elevated Shelter', lat: 26.2510, lon: 92.0520, capacity: 950, status: 'Active Relief Shelter' },
      { name: 'Bhuragaon High Embankment Camp', lat: 26.2620, lon: 92.0410, capacity: 1200, status: 'Active Emergency Hub' },
      { name: 'Pabho-Kati Primary School Platform', lat: 26.2390, lon: 92.0380, capacity: 600, status: 'Open' }
    ]
  }
];
