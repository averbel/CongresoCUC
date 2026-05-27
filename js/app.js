import { initNav } from './components/nav.js';
import { initScrollReveal } from './components/scroll-reveal.js';
import { initTabs } from './components/tabs.js';
import { initModals } from './components/modals.js';
import { initRegistrationForm } from './components/form.js';
import { initGalleryCarousel } from './components/gallery-carousel.js';


document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initTabs();
  initModals();
  initRegistrationForm();
  initGalleryCarousel();

});
