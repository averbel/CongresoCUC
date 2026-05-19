document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navBarContent = document.querySelector('.nav-content');
    const navLinksContainer = document.querySelector('.nav-links');

    // Create Mobile Toggle
    if (navBarContent && navLinksContainer) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        navBarContent.insertBefore(menuToggle, navLinksContainer);

        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
            menuToggle.innerHTML = navLinksContainer.classList.contains('nav-active') 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('nav-active');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // Scroll Highlight
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
            const href = link.getAttribute('href');
            if (href && href.includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });
});
