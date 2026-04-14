'use strict';
/* ═══════════════════════════════════════════════════════════════
   GeoHuB | The Spatial Network — main.js
   Zero dependencies. Vanilla JS only.
═══════════════════════════════════════════════════════════════ */

/* ─── PRELOADER ────────────────────────────────────────────── */
(function () {
  const el   = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const pct  = document.getElementById('preloaderPct');
  if (!el) { startPage(); return; }

  let val = 0;
  const t = setInterval(() => {
    val = Math.min(100, val + Math.random() * 18 + 6);
    const v = Math.round(val);
    if (fill) fill.style.width = v + '%';
    if (pct)  pct.textContent = v + '%';
    if (val >= 100) {
      clearInterval(t);
      setTimeout(() => {
        el.classList.add('exiting');
        setTimeout(() => { el.classList.add('done'); startPage(); }, 850);
      }, 250);
    }
  }, 80);
})();

/* ─── PAGE START ───────────────────────────────────────────── */
function startPage() {
  document.body.classList.add('page-loaded');
  initCursor();
  initHeader();
  initMobileMenu();
  initAnchorScroll();
  initScrollAnims();
  initCounters();
  initSurveyThumbs();
  initLightbox();
  initOpsPanel();
  initGlobe();
  initGeoCanvas();
  initContactForm();
  initNavActive();
  initTicker();
}

/* ─── CURSOR ───────────────────────────────────────────────── */
function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorFollower');
  if (!dot || !ring || !matchMedia('(hover: hover)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = ''; ring.style.opacity = ''; });

  document.querySelectorAll('a, button, .survey-thumb, .proj-row, .exp-card').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });

  (function raf() {
    dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(raf);
  })();
}

/* ─── HEADER SCROLL CLASS ──────────────────────────────────── */
function initHeader() {
  const h = document.getElementById('site-header');
  if (!h) return;
  const onScroll = () => h.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─── MOBILE MENU ──────────────────────────────────────────── */
function initMobileMenu() {
  const burger  = document.getElementById('hamburger');
  const overlay = document.getElementById('mobile-overlay');
  if (!burger || !overlay) return;
  const open  = () => { burger.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { burger.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };
  burger.addEventListener('click', () => overlay.classList.contains('open') ? close() : open());
  overlay.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', close));
}

/* ─── ANCHOR SCROLL ────────────────────────────────────────── */
function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
      }
    });
  });
}

/* ─── SCROLL ANIMATIONS (IntersectionObserver) ─────────────── */
function initScrollAnims() {
  // Set stagger delays before observing
  const staggerGroups = ['.exp-card', '.sector-card', '.pillar', '.ops-country', '.survey-thumb', '.proj-row', '.client-box'];
  staggerGroups.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = (i * 0.07) + 's';
    });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll(
    '.reveal, .fade-up, .split-text, .section-label, .pillar, .exp-card, ' +
    '.sector-card, .client-box, .ops-country, .survey-thumb, .proj-row, ' +
    '.survey-featured, .contact-right, .ops-right'
  ).forEach(el => io.observe(el));
}

/* ─── COUNTER ANIMATION ────────────────────────────────────── */
function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const target = +e.target.dataset.count;
      const start  = performance.now();
      const dur    = 1600;
      (function step(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        e.target.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(step);
        else e.target.textContent = target;
      })(start);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
}

/* ─── SURVEY THUMB SWITCHER ────────────────────────────────── */
function initSurveyThumbs() {
  const thumbs    = document.querySelectorAll('.survey-thumb');
  const featImg   = document.getElementById('featuredImgEl');
  const featTag   = document.getElementById('featuredTag');
  const featTitle = document.getElementById('featuredTitle');
  const featDesc  = document.getElementById('featuredDesc');
  const featSpecs = document.getElementById('featuredSpecs');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const featuredImg = document.querySelector('.survey-featured-img');
      const featuredMeta = document.querySelector('.survey-featured-meta');
      [featuredImg, featuredMeta].forEach(el => { if (el) el.style.opacity = '0'; });

      setTimeout(() => {
        if (featImg)   featImg.src = thumb.dataset.img;
        if (featTag)   featTag.innerHTML = thumb.dataset.tag;
        if (featTitle) featTitle.innerHTML = thumb.dataset.title;
        if (featDesc)  featDesc.innerHTML = thumb.dataset.desc;
        if (featSpecs) {
          const specs = JSON.parse(thumb.dataset.specs || '[]');
          featSpecs.innerHTML = specs.map(([icon, label]) =>
            `<div class="spec-item"><i class="bi ${icon}"></i><span>${label}</span></div>`
          ).join('');
        }
        [featuredImg, featuredMeta].forEach(el => { if (el) el.style.opacity = ''; });
      }, 200);
    });
  });
}

