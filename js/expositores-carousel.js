document.addEventListener('DOMContentLoaded', () => {
    class ExpositoresCarousel {
        constructor() {
            this.carousel = document.querySelector('.expositores-carousel');
            if (!this.carousel) return;

            this.track = this.carousel.querySelector('.expositores-carousel__track');
            this.cards = this.track ? Array.from(this.track.children) : [];
            this.dotsContainer = this.carousel.querySelector('.expositores-carousel__dots');
            this.prevBtn = this.carousel.querySelector('.expositores-carousel__btn--prev');
            this.nextBtn = this.carousel.querySelector('.expositores-carousel__btn--next');

            if (!this.track || this.cards.length === 0) return;

            this.currentSlide = 0;
            this.interval = null;
            this.isAnimating = false;

            this.refresh();
            this.createDots();
            this.bindEvents();
            this.startAutoplay();
        }

        get itemsPerView() {
            const w = window.innerWidth;
            if (w <= 768) return 1;
            if (w <= 992) return 2;
            return 4;
        }

        get totalSlides() {
            return Math.ceil(this.cards.length / this.itemsPerView);
        }

        refresh() {
            this.carousel.style.setProperty('--items-per-view', this.itemsPerView);
        }

        goTo(index) {
            if (this.isAnimating) return;
            const total = this.totalSlides;
            this.currentSlide = ((index % total) + total) % total;
            this.isAnimating = true;
            this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
            this.updateDots();
            setTimeout(() => { this.isAnimating = false; }, 600);
        }

        next() { this.goTo(this.currentSlide + 1); }
        prev() { this.goTo(this.currentSlide - 1); }

        createDots() {
            if (!this.dotsContainer) return;
            this.dotsContainer.innerHTML = '';
            const total = this.totalSlides;
            if (total <= 1) { this.dotsContainer.style.display = 'none'; return; }
            this.dotsContainer.style.display = 'flex';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                dot.className = 'expositores-carousel__dot' + (i === this.currentSlide ? ' active' : '');
                dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
                dot.addEventListener('click', () => { this.goTo(i); this.resetAutoplay(); });
                this.dotsContainer.appendChild(dot);
            }
        }

        updateDots() {
            if (!this.dotsContainer) return;
            const dots = this.dotsContainer.children;
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.toggle('active', i === this.currentSlide);
            }
        }

        startAutoplay() {
            this.stopAutoplay();
            this.interval = setInterval(() => this.next(), 4500);
        }

        stopAutoplay() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }

        resetAutoplay() {
            this.startAutoplay();
        }

        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => { this.prev(); this.resetAutoplay(); });
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => { this.next(); this.resetAutoplay(); });
            }

            this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
            this.carousel.addEventListener('mouseleave', () => this.startAutoplay());

            let touchStartX = 0;
            let touchDiff = 0;
            let isDragging = false;

            this.carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                isDragging = true;
                this.stopAutoplay();
            }, { passive: true });

            this.carousel.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                touchDiff = touchStartX - e.changedTouches[0].screenX;
            }, { passive: true });

            this.carousel.addEventListener('touchend', () => {
                if (!isDragging) return;
                isDragging = false;
                if (Math.abs(touchDiff) > 50) {
                    if (touchDiff > 0) this.next();
                    else this.prev();
                }
                touchDiff = 0;
                this.startAutoplay();
            }, { passive: true });

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const prevCount = this.totalSlides;
                    this.refresh();
                    if (this.currentSlide >= this.totalSlides) {
                        this.currentSlide = Math.max(0, this.totalSlides - 1);
                    }
                    this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
                    if (prevCount !== this.totalSlides) this.createDots();
                    else this.updateDots();
                }, 200);
            });

            document.addEventListener('keydown', (e) => {
                const rect = this.carousel.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (!isVisible) return;
                if (e.key === 'ArrowLeft') { this.prev(); this.resetAutoplay(); }
                if (e.key === 'ArrowRight') { this.next(); this.resetAutoplay(); }
            });
        }
    }

    new ExpositoresCarousel();
});
