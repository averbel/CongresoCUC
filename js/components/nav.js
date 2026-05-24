import { CONFIG } from '../config.js';
import { getById, queryAll, debounce } from '../utils.js';

function initMobileToggle() {
  const toggle = document.createElement('button');
  toggle.className = 'menu-toggle';
  toggle.setAttribute('aria-label', 'Abrir menú');
  toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

  const nav = document.querySelector('.nav-content');
  const navLinks = document.querySelector('.nav-links');
  if (!nav || !navLinks) return;

  nav.insertBefore(toggle, navLinks);

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = navLinks.classList.contains('nav-active')
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
      const icon = toggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });
}

function initActiveSectionTracking() {
  const sections = queryAll('section[id]');
  const navLinks = queryAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${entry.target.id}`);
      });
    });
  }, {
    rootMargin: `-${CONFIG.UI.NAV_HEIGHT_PX}px 0px -50% 0px`,
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

export function initNav() {
  initMobileToggle();
  initActiveSectionTracking();
}
