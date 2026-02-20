/* ═══════════════════════════════════════════════════
   main.js — BOLO CREATE
   Navigation scroll, mobile menu, scroll-reveal,
   and custom cursor — all performance-optimised.
═══════════════════════════════════════════════════ */

/* ─── Nav: scroll class ─────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── Mobile Menu ───────────────────────────────── */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

function openMenu() {
  mobileMenu.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

/* ─── Scroll Reveal (Intersection Observer) ────── */
const reveals = document.querySelectorAll(
  '.service-card, .services__header, .about__inner, .about__left, .about__right, .cta-banner__inner, .trust-strip__label, .work-card, .work__header'
);
reveals.forEach((el) => {
  el.classList.add('reveal');
  // No stagger delay — stagger felt like "loading lag" to the user
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once, then stop watching
      }
    });
  },
  // 0.05 = start animating when just 5% of the element is in view,
  // so cards appear to snap in before they fully enter — feels instant.
  { threshold: 0.05 }
);
reveals.forEach(el => revealObserver.observe(el));

/* ─── Smooth Anchor Scrolling ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── Custom cursor dot ──────────────────────────
   KEY FIX: use transform: translate(x,y) instead of
   left/top — transform runs on the GPU compositor and
   never triggers layout/reflow. We also RAF-throttle
   so the cursor only updates once per frame (~16 ms).
────────────────────────────────────────────────── */
const cursorDot = document.createElement('div');
cursorDot.id = 'cursor-dot';
cursorDot.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 6px;
  height: 6px;
  background: #c8ff00;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  will-change: transform;
  transform: translate(-50%, -50%);
`;

const cursorRing = document.createElement('div');
cursorRing.id = 'cursor-ring';
cursorRing.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(200, 255, 0, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0;
  will-change: transform;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease,
              border-color 0.2s ease, opacity 0.3s ease;
`;

document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

// Track latest mouse position; update visuals inside RAF
let curX = -100, curY = -100;
let cursorPending = false;

document.addEventListener('mousemove', (e) => {
  curX = e.clientX;
  curY = e.clientY;

  if (!cursorPending) {
    cursorPending = true;
    requestAnimationFrame(() => {
      cursorPending = false;
      const tx = `translate(${curX}px, ${curY}px)`;
      cursorDot.style.transform = tx;
      cursorRing.style.transform = tx;
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }
}, { passive: true });

// Ring expand on interactive elements
document.querySelectorAll('a, button, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width = '52px';
    cursorRing.style.height = '52px';
    cursorRing.style.borderColor = 'rgba(200, 255, 0, 0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width = '32px';
    cursorRing.style.height = '32px';
    cursorRing.style.borderColor = 'rgba(200, 255, 0, 0.4)';
  });
});

/* ─── SPLINE INTEGRATION HELPERS ─────────────────
   Utility: Lazy-load Spline viewer script on demand
══════════════════════════════════════════════════ */
window.BoloCreate = {
  loadSplineViewer() {
    if (document.querySelector('script[data-spline]')) return;
    const s = document.createElement('script');
    s.type = 'module';
    s.src = 'https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js';
    s.setAttribute('data-spline', '');
    document.head.appendChild(s);
  },
  mountSpline(selector, sceneUrl) {
    this.loadSplineViewer();
    const container = document.querySelector(selector);
    if (!container) return console.warn('BoloCreate.mountSpline: element not found:', selector);
    container.innerHTML = `<spline-viewer url="${sceneUrl}" style="width:100%;height:100%;display:block;"></spline-viewer>`;
  }
};

/* ─── Year in footer ─────────────────────────── */
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* ─── Infinite Marquee (Scroll-Direction Aware) ── */
const ticker = document.getElementById('footerTicker');
if (ticker) {
  // Duplicate the content so it can seamlessly loop
  ticker.innerHTML += ticker.innerHTML + ticker.innerHTML;

  let position = 0;
  let speed = 1.0;
  let targetSpeed = 1.0;
  let lastScroll = window.scrollY;

  const tick = () => {
    const currentScroll = window.scrollY;
    const scrollDelta = currentScroll - lastScroll;

    // Boost speed based on scroll
    if (scrollDelta > 0) {
      targetSpeed = 4;
    } else if (scrollDelta < 0) {
      targetSpeed = -4;
    } else {
      // Decelerate back to normal speed (forward or backward)
      targetSpeed = Math.sign(speed) * 1.0 || 1.0;
    }

    speed += (targetSpeed - speed) * 0.1;
    position -= speed;

    // We reset position when it hits 1/3 of the width (since we have 3 copies)
    const elementWidth = ticker.scrollWidth;
    const jumpWidth = elementWidth / 3;

    if (position <= -jumpWidth) {
      position += jumpWidth;
    } else if (position > 0) {
      position -= jumpWidth;
    }

    // Use translate3d for GPU acceleration
    ticker.style.transform = `translate3d(${position}px, 0, 0)`;
    lastScroll = currentScroll;
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
