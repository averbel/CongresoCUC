import { CONFIG } from '../config.js';
import { getById, debounce } from '../utils.js';

class ExpositoresCarousel {
  constructor() {
    this.track = document.querySelector('.expositores-carousel__track');
    this.viewport = document.querySelector('.expositores-carousel__viewport');
    this.dotsContainer = document.querySelector('.expositores-carousel__dots');
    this.prevButton = document.querySelector('.expositores-carousel__btn--prev');
    this.nextButton = document.querySelector('.expositores-carousel__btn--next');

    if (!this.track) return;

    this.cards = Array.from(this.track.children);
    this.currentIndex = 0;
    this.isAnimating = false;
    this.autoplayInterval = null;
    this.resizeHandler = debounce(() => this.refresh(), CONFIG.UI.RESIZE_DEBOUNCE_MS);

    this.init();
  }

  get itemsPerView() {
    const width = window.innerWidth;
    if (width <= CONFIG.BREAKPOINT.MOBILE) return 1;
    if (width <= CONFIG.BREAKPOINT.TABLET) return 2;
    return 4;
  }

  get totalSlides() {
    return Math.ceil(this.cards.length / this.itemsPerView);
  }

  refresh() {
    this.track.style.setProperty('--items-per-view', this.itemsPerView);
  }

  goTo(index) {
    if (this.isAnimating) return;
    if (index < 0 || index >= this.totalSlides) return;

    this.isAnimating = true;
    this.currentIndex = index;
    
    // Desplazamiento página por página (100% del viewport por página)
    let offset = -(index * 100);
    
    // Límite máximo para no pasar del último expositor y evitar espacios vacíos
    const maxOffset = -((this.cards.length - this.itemsPerView) * (100 / this.itemsPerView));
    if (offset < maxOffset) {
      offset = maxOffset;
    }

    this.track.style.transform = `translateX(${offset}%)`;
    this.updateDots();
    this.resetAutoplay();

    setTimeout(() => { this.isAnimating = false; }, CONFIG.UI.ANIMATION_LOCK_MS);
  }

  next() { this.goTo(this.currentIndex + 1); }
  prev() { this.goTo(this.currentIndex - 1); }

  createDots() {
    if (!this.dotsContainer) return;

    this.dotsContainer.innerHTML = '';

    if (this.totalSlides <= 1) {
      this.dotsContainer.style.display = 'none';
      return;
    }

    this.dotsContainer.style.display = '';

    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = `dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => this.next(), CONFIG.UI.EXPOSITORES_INTERVAL_MS);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  resetAutoplay() {
    this.startAutoplay();
  }

  bindEvents() {
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => { this.prev(); });
    }
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => { this.next(); });
    }

    const container = this.track.closest('.expositores-carousel');
    if (container) {
      container.addEventListener('mouseenter', () => this.stopAutoplay());
      container.addEventListener('mouseleave', () => this.startAutoplay());
    }

    this.bindTouchEvents();
    this.bindKeyboardEvents();
    window.addEventListener('resize', this.resizeHandler);
  }

  bindTouchEvents() {
    let startX = 0;
    let isDragging = false;

    this.track.addEventListener('touchstart', (event) => {
      startX = event.changedTouches[0].clientX;
      isDragging = true;
    }, { passive: true });

    this.track.addEventListener('touchend', (event) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = event.changedTouches[0].clientX - startX;

      if (Math.abs(diff) > CONFIG.UI.TOUCH_THRESHOLD_PX) {
        if (diff > 0) this.prev();
        else this.next();
      }
    }, { passive: true });
  }

  bindKeyboardEvents() {
    document.addEventListener('keydown', (event) => {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) return;

      if (event.key === 'ArrowLeft') this.prev();
      if (event.key === 'ArrowRight') this.next();
    });
  }

  init() {
    if (!this.track) return;
    this.refresh();
    this.createDots();
    this.bindEvents();
    this.startAutoplay();
  }
}

export function initExpositoresCarousel() {
  new ExpositoresCarousel();
}
