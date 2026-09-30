// Land Use & Environmental Monitoring with 2020 vs 2025 change detection
export const LAND_USE_DATA = {
  chennai: {
    comparison: [
      { category: 'Vegetation & Green Cover', year2020: 34.2, year2025: 26.8, change: -7.4, trend: 'down', unit: '%' },
      { category: 'Built-up Impervious Area', year2020: 38.5, year2025: 47.9, change: +9.4, trend: 'up', unit: '%' },
      { category: 'Open Soil & Agricultural Fields', year2020: 14.8, year2025: 10.1, change: -4.7, trend: 'down', unit: '%' },
      { category: 'Roads, Highways & Paved Infrastructure', year2020: 7.2, year2025: 9.8, change: +2.6, trend: 'up', unit: '%' },
      { category: 'Wetlands, Marshes (Pallikaranai) & Mangroves', year2020: 3.5, year2025: 2.9, change: -0.6, trend: 'down', unit: '%' },
      { category: 'Open Water Bodies & Lakes (Eris)', year2020: 1.8, year2025: 2.5, change: +0.7, trend: 'up', unit: '%' } // restoration efforts
    ],
    imperviousRunoffCoefficient: {
      in2020: 0.58,
      in2025: 0.69,
      impact: '+18.9% increase in peak flash runoff volume for equivalent 50mm/hr rainfall'
    },
    pipeline: [
      { step: 1, name: 'Satellite Observation', source: 'Sentinel-2 MSI & Landsat 9 OLI multispectral imagery (10m res)', status: 'Completed (Cloud-masked)' },
      { step: 2, name: 'Land-Cover Classification', method: 'Random Forest & U-Net deep learning semantic segmentation', status: 'Completed (Kappa = 0.89)' },
      { step: 3, name: 'Temporal Comparison', baseline: '2020 Post-monsoon mosaic vs 2025 Current Quarter mosaic', status: 'Completed' },
      { step: 4, name: 'Change Detection', metric: 'Impervious surface transition index & wetland loss mapping', status: 'Active' },
      { step: 5, name: 'Hydrological Model Update', integration: 'Calibrated SCS-CN Curve Numbers updated in kinematic wave runoff routing', status: 'Operational' }
    ],
    scientificExplanation: 'Increasing impervious surface reduces natural infiltration capacity from 45 mm/hr to <5 mm/hr, accelerating peak flood concentration time from 4.2 hours down to 1.8 hours.'
  },
  mumbai: {
    comparison: [
      { category: 'Vegetation & Mangrove Canopy', year2020: 29.4, year2025: 25.1, change: -4.3, trend: 'down', unit: '%' },
      { category: 'Built-up High-Density Area', year2020: 52.0, year2025: 58.6, change: +6.6, trend: 'up', unit: '%' },
      { category: 'Open Soil & Barren Hills', year2020: 9.2, year2025: 6.8, change: -2.4, trend: 'down', unit: '%' },
      { category: 'Roads, Flyovers & Metro Viaducts', year2020: 6.1, year2025: 7.4, change: +1.3, trend: 'up', unit: '%' },
      { category: 'Wetlands & Mahim Mudflats', year2020: 2.1, year2025: 1.2, change: -0.9, trend: 'down', unit: '%' },
      { category: 'Lakes & Reservoirs (Vihar/Powai)', year2020: 1.2, year2025: 0.9, change: -0.3, trend: 'down', unit: '%' }
    ],
    imperviousRunoffCoefficient: {
      in2020: 0.72,
      in2025: 0.81,
      impact: '+12.5% increase in immediate runoff velocity into Mithi storm channels'
    },
    pipeline: [
      { step: 1, name: 'Satellite Observation', source: 'Cartosat-3 & Sentinel-2 surface reflectance (5m)', status: 'Completed' },
      { step: 2, name: 'Land-Cover Classification', method: 'Hybrid CNN segmentation', status: 'Completed' },
      { step: 3, name: 'Temporal Comparison', baseline: '2020 vs 2025 urban expansion analysis', status: 'Completed' },
      { step: 4, name: 'Change Detection', metric: 'Loss of mudflat buffer & slope construction', status: 'Active' },
      { step: 5, name: 'Hydrological Model Update', integration: 'SWMM hydrodynamic model grid runoff coefficient tuned', status: 'Operational' }
    ],
    scientificExplanation: 'Extensive reclamation and impervious pavements in the Mithi catchment prevent rainwater from soaking into the ground, forcing nearly 85% of rainfall directly into constricted culverts.'
  },
  guwahati: {
    comparison: [
      { category: 'Hill Vegetation & Forest Buffer', year2020: 44.0, year2025: 35.8, change: -8.2, trend: 'down', unit: '%' },
      { category: 'Built-up Valley & Foothills', year2020: 27.5, year2025: 38.2, change: +10.7, trend: 'up', unit: '%' },
      { category: 'Open Soil / Earth-cut Slopes', year2020: 16.0, year2025: 15.2, change: -0.8, trend: 'down', unit: '%' },
      { category: 'Roads & Infrastructure', year2020: 4.8, year2025: 5.6, change: +0.8, trend: 'up', unit: '%' },
      { category: 'Beels (Wetlands) & Natural Sinks', year2020: 6.2, year2025: 4.1, change: -2.1, trend: 'down', unit: '%' },
      { category: 'Brahmaputra Sandbars & Channels', year2020: 1.5, year2025: 1.1, change: -0.4, trend: 'down', unit: '%' }
    ],
    imperviousRunoffCoefficient: {
      in2020: 0.48,
      in2025: 0.64,
      impact: '+33.3% surge in downhill silt-laden torrent volume into Bharalu basin'
    },
    pipeline: [
      { step: 1, name: 'Satellite Observation', source: 'Sentinel-2 & ALOS PALSAR radar', status: 'Completed' },
      { step: 2, name: 'Land-Cover Classification', method: 'Deep learning slope-forest index', status: 'Completed' },
      { step: 3, name: 'Temporal Comparison', baseline: '2020 pre-expansion vs 2025 high-density settlements', status: 'Completed' },
      { step: 4, name: 'Change Detection', metric: 'Hill cutting & Deepor Beel wetland encroachment index', status: 'Active' },
      { step: 5, name: 'Hydrological Model Update', integration: 'Sediment transport & 2D surface routing updated', status: 'Operational' }
    ],
    scientificExplanation: 'Unchecked cutting of surrounding hills has stripped natural forest retention, causing red soil landslides and massive silt deposition that clogs urban drains during rain events.'
  },
  default: {
    comparison: [
      { category: 'Vegetation & Tree Cover', year2020: 41.5, year2025: 34.0, change: -7.5, trend: 'down', unit: '%' },
      { category: 'Built-up Urban Area', year2020: 28.2, year2025: 38.6, change: +10.4, trend: 'up', unit: '%' },
      { category: 'Open Soil & Farmlands', year2020: 19.8, year2025: 15.3, change: -4.5, trend: 'down', unit: '%' },
      { category: 'Roads & Paved Surfaces', year2020: 5.5, year2025: 7.2, change: +1.7, trend: 'up', unit: '%' },
      { category: 'Wetlands & Flood Retention Sinks', year2020: 3.2, year2025: 2.7, change: -0.5, trend: 'down', unit: '%' },
      { category: 'Open Water Bodies', year2020: 1.8, year2025: 2.2, change: +0.4, trend: 'up', unit: '%' }
    ],
    imperviousRunoffCoefficient: {
      in2020: 0.52,
      in2025: 0.65,
      impact: '+25.0% higher surface runoff coefficient compared to 2020 baseline'
    },
    pipeline: [
      { step: 1, name: 'Satellite Observation', source: 'Multispectral satellite imagery at 10m resolution', status: 'Completed' },
      { step: 2, name: 'Land-Cover Classification', method: 'Supervised classification into 6 primary land use categories', status: 'Completed' },
      { step: 3, name: 'Temporal Comparison', baseline: 'Comparison between 2020 and 2025 regional land maps', status: 'Completed' },
      { step: 4, name: 'Change Detection', metric: 'Spatial transition matrix of vegetated to impervious ground', status: 'Active' },
      { step: 5, name: 'Hydrological Model Update', integration: 'Dynamic curve number (CN) updates in flash-flood simulation', status: 'Operational' }
    ],
    scientificExplanation: 'Increasing impervious surface increases runoff and reduces infiltration, aggravating flash flood volumes and elevating waterlogging severity.'
  }
};
