const id = (str) => document.getElementById(str);

document.addEventListener('DOMContentLoaded', () => {
    
    // TAB LOGIC
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetEl = id(target);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // CAROUSEL LOGIC
    const slider = id('carouselSlider');
    const items = document.querySelectorAll('.carousel-item');
    const dotsContainer = id('carouselDots');
    const prevBtn = id('prevBtn');
    const nextBtn = id('nextBtn');
    
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
        if (slider) {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
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

    // SCROLL REVEAL
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // NAV HIGHLIGHT
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // MODAL LOGIC (Universal Handler)
    const loginBtn = id('navLoginBtn');
    const loginModal = id('loginModal');
    const articleModal = id('articleModal');
    const articleModalContent = id('articleModalContent');
    const closeButtons = document.querySelectorAll('.close-modal, .close-article-modal');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    // Open Login Modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => loginModal.classList.add('active'));
    }

    // Close Modals (Button)
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOverlays.forEach(modal => modal.classList.remove('active'));
        });
    });

    // Close Modals (Overlay Click)
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    });

    // ARTICLE PORTAL DATA
    const articlesData = {
        salud: {
            content: `
                <span class="modal-category">Investigación en Salud</span>
                <span class="research-group">Grupo de Investigación en Neurociencias (GINE)</span>
                <h2>Fronteras de la Neurociencia: Mapeando el Pensamiento</h2>
                <img src="assets/images/article_neuro.png" alt="Neurociencia">
                <p>La neurociencia moderna ha entrado en una fase revolucionaria, donde la tecnología digital y la biología se fusionan para desentrañar el órgano más complejo del universo: el cerebro humano.</p>
                <p>En el seminario de la CUC, presentamos hallazgos recientes sobre la neuroplasticidad, demostrando que el cerebro no es una red estática, sino un ecosistema dinámico capaz de reconfigurarse ante nuevos aprendizajes y traumas. Esto abre puertas sin precedentes para la rehabilitación cognitiva y el tratamiento de enfermedades neurodegenerativas.</p>
                <p>Nuestros equipos están utilizando interfaces cerebro-computadora de última generación para mapear los circuitos neuronales involucrados en la toma de decisiones, permitiendo una comprensión más profunda de la conciencia y el comportamiento humano en entornos digitales.</p>
            `
        },
        ingenieria: {
            content: `
                <span class="modal-category">Ingeniería y Sostenibilidad</span>
                <span class="research-group">Grupo de Investigación en Energía (GIEN)</span>
                <h2>Energías Renovables en el Caribe</h2>
                <img src="assets/images/article2.png" alt="Ingeniería">
                <p>El potencial energético de la región Caribe es inmenso, especialmente en lo que respecta a la radiación solar y los vientos costeros. La CUC está a la vanguardia de la investigación en infraestructura offshore.</p>
                <p>Estamos desarrollando nuevos recubrimientos para paneles solares que resisten la alta salinidad y la humedad extrema de nuestras costas. Estos materiales avanzados han demostrado un incremento del 15% en la eficiencia operativa a largo plazo en comparación con los estándares actuales.</p>
                <p>Además, nuestro laboratorio de fluidos está simulando la instalación de turbinas eólicas flotantes, una solución innovadora que podría abastecer de energía limpia a miles de hogares sin impactar el uso comercial de la tierra firme.</p>
            `
        },
        sociales: {
            content: `
                <span class="modal-category">Impacto y Desarrollo Social</span>
                <span class="research-group">Grupo de Investigación en Educación y Sociedad (GIES)</span>
                <h2>Impacto Social de la Ciencia</h2>
                <img src="assets/images/article3.png" alt="Social">
                <p>La investigación no debe ocurrir aislada en laboratorios; su verdadero valor se mide por el impacto tangible en la calidad de vida de las comunidades. Este es el núcleo de nuestra investigación social.</p>
                <p>A través de proyectos participativos en barrios locales, hemos implementado estrategias de innovación social que combinan la tecnología digital con la sabiduría comunitaria ancestral. Esto ha permitido mejorar el acceso a servicios básicos mediante aplicaciones de autogestión vecinal.</p>
                <p>Nuestros sociólogos e investigadores educativos están documentando cómo este modelo colaborativo está reduciendo la deserción escolar y fomentando el emprendimiento juvenil en zonas de vulnerabilidad socioeconómica.</p>
            `
        }
    };

    // Open Article Detail
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', () => {
            const articleId = card.getAttribute('data-article');
            const data = articlesData[articleId];
            if (data && articleModalContent && articleModal) {
                articleModalContent.innerHTML = data.content;
                articleModal.classList.add('active');
            }
        });
    });

});
