document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('carouselSlider');
    const items = document.querySelectorAll('.carousel-item');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!slider || items.length === 0) return;

    let currentIndex = 0;
    const totalItems = items.length;

    // Create dots
    if (dotsContainer) {
        items.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    const updateCarousel = () => {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateCarousel();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    };

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto slide
    let autoSlideInterval = setInterval(nextSlide, 5000);

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carouselContainer.addEventListener('mouseleave', () => autoSlideInterval = setInterval(nextSlide, 5000));
    }
});
