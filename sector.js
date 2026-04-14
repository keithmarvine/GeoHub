'use strict';
/* ═══════════════════════════════════════════════════════════════
   sector.js — GeoHuB Sector Detail Pages
   Reads ?id= from URL and renders the matching sector data.
═══════════════════════════════════════════════════════════════ */

const SECTORS = {
  'land-infrastructure': {
    label: 'Sector 01',
    title: 'Land & Infrastructure',
    tagline: 'Cadastral surveys, boundary demarcation, and topographic mapping for the projects that shape the built environment.',
    heroImg: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=1800&q=80',
    introTitle: 'Mapping the land that infrastructure is built on',
    introBody1: 'Land and infrastructure projects demand the highest precision — a misplaced boundary or inaccurate contour can mean costly delays, legal disputes, and structural risk. GeoHuB provides the spatial foundation that engineers, developers, and governments depend on.',
    introBody2: 'We deliver comprehensive land surveying, cadastral mapping, and topographic analysis entirely remotely. From initial data collection to final CAD-ready deliverables, every output is engineered to international standards and tailored to your jurisdiction.',
    introImg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80',
    highlights: [
      'Sub-centimetre topographic surveys delivered as DWG/DXF',
      'Cadastral boundary demarcation and coordinate tables',
      'Road, dam, and corridor mapping for engineering design',
      'Drone photogrammetry and point cloud processing',
      'Title block compliant drawings for planning submissions',
      'Cross-jurisdiction delivery — UK, US, East Africa, Gulf',
    ],
    services: [
      {
        icon: 'bi-map',
        title: 'Topographic Survey',
        desc: 'Full feature and level surveys capturing contours, spot elevations, drainage, vegetation, and built features to planning and engineering standards.',
        tags: ['DWG / DXF', 'AutoCAD', 'LiDAR', 'UAV'],
      },
      {
        icon: 'bi-geo',
        title: 'Cadastral & Boundary',
        desc: 'Legally precise parcel boundary surveys with coordinate tables, setback lines, and title block documentation ready for land registry submission.',
        tags: ['GNSS RTK', 'Total Station', 'Land Registry'],
      },
      {
        icon: 'bi-buildings',
        title: 'Infrastructure Corridor Mapping',
        desc: 'Strip surveys along road, pipeline, and utility corridors — including cross-sections, longitudinal profiles, and earthwork volume calculations.',
        tags: ['Road Design', 'Pipeline', 'Volume Calc'],
      },
    ],
  },

  'environment-agriculture': {
    label: 'Sector 02',
    title: 'Environment & Agriculture',
    tagline: 'Satellite-driven insights into land cover, vegetation health, and agricultural productivity — delivered to any desk in the world.',
    heroImg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80',
    introTitle: 'Remote sensing intelligence for land and life',
    introBody1: 'Agriculture and environmental management are increasingly data-driven disciplines. Governments, NGOs, and agribusinesses need reliable spatial intelligence on crop conditions, land degradation, and ecosystem change — and they need it without the cost and delay of field surveys.',
    introBody2: 'We deploy Google Earth Engine, Sentinel, and Landsat data to deliver vegetation indices, land cover maps, change detection analyses, and soil moisture models — all processed remotely and delivered as print-quality maps, GIS-ready rasters, and analytical reports.',
    introImg: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=900&q=80',
    highlights: [
      'NDVI, EVI, and SAVI vegetation index time-series',
      'Multi-date land cover and land use change detection',
      'Crop yield estimation and food security analysis',
      'Soil moisture and drought monitoring via SAR',
      'Deforestation and forest cover change mapping',
      'Google Earth Engine cloud processing — global scale',
    ],
    services: [
      {
        icon: 'bi-tree',
        title: 'Vegetation Monitoring',
        desc: 'Regular or one-off NDVI and vegetation health assessments using multi-spectral satellite imagery across any area of interest globally.',
        tags: ['Sentinel-2', 'Landsat', 'GEE', 'NDVI'],
      },
      {
        icon: 'bi-grid',
        title: 'Land Cover Mapping',
        desc: 'Supervised and unsupervised classification of satellite imagery to map land cover types, detect change, and quantify transitions over time.',
        tags: ['Random Forest', 'SVM', 'Change Detection'],
      },
      {
        icon: 'bi-droplet',
        title: 'Agri & Soil Analysis',
        desc: 'Crop type mapping, yield potential modelling, soil moisture tracking using SAR data, and precision agriculture spatial layers for farm management.',
        tags: ['Sentinel-1 SAR', 'Crop Mapping', 'Soil Moisture'],
      },
    ],
  },

  'urban-planning': {
    label: 'Sector 03',
    title: 'Urban Planning & GIS',
    tagline: 'City growth modelling, utility mapping, and interactive geospatial platforms for the agencies and developers shaping tomorrow\'s cities.',
    heroImg: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1800&q=80',
    introTitle: 'Spatial intelligence for cities in motion',
    introBody1: 'Urbanisation is accelerating across Africa, Asia, and the Middle East. Planners, municipalities, and developers need accurate, up-to-date spatial data to make decisions about zoning, infrastructure expansion, population growth, and service delivery.',
    introBody2: 'We build the GIS datasets, analytical models, and web platforms that enable evidence-based urban planning. From city-wide growth analyses to interactive public portals that citizens can access from their phones, our tools make spatial data usable.',
    introImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    highlights: [
      'Urban growth and sprawl mapping using time-series imagery',
      'Zoning, land use, and density analysis',
      'Utility and infrastructure network GIS datasets',
      'Interactive web GIS portals (Leaflet, Mapbox)',
      'Population distribution and service accessibility models',
      'Master plan spatial data integration and audit',
    ],
    services: [
      {
        icon: 'bi-bar-chart-line',
        title: 'Urban Growth Analysis',
        desc: 'Quantifying and visualising city expansion using multi-decade satellite imagery — identifying growth corridors, densification zones, and periurban sprawl.',
        tags: ['Change Detection', 'Landsat', 'Urban Atlas'],
      },
      {
        icon: 'bi-globe2',
        title: 'Web GIS Development',
        desc: 'Custom interactive mapping platforms built with Leaflet, Mapbox, and GeoServer — real-time dashboards, public portals, and internal operations tools.',
        tags: ['Leaflet', 'Mapbox', 'PostGIS', 'GeoServer'],
      },
      {
        icon: 'bi-diagram-3',
        title: 'Infrastructure & Network GIS',
        desc: 'Building and maintaining spatial databases of road networks, utility grids, water systems, and public facilities for planning and asset management.',
        tags: ['Network Analysis', 'OpenStreetMap', 'PostGIS'],
      },
    ],
  },

  'disaster-risk': {
    label: 'Sector 04',
    title: 'Disaster Risk & Climate',
    tagline: 'Flood risk prediction, hazard mapping, and climate vulnerability assessment — spatial intelligence for resilience planning.',
    heroImg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1800&q=80',
    introTitle: 'Geospatial tools for a more resilient world',
    introBody1: 'Climate change is making disasters more frequent and more severe. Governments, humanitarian organisations, and infrastructure operators need accurate spatial models of where risk is highest — and how it is changing over time — to protect lives and assets.',
    introBody2: 'We combine satellite-derived terrain data, rainfall records, land cover analysis, and machine-learning models to produce flood risk maps, drought vulnerability indices, and climate exposure assessments. All delivered remotely, at any scale, to any client worldwide.',
    introImg: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=900&q=80',
    highlights: [
      'Flood extent mapping from Sentinel-1 SAR imagery',
      'Hydraulic modelling and inundation zone delineation',
      'Multi-hazard risk index mapping for urban areas',
      'Drought monitoring via vegetation and soil moisture indices',
      'Climate vulnerability and exposure assessment reports',
      'Emergency spatial data systems and evacuation route analysis',
    ],
    services: [
      {
        icon: 'bi-water',
        title: 'Flood Risk Mapping',
        desc: 'Combining DEM analysis, SAR flood extent detection, and ML-based prediction to map flood-prone zones and generate risk-tiered spatial layers.',
        tags: ['Sentinel-1', 'DEM', 'HEC-RAS', 'ML Models'],
      },
      {
        icon: 'bi-sun',
        title: 'Drought & Climate Monitoring',
        desc: 'Multi-temporal NDVI, SPI, and soil moisture analysis to track drought conditions, forecast agricultural stress, and support early warning systems.',
        tags: ['MODIS', 'SPI', 'VCI', 'Early Warning'],
      },
      {
        icon: 'bi-shield-check',
        title: 'Multi-Hazard Risk Assessment',
        desc: 'Spatial risk index modelling combining flood, drought, landslide, and seismic exposure layers for integrated disaster risk reduction planning.',
        tags: ['Risk Index', 'GIS Modelling', 'Vulnerability'],
      },
    ],
  },
};

