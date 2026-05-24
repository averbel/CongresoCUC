import { CONFIG } from '../config.js';
import { getById } from '../utils.js';

export function initGalleryCarousel() {
  const slider = getById('carouselSlider');
  const dotsContainer = getById('carouselDots');
  const prevButton = getById('prevBtn');
  const nextButton = getById('nextBtn');

  if (!slider || !dotsContainer || !prevButton || !nextButton) return;

  const items = slider.querySelectorAll('.carousel-item');
  if (!items.length) return;

  let currentIndex = 0;
  let autoplayInterval = null;

  function createDots() {
    dotsContainer.innerHTML = '';
    items.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = `dot${index === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  function goToSlide(index) {
    currentIndex = (index + items.length) % items.length;
    updateSlider();
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, CONFIG.UI.GALLERY_INTERVAL_MS);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  prevButton.addEventListener('click', () => { prevSlide(); startAutoplay(); });
  nextButton.addEventListener('click', () => { nextSlide(); startAutoplay(); });

  const container = slider.closest('.carousel-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
  }

  createDots();
  startAutoplay();
}
