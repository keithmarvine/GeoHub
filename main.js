'use strict';
/* ═══════════════════════════════════════════════════════════════
   GeoHuB | The Spatial Network — main.js
   Zero dependencies. Vanilla JS only.
═══════════════════════════════════════════════════════════════ */

/* ─── PRELOADER ────────────────────────────────────────────── */
/* The preloader is decorative, but it gates startPage() — so if it
   ever stalls, nothing on the page initialises. Three safeguards:
   only show it on a first visit, cap how long it can run, and keep
   a failsafe timer that starts the page regardless. */
(function () {
  const el   = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const pct  = document.getElementById('preloaderPct');

  let started = false;
  function go() {
    if (started) return;
    started = true;
    startPage();
  }

  /* Skip entirely with no preloader, on repeat views within the
     session, or when the visitor has asked for reduced motion.
     Sitting through this on every page view is pure friction. */
  let seen = false;
  try { seen = sessionStorage.getItem('geohubSeen') === '1'; } catch (e) { /* private mode */ }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!el || seen || reduced) {
    if (el) el.classList.add('done');
    go();
    return;
  }

  try { sessionStorage.setItem('geohubSeen', '1'); } catch (e) { /* ignore */ }

  /* Failsafe: whatever happens above, the page starts. */
  const failsafe = setTimeout(() => {
    el.classList.add('done');
    go();
  }, 2600);

  const CAP = 900;              // ms the bar is allowed to run
  const STEP = 60;
  const begin = performance.now();

  const t = setInterval(() => {
    const v = Math.min(100, Math.round(((performance.now() - begin) / CAP) * 100));
    if (fill) fill.style.width = v + '%';
    if (pct)  pct.textContent = v + '%';

    if (v >= 100) {
      clearInterval(t);
      el.classList.add('exiting');
      setTimeout(() => {
        clearTimeout(failsafe);
        el.classList.add('done');
        go();
      }, 450);
    }
  }, STEP);
})();

/* ─── PAGE START ───────────────────────────────────────────── */
function startPage() {
  document.body.classList.add('page-loaded');
  initCursor();
  initHeader();
  initMobileMenu();
  initAnchorScroll();
  initScrollAnims();
  initGlobe();
  initGeoCanvas();
  initContactForm();
  initNavActive();
  initTicker();
  initFaq();
  initStickyCta();
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
/* Posts to Netlify Forms. The form also carries a real action="/thank-you"
   so it still works with JS disabled — hence the preventDefault below:
   without it the browser fires its own navigating POST alongside the fetch. */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const wrap    = form.parentElement;
  const success = document.getElementById('formSuccess');
  const failure = document.getElementById('formError');

  /* ── validation ── */
  function setError(field, msg) {
    const group = field.closest('.form-group, .form-consent');
    if (!group) return;
    group.classList.add('has-error');
    let note = group.querySelector('.field-error');
    if (!note) {
      note = document.createElement('span');
      note.className = 'field-error';
      group.appendChild(note);
    }
    note.textContent = msg;
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    const group = field.closest('.form-group, .form-consent');
    if (!group) return;
    group.classList.remove('has-error');
    const note = group.querySelector('.field-error');
    if (note) note.textContent = '';
    field.removeAttribute('aria-invalid');
  }

  function validate() {
    const fname   = form.querySelector('#fname');
    const email   = form.querySelector('#email');
    const message = form.querySelector('#message');
    const consent = form.querySelector('#consent');
    let firstBad  = null;

    [fname, email, message, consent].forEach(f => f && clearError(f));

    if (fname && !fname.value.trim()) {
      setError(fname, 'Please tell us your name.');
      firstBad = firstBad || fname;
    }
    if (email) {
      const v = email.value.trim();
      if (!v) {
        setError(email, 'We need an email address to reply to.');
        firstBad = firstBad || email;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        setError(email, 'That email address does not look right.');
        firstBad = firstBad || email;
      }
    }
    if (message && !message.value.trim()) {
      setError(message, 'A sentence or two about your project is enough.');
      firstBad = firstBad || message;
    }
    if (consent && !consent.checked) {
      setError(consent, 'Please tick this so we can reply to you.');
      firstBad = firstBad || consent;
    }

    if (firstBad) {
      firstBad.focus({ preventScroll: true });
      firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  }

  /* clear an error as soon as the visitor fixes it */
  form.querySelectorAll('input, textarea, select').forEach(f => {
    f.addEventListener('input',  () => clearError(f));
    f.addEventListener('change', () => clearError(f));
  });

  /* ── submit ── */
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    const btn  = form.querySelector('.btn-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Sending… <i class="bi bi-arrow-repeat spin"></i>';
    btn.disabled = true;
    if (failure) failure.hidden = true;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form))
    })
    .then(res => {
      if (!res.ok) throw new Error('Netlify responded ' + res.status);
      form.reset();
      if (success) {
        form.hidden = true;
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus({ preventScroll: true });
        if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        btn.innerHTML = 'Message sent <i class="bi bi-check-lg"></i>';
      }
    })
    .catch(err => {
      /* Never swallow a lead. Surface the direct channels instead. */
      console.error('Form submission error:', err);
      btn.innerHTML = orig;
      btn.disabled = false;
      if (failure) {
        failure.hidden = false;
        failure.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        btn.innerHTML = 'Could not send — please email us <i class="bi bi-exclamation-triangle"></i>';
      }
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

/* ─── FAQ ACCORDION ────────────────────────────────────────── */
function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn   = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');

      /* one at a time — keeps the section scannable */
      items.forEach(other => {
        other.classList.remove('open');
        const b = other.querySelector('.faq-q');
        const p = other.querySelector('.faq-a');
        if (b) b.setAttribute('aria-expanded', 'false');
        if (p) p.style.maxHeight = null;
      });

      if (!open) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* keep an open panel correctly sized when the text reflows */
  let ft;
  window.addEventListener('resize', () => {
    clearTimeout(ft);
    ft = setTimeout(() => {
      const open = document.querySelector('.faq-item.open .faq-a');
      if (open) open.style.maxHeight = open.scrollHeight + 'px';
    }, 200);
  });
}

/* ─── STICKY MOBILE CTA ────────────────────────────────────── */
/* Appears once the visitor is past the hero, hides over the contact
   section so it never covers the form it is pointing at. */
function initStickyCta() {
  const bar = document.getElementById('stickyCta');
  if (!bar) return;

  const hero    = document.querySelector('.hero, .sub-hero');
  const contact = document.getElementById('contact');
  const footer  = document.querySelector('.footer');

  let pastHero = false;
  let atTarget = false;

  const apply = () => bar.classList.toggle('show', pastHero && !atTarget);

  if (hero) {
    new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting;
      apply();
    }, { threshold: 0, rootMargin: '-120px 0px 0px 0px' }).observe(hero);
  } else {
    pastHero = true;
  }

  /* track each target separately — an IO callback only reports the
     elements that changed, not everything being observed */
  const visible = new Set();
  const hideOver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    });
    atTarget = visible.size > 0;
    apply();
  }, { threshold: 0 });
  if (contact) hideOver.observe(contact);
  if (footer)  hideOver.observe(footer);

  apply();
}