/* ─── LIGHTBOX ─────────────────────────────────────────────── */
function initLightbox() {
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCls = document.getElementById('lightboxClose');
  const zoom  = document.getElementById('surveyZoomBtn');
  if (!lb) return;

  const open  = src => { lbImg.src = src; lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = ()  => { lb.classList.remove('open'); setTimeout(() => { lbImg.src = ''; document.body.style.overflow = ''; }, 300); };

  if (zoom)  zoom.addEventListener('click', () => { const img = document.getElementById('featuredImgEl'); if (img) open(img.src); });
  if (lbCls) lbCls.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ─── OPS PANEL ────────────────────────────────────────────── */
function initOpsPanel() {
  const stream = document.getElementById('opsStream');
  const coord  = document.getElementById('opsCoord');

  const items = [
    { color: 'stream-green', text: 'Topographic survey',   loc: 'UK Client' },
    { color: 'stream-blue',  text: 'NDVI time-series',     loc: 'East Africa' },
    { color: 'stream-gold',  text: 'Web GIS portal',       loc: 'Middle East' },
    { color: 'stream-green', text: 'Cadastral mapping',    loc: 'West Africa' },
    { color: 'stream-blue',  text: 'Flood risk model',     loc: 'South Asia' },
    { color: 'stream-gold',  text: 'Urban growth atlas',   loc: 'Europe' },
    { color: 'stream-green', text: 'Boundary survey',      loc: 'East Africa' },
    { color: 'stream-blue',  text: 'Satellite analysis',   loc: 'Americas' },
    { color: 'stream-gold',  text: 'Infrastructure GIS',   loc: 'Gulf Region' },
  ];
  let idx = 0;

  if (stream) {
    setInterval(() => {
      const item = items[idx++ % items.length];
      const mins = Math.floor(Math.random() * 10) + 1;
      const row = document.createElement('div');
      row.className = 'ops-stream-row';
      row.innerHTML = `<span class="stream-dot ${item.color}"></span><span class="stream-text">${item.text} · <em>${item.loc}</em></span><span class="stream-time">${mins}m ago</span>`;
      stream.prepend(row);
      while (stream.children.length > 5) stream.removeChild(stream.lastChild);
    }, 3500);
  }

  if (coord) {
    const base = { lat: -1.2921, lng: 36.8219 };
    setInterval(() => {
      const lat = (base.lat + (Math.random() - .5) * .0004).toFixed(4);
      const lng = (base.lng + (Math.random() - .5) * .0004).toFixed(4);
      coord.textContent = `${Math.abs(lat)}° S, ${Math.abs(lng)}° E`;
    }, 2600);
  }
}

/* ─── CANVAS GLOBE ─────────────────────────────────────────── */
function initGlobe() {
  const core   = document.getElementById('globe-core');
  const canvas = document.getElementById('globe-canvas');
  if (!core || !canvas) return;
  if (typeof d3 === 'undefined' || typeof topojson === 'undefined') {
    setTimeout(initGlobe, 200); return;
  }

  const size = core.offsetWidth || 340;
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');

  const projection = d3.geoOrthographic()
    .scale(size / 2 - 3)
    .translate([size / 2, size / 2])
    .clipAngle(90);

  const path = d3.geoPath(projection, ctx);
  const graticule = d3.geoGraticule()();

  // City markers [lng, lat] for D3 geoOrthographic
  const cities = [
    { name: 'Nairobi',    coords: [36.82, -1.29]  },
    { name: 'London',     coords: [-0.12, 51.51]  },
    { name: 'Dubai',      coords: [55.27, 25.20]  },
    { name: 'New York',   coords: [-74.00, 40.71] },
    { name: 'Singapore',  coords: [103.82, 1.35]  },
    { name: 'Lagos',      coords: [3.38, 6.45]    },
  ];

  let rotation = [0, -20, 0];
  let paused = false;
  let dragging = false, dragStart = null, rotStart = null;

  document.addEventListener('visibilitychange', () => { paused = document.hidden; });

  canvas.addEventListener('mousedown', e => {
    dragging = true;
    dragStart = [e.clientX, e.clientY];
    rotStart = [...rotation];
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - dragStart[0];
    const dy = e.clientY - dragStart[1];
    rotation = [rotStart[0] + dx * 0.4, Math.max(-60, Math.min(60, rotStart[1] - dy * 0.4)), 0];
    projection.rotate(rotation);
  });
  window.addEventListener('mouseup', () => { dragging = false; });

  // Touch support
  canvas.addEventListener('touchstart', e => {
    dragging = true;
    dragStart = [e.touches[0].clientX, e.touches[0].clientY];
    rotStart = [...rotation];
  }, { passive: true });
  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - dragStart[0];
    const dy = e.touches[0].clientY - dragStart[1];
    rotation = [rotStart[0] + dx * 0.4, Math.max(-60, Math.min(60, rotStart[1] - dy * 0.4)), 0];
    projection.rotate(rotation);
  }, { passive: true });
  window.addEventListener('touchend', () => { dragging = false; });

  function draw(world) {
    ctx.clearRect(0, 0, size, size);

    // Sphere gradient background
    const grd = ctx.createRadialGradient(
      size * 0.35, size * 0.32, size * 0.02,
      size / 2, size / 2, size / 2 - 3
    );
    grd.addColorStop(0, '#1e3a6e');
    grd.addColorStop(1, '#060f20');
    ctx.beginPath();
    path({ type: 'Sphere' });
    ctx.fillStyle = grd;
    ctx.fill();

    // Ocean subtle tint
    ctx.beginPath();
    path({ type: 'Sphere' });
    ctx.fillStyle = 'rgba(26,60,120,0.15)';
    ctx.fill();

    // Graticule
    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = 'rgba(100,160,255,0.18)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Countries fill
    ctx.beginPath();
    path(topojson.feature(world, world.objects.countries));
    ctx.fillStyle = 'rgba(30,80,160,0.45)';
    ctx.fill();

    // Country borders
    ctx.beginPath();
    path(topojson.mesh(world, world.objects.countries, (a, b) => a !== b));
    ctx.strokeStyle = 'rgba(120,180,255,0.55)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // City dots
    cities.forEach(({ coords }) => {
      const projected = projection(coords);
      if (!projected) return;
      // Check if on visible side
      const r = d3.geoDistance(coords, [-rotation[0], -rotation[1]]);
      if (r > Math.PI / 2) return;
      const [x, y] = projected;
      // Outer glow
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(184,148,90,0.2)';
      ctx.fill();
      // Inner dot
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // Globe rim
    ctx.beginPath();
    path({ type: 'Sphere' });
    ctx.strokeStyle = 'rgba(100,160,255,0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(r => r.json())
    .then(world => {
      let last = 0;
      function frame(ts) {
        if (!paused && ts - last > 33) {
          if (!dragging) {
            rotation[0] += 0.15;
            projection.rotate(rotation);
          }
          draw(world);
          last = ts;
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    })
    .catch(() => {
      // Fallback: draw sphere only if fetch fails
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/2-3, 0, Math.PI*2);
      ctx.fillStyle = '#0b1525';
      ctx.fill();
    });
}

/* ─── GEO CANVAS BACKGROUND ────────────────────────────────── */
function initGeoCanvas() {
  const canvas = document.getElementById('geoCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots = [], paused = false;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    dots = [];
    const n = Math.min(32, Math.floor((W * H) / 24000));
    for (let i = 0; i < n; i++) {
      dots.push({ x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-.5)*.2, vy: (Math.random()-.5)*.2,
        r: Math.random()*1.2+.4 });
    }
  }

  const STEP = 72, MAX_SQ = 95 * 95;
  function frame() {
    if (!paused) {
      ctx.clearRect(0, 0, W, H);

      // Grid
      ctx.beginPath(); ctx.strokeStyle = 'rgba(100,160,255,0.03)'; ctx.lineWidth = .5;
      for (let x = 0; x < W; x += STEP) { ctx.moveTo(x,0); ctx.lineTo(x,H); }
      for (let y = 0; y < H; y += STEP) { ctx.moveTo(0,y); ctx.lineTo(W,y); }
      ctx.stroke();

      // Dots
      ctx.beginPath(); ctx.fillStyle = 'rgba(100,160,255,0.5)';
      dots.forEach(d => {
        d.x = (d.x + d.vx + W) % W;
        d.y = (d.y + d.vy + H) % H;
        ctx.moveTo(d.x + d.r, d.y);
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      });
      ctx.fill();

      // Lines
      ctx.beginPath(); ctx.strokeStyle = 'rgba(100,160,255,0.08)'; ctx.lineWidth = .6;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i+1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          if (dx*dx + dy*dy < MAX_SQ) { ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y); }
        }
      }
      ctx.stroke();
    }
    requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', () => { paused = document.hidden; });
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 200); });
  resize(); frame();
}

/* ─── CONTACT FORM ─────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    const btn = form.querySelector('.btn-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Sending… <i class="bi bi-arrow-repeat spin"></i>';
    btn.disabled = true;

    // Submit form data to Netlify
    const formData = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData)
    })
    .then(() => {
      btn.innerHTML = 'Message Sent <i class="bi bi-check-lg"></i>';
      btn.style.background = '#22c55e';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    })
    .catch(err => {
      console.error('Form submission error:', err);
      btn.innerHTML = 'Error sending <i class="bi bi-exclamation-triangle"></i>';
      btn.style.background = '#ef4444';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    });
  });
}

/* ─── ACTIVE NAV ───────────────────────────────────────────── */
function initNavActive() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('section[id]').forEach(s => io.observe(s));
}

/* ─── TICKER PAUSE ON HOVER ────────────────────────────────── */
function initTicker() {
  const t = document.querySelector('.ticker-track');
  if (!t) return;
  t.addEventListener('mouseenter', () => t.style.animationPlayState = 'paused');
  t.addEventListener('mouseleave', () => t.style.animationPlayState = 'running');
}
