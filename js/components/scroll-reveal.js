import { CONFIG } from '../config.js';
import { queryAll } from '../utils.js';

export function initScrollReveal() {
  const elements = queryAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: CONFIG.UI.REVEAL_THRESHOLD
  });

  elements.forEach(el => observer.observe(el));
}
