document.addEventListener('DOMContentLoaded', () => {
    const id = (str) => document.getElementById(str);
    
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
        talento: {
            content: `
                <span class="modal-category">Recursos Humanos y Psicología</span>
                <span class="research-group">G.I. Innovación Organizacional (CUC)</span>
                <h2>Neurociencias en la Gestión del Talento Empresarial</h2>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Talento Humano">
                <p>En el panorama corporativo moderno, la gestión del talento humano ha evolucionado más allá de las prácticas tradicionales, integrando descubrimientos clave de las neurociencias para optimizar el bienestar y el rendimiento de los colaboradores.</p>
                <p>Investigadores de la Universidad de la Costa (CUC) presentan nuevos enfoques para medir la carga cognitiva y el estrés en tiempo real, permitiendo a las organizaciones diseñar entornos laborales que fomenten la creatividad, la motivación intrínseca y la salud mental.</p>
                <p>Al comprender cómo el cerebro procesa el reconocimiento, la toma de decisiones y las interacciones sociales, las empresas pueden implementar estrategias de liderazgo más empáticas y efectivas, transformando la cultura organizacional desde sus cimientos neuronales.</p>
                <a href="https://www.cuc.edu.co/investigacion" target="_blank" class="btn btn-primary mt-3" style="display: inline-block;">Leer Investigación Completa <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left: 5px;"></i></a>
            `
        },
        social: {
            content: `
                <span class="modal-category">Ética y Sociedad</span>
                <span class="research-group">G.I. Ética y Negocios (UTP)</span>
                <h2>Responsabilidad Social Corporativa en la Era Digital</h2>
                <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Responsabilidad Social">
                <p>La integración de la Responsabilidad Social Corporativa (RSC) en la estrategia de negocios es vital en una era de alta conectividad y transparencia. La Universidad Tecnológica del Perú (UTP) lidera este análisis sobre cómo las empresas pueden generar valor compartido.</p>
                <p>Este estudio destaca casos de éxito donde la tecnología digital y las plataformas sociales se han utilizado para impulsar la visibilidad de iniciativas comunitarias, promoviendo la inclusión y la equidad en sectores históricamente marginados.</p>
                <p>Además, se exploran los desafíos de la ética digital, la privacidad de los datos y el rol fundamental que juegan las organizaciones en la mitigación de las brechas de desigualdad, demostrando que el éxito financiero y el progreso social no son mutuamente excluyentes.</p>
                <a href="https://www.utp.edu.pe/investigacion" target="_blank" class="btn btn-primary mt-3" style="display: inline-block;">Leer Investigación Completa <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left: 5px;"></i></a>
            `
        },
        turismo: {
            content: `
                <span class="modal-category">Desarrollo Sostenible</span>
                <span class="research-group">Cuerpo Académico Turismo Sostenible (UQROO)</span>
                <h2>Ecoturismo y Conservación del Patrimonio Natural</h2>
                <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sostenibilidad y Turismo">
                <p>Frente a la emergencia climática global, la sostenibilidad se ha convertido en el pilar fundamental para la industria del turismo. Investigadores de la Universidad Autónoma del Estado de Quintana Roo (UQROO) presentan modelos de ecoturismo aplicados al Caribe y América Latina.</p>
                <p>A través de un enfoque basado en las comunidades locales, la investigación demuestra cómo las estrategias de turismo sostenible no solo protegen los frágiles ecosistemas de arrecifes y selvas tropicales, sino que también revitalizan las economías regionales y promueven la conservación activa del patrimonio biocultural.</p>
                <p>Se proponen nuevas normativas de planificación territorial y certificaciones verdes, impulsadas por tecnologías limpias y energías renovables, asegurando que las maravillas naturales se preserven para las futuras generaciones.</p>
                <a href="https://www.uqroo.mx/investigacion" target="_blank" class="btn btn-primary mt-3" style="display: inline-block;">Leer Investigación Completa <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left: 5px;"></i></a>
            `
        },
        emprendimiento: {
            content: `
                <span class="modal-category">Innovación e Industria 4.0</span>
                <span class="research-group">G.I. Emprendimiento Tecnológico (CUC - UTP)</span>
                <h2>Ecosistemas de Innovación y Emprendimiento Tecnológico</h2>
                <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Emprendimiento e Innovación">
                <p>El impulso del emprendimiento tecnológico es un motor clave para la aceleración económica de Latinoamérica. Este estudio colaborativo detalla la estructuración de ecosistemas de innovación resilientes que conectan startups, academia e industria.</p>
                <p>Analizamos las metodologías ágiles y los modelos de incubación que están facilitando la creación de empresas disruptivas orientadas a resolver problemáticas locales utilizando la Inteligencia Artificial, el Internet de las Cosas (IoT) y la automatización inteligente.</p>
                <p>El artículo evidencia cómo el fomento de una mentalidad innovadora desde las aulas universitarias resulta en un incremento sustancial en el desarrollo de patentes, la atracción de capital semilla internacional y el crecimiento sostenido del mercado tecnológico regional.</p>
                <a href="https://www.cuc.edu.co/innovacion" target="_blank" class="btn btn-primary mt-3" style="display: inline-block;">Leer Investigación Completa <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left: 5px;"></i></a>
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