const ALL_SECTOR_CARDS = [
  { id: 'land-infrastructure',    title: 'Land & Infrastructure',    tagline: 'Cadastral surveys, topographic mapping, and boundary demarcation.', img: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=600&q=80' },
  { id: 'environment-agriculture', title: 'Environment & Agriculture', tagline: 'Vegetation monitoring, land cover change, and crop analysis.',        img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' },
  { id: 'urban-planning',          title: 'Urban Planning & GIS',     tagline: 'Growth modelling, utility mapping, and web GIS platforms.',           img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80' },
  { id: 'disaster-risk',           title: 'Disaster Risk & Climate',  tagline: 'Flood risk, hazard mapping, and climate vulnerability.',              img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80' },
];

/* ─── INIT ─────────────────────────────────────────────────── */
const id = new URLSearchParams(window.location.search).get('id') || 'land-infrastructure';
const data = SECTORS[id];

if (!data) {
  window.location.href = 'index.html';
}

/* ─── PAGE TITLE + META ────────────────────────────────────── */
document.getElementById('page-title').textContent = data.title + ' — GeoHuB | The Spatial Network';
document.getElementById('page-desc').content = data.tagline;

/* ─── HERO ─────────────────────────────────────────────────── */
const heroBg = document.getElementById('sp-hero-bg');
heroBg.style.backgroundImage = `url('${data.heroImg}')`;
document.getElementById('sp-hero-label').textContent = data.label;
document.getElementById('sp-hero-title').textContent = data.title;
document.getElementById('sp-hero-tagline').textContent = data.tagline;
// Trigger hero Ken Burns after paint
requestAnimationFrame(() => requestAnimationFrame(() => {
  document.getElementById('sp-hero').classList.add('loaded');
}));

/* ─── INTRO ────────────────────────────────────────────────── */
document.getElementById('sp-intro-title').textContent = data.introTitle;
document.getElementById('sp-intro-body1').textContent = data.introBody1;
document.getElementById('sp-intro-body2').textContent = data.introBody2;
const introImg = document.getElementById('sp-intro-img');
introImg.src = data.introImg;
introImg.alt = data.title;

const hlList = document.getElementById('sp-highlights');
data.highlights.forEach(h => {
  const li = document.createElement('li');
  li.textContent = h;
  hlList.appendChild(li);
});

/* ─── SERVICES ─────────────────────────────────────────────── */
const servGrid = document.getElementById('sp-services-grid');
data.services.forEach((s, i) => {
  servGrid.innerHTML += `
    <div class="sp-service-card sp-reveal sp-reveal-d${i}">
      <div class="sp-service-icon"><i class="bi ${s.icon}"></i></div>
      <h4>${s.title}</h4>
      <p>${s.desc}</p>
      <div class="sp-service-tags">${s.tags.map(t => `<span>${t}</span>`).join('')}</div>
    </div>`;
});

/* ─── RELATED SECTORS ──────────────────────────────────────── */
const relGrid = document.getElementById('sp-related-grid');
ALL_SECTOR_CARDS
  .filter(s => s.id !== id)
  .slice(0, 3)
  .forEach((s, i) => {
    relGrid.innerHTML += `
      <a href="sector.html?id=${s.id}" class="sp-related-card sp-reveal sp-reveal-d${i}">
        <div class="sp-related-card-bg" style="background-image:url('${s.img}')"></div>
        <div class="sp-related-card-overlay"></div>
        <div class="sp-related-card-body">
          <div>
            <h4>${s.title}</h4>
            <p>${s.tagline}</p>
          </div>
          <span class="sp-related-arrow"><i class="bi bi-arrow-up-right"></i></span>
        </div>
      </a>`;
  });

/* ─── SCROLL REVEAL ────────────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.sp-reveal').forEach(el => io.observe(el));

/* ─── HEADER SCROLL ────────────────────────────────────────── */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

/* ─── MOBILE MENU ──────────────────────────────────────────── */
const burger  = document.getElementById('hamburger');
const overlay = document.getElementById('mobile-overlay');
if (burger && overlay) {
  const open  = () => { burger.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { burger.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };
  burger.addEventListener('click', () => overlay.classList.contains('open') ? close() : open());
  overlay.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', close));
}
