document.addEventListener('DOMContentLoaded', () => {
    const id = (str) => document.getElementById(str);
    
    const loginBtn = id('navLoginBtn');
    const loginModal = id('loginModal');
    const articleModal = id('articleModal');
    const articleModalContent = id('articleModalContent');
    const speakerModal = id('speakerModal');
    const speakerModalContent = id('speakerModalContent');
    const closeButtons = document.querySelectorAll('.close-modal, .close-article-modal, .close-speaker-modal');
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

    // ========== SPEAKER PROFILES ==========
    const speakersData = {
        'nelson-david-lay-raby': {
            name: 'Nelson David Lay Raby',
            role: 'Investigador',
            affiliation: 'Universidad Andrés Bello (Chile) / Universidad de la Costa (Colombia)',
            img: 'assets/images/Nelson%20David%20Lay%20Raby.jpg',
            bio: 'Investigador y académico con amplia trayectoria en gestión estratégica del talento humano, liderazgo organizacional y desarrollo de competencias investigativas. Ha publicado numerosos artículos en revistas indexadas sobre gerencia estratégica, cadena de valor en mercados sostenibles y estrategias pedagógicas para el aprendizaje universitario. Es colaborador activo de redes académicas internacionales y ha participado en proyectos de investigación interinstitucionales entre Chile y Colombia.',
            research: ['Gestión del Talento Humano', 'Liderazgo Organizacional', 'Competencias Investigativas', 'Gerencia Estratégica'],
            scholar: 'https://scholar.google.es/citations?hl=es&user=dkfTY7oAAAAJ'
        },
        'angelica-mata-cardenas': {
            name: 'Angelica Mata Cardenas',
            role: 'Investigadora',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Angelica%20Mata%20Cardenas.jpg',
            bio: 'Investigadora de la Universidad Autónoma del Estado de Quintana Roo, adscrita al grupo de investigación en Negocios, Mercadotecnia e Innovación. Coautora del trabajo ganador del Premio iQuatro Editores por su investigación sobre inteligencia emocional y su impacto en estudiantes de negocios. Su línea de investigación se enfoca en la mercadotecnia, el comportamiento organizacional y la innovación educativa en el contexto universitario.',
            research: ['Mercadotecnia', 'Inteligencia Emocional', 'Innovación Educativa', 'Negocios'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'christina-mccoy-cador': {
            name: 'Christina Elizabeth McCoy Cador',
            role: 'Docente Investigadora',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Christina%20Elizabeth%20McCoy%20Cador.png',
            bio: 'Docente investigadora de la Universidad Autónoma del Estado de Quintana Roo, especializada en la formación de profesionales con enfoque en el desarrollo sostenible y la gestión turística. Su labor académica combina la docencia universitaria con la investigación aplicada en áreas de turismo, mercadotecnia y desarrollo regional en el Caribe mexicano.',
            research: ['Turismo Sostenible', 'Desarrollo Regional', 'Docencia Universitaria', 'Gestión Turística'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'diva-licet-mendoza-ocasal': {
            name: 'Diva Licet Mendoza Ocasal',
            role: 'Coordinadora Académica',
            affiliation: 'Universidad de la Costa (CUC)',
            img: 'assets/images/Diva%20licet%20mendoza%20ocasal.png',
            bio: 'Psicóloga, MBA y Doctorante en Neurociencias Cognitiva Aplicada. Profesora y Coordinadora Académica del Área de Gestión del Talento Humano en el Departamento de Ciencias Empresariales de la Universidad de la Costa (CUC). Es Coach Ontológica certificada, especialista en Psicología Organizacional y conferencista internacional. Su investigación se centra en la medición de la felicidad laboral, el comportamiento organizacional y el diseño de instrumentos para la gestión humana. Es miembro de Colciencias y ha sido Gerente General y Directora de Gestión Humana en diversas organizaciones del sector salud y educativo.',
            research: ['Neurociencias Organizacionales', 'Felicidad Laboral', 'Gestión del Talento Humano', 'Comportamiento Organizacional'],
            scholar: 'https://scholar.google.es/citations?hl=es&user=mjCY_30AAAAJ'
        },
        'reynier-israel-ramirez-molina': {
            name: 'Reynier Israel Ramírez Molina',
            role: 'Especialista Invitado',
            affiliation: 'Universidad de la Costa (CUC)',
            img: 'assets/images/Reynier%20Israel%20%20Ram%C3%ADrez%20Molina.png',
            bio: 'Profesor e Investigador de Tiempo Completo de la Universidad de la Costa (CUC), con un destacado perfil en gestión tecnológica, talento humano y comunicación productiva en organizaciones. Cuenta con más de 30 publicaciones en revistas indexadas y un índice H de 12. Ha investigado sobre inteligencia social, liderazgo resonante, gestión del talento humano desde un enfoque sostenible y modelos de comunicación productiva para instituciones de salud pública.',
            research: ['Gestión Tecnológica', 'Talento Humano', 'Liderazgo Organizacional', 'Comunicación Productiva'],
            scholar: 'http://dialnet.unirioja.es/servlet/autor?codigo=4395853'
        },
        'gabriela-morales': {
            name: 'Gabriela Morales',
            role: 'Investigadora',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Gabriela%20morales.jpg',
            bio: 'Investigadora de la Universidad Autónoma del Estado de Quintana Roo, especializada en estudios del Caribe, desarrollo sustentable y ciencias sociales. Su trabajo académico se enfoca en la generación de conocimiento aplicado a la realidad socioeconómica y ambiental de la región peninsular de Yucatán.',
            research: ['Ciencias Sociales', 'Desarrollo Sustentable', 'Estudios del Caribe'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'ivette-medina-mata': {
            name: 'Ivette Medina Mata',
            role: 'Especialista',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Ivette%20Medina%20Mata.jpg',
            bio: 'Especialista universitaria adscrita a la Universidad Autónoma del Estado de Quintana Roo, donde desarrolla funciones de docencia e investigación en áreas de mercadotecnia y negocios. Participa activamente en proyectos académicos orientados al fortalecimiento de la educación superior y la vinculación con el sector empresarial en Quintana Roo.',
            research: ['Mercadotecnia', 'Negocios', 'Vinculación Universidad-Empresa'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'juan-loria': {
            name: 'Juan Loria',
            role: 'Investigador',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Juan%20loria.jpg',
            bio: 'Investigador de la Universidad Autónoma del Estado de Quintana Roo con experiencia en estudios sobre desarrollo regional, sostenibilidad y economía del Caribe mexicano. Su trabajo contribuye a la comprensión de los fenómenos económicos y sociales que impactan el desarrollo de la región peninsular.',
            research: ['Desarrollo Regional', 'Economía', 'Sostenibilidad'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'silvia-lourdes-vidal-taboada': {
            name: 'Silvia Lourdes Vidal Taboada',
            role: 'Conferencista',
            affiliation: 'Universidad Tecnológica del Perú (UTP)',
            img: 'assets/images/Silvia%20Lourdes%20Vidal%20Taboada.png',
            bio: 'Directora de Investigación Norte en la Universidad Tecnológica del Perú (UTP), campus Chiclayo. Cuenta con una amplia trayectoria en coordinación y gestión de investigación universitaria, liderando semilleros de investigación y proyectos de innovación. Sus publicaciones abarcan temas como políticas públicas para el emprendimiento universitario, brecha digital, logística para comercio electrónico transfronterizo, fraudes corporativos y análisis bibliométricos. Ha participado en workshops internacionales de investigación con universidades de Colombia y México, promoviendo la colaboración académica y la generación de conocimiento regional.',
            research: ['Emprendimiento Universitario', 'Políticas Públicas', 'Brecha Digital', 'Logística y Comercio'],
            scholar: 'https://alicia.concytec.gob.pe/vufind/index.php/Author/Home?author=Vidal-Taboada%2C+Silvia+Lourdes'
        },
        'karina-vazquez-jimenez': {
            name: 'Karina Vázquez Jiménez',
            role: 'Investigadora',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Karina%20V%C3%A1zquez%20Jim%C3%A9nez.jpg',
            bio: 'Investigadora de la Universidad Autónoma del Estado de Quintana Roo, enfocada en el estudio de las ciencias sociales, la educación y el desarrollo regional. Su labor investigadora aporta al conocimiento de las dinámicas sociales y educativas del sureste mexicano.',
            research: ['Ciencias Sociales', 'Educación', 'Desarrollo Regional'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'rosa-isela-fernandez-xicotencatl': {
            name: 'Rosa Isela Fernández Xicotencatl',
            role: 'Docente',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Rosa%20Isela%20Fern%C3%A1ndez%20Xicotencatl.png',
            bio: 'Docente universitaria en la Universidad Autónoma del Estado de Quintana Roo, comprometida con la formación de profesionales en áreas de negocios, mercadotecnia y administración. Su práctica educativa se combina con la investigación aplicada en innovación educativa y desarrollo de competencias profesionales.',
            research: ['Innovación Educativa', 'Formación Profesional', 'Mercadotecnia'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'beatriz-rocha-martinez': {
            name: 'Beatriz de la Trinidad Rocha Martinez',
            role: 'Investigadora',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Beatriz%20de%20la%20Trinidad%20Rocha%20Martinez.jpeg',
            bio: 'Investigadora de la Universidad Autónoma del Estado de Quintana Roo, con intereses en el desarrollo sostenible, el turismo y los estudios sociales aplicados al contexto del Caribe mexicano. Participa en proyectos de investigación multidisciplinarios que abordan los desafíos ambientales y sociales de la región.',
            research: ['Desarrollo Sostenible', 'Turismo', 'Estudios Sociales'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'anastacio-gustavo-fernandez-rodriguez': {
            name: 'Anastacio Gustavo Fernández Rodríguez',
            role: 'Investigador',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Anastacio%20Gustavo%20Fern%C3%A1ndez%20Rodr%C3%ADguez.jpeg',
            bio: 'Investigador de la Universidad Autónoma del Estado de Quintana Roo especializado en ciencias ambientales y desarrollo sostenible. Su trabajo se centra en la comprensión de los ecosistemas del Caribe y la generación de estrategias para su conservación y aprovechamiento sustentable.',
            research: ['Ciencias Ambientales', 'Desarrollo Sostenible', 'Conservación de Ecosistemas'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'mirna-yasmin-pacheco': {
            name: 'Mirna Yasmin Pacheco',
            role: 'Investigadora',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Mirna%20Yasmin%20Pacheco.jpeg',
            bio: 'Investigadora de la Universidad Autónoma del Estado de Quintana Roo, enfocada en el estudio del turismo sostenible, el desarrollo comunitario y la gestión cultural en la región maya de Quintana Roo. Contribuye a proyectos que integran la preservación del patrimonio cultural con el desarrollo turístico responsable.',
            research: ['Turismo Sostenible', 'Desarrollo Comunitario', 'Gestión Cultural'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'jose-antonio-leon-borges': {
            name: 'Dr. José Antonio León Borges',
            role: 'Investigador',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Dr.%20Jos%C3%A9%20Antonio%20Le%C3%B3n%20Borges.jpeg',
            bio: 'Profesor Investigador de Carrera en la Universidad Autónoma del Estado de Quintana Roo, especializado en ciencia de datos, inteligencia artificial e ingeniería de software. Su investigación abarca el reconocimiento de emociones por voz, detección de enfermedades en cultivos mediante CNN, análisis de contaminación en cenotes del Caribe mexicano, sistemas de seguridad informática y procesamiento de lenguas indígenas mexicanas. Ha publicado más de 20 artículos en revistas indizadas y ha participado en múltiples congresos internacionales de ingeniería y computación.',
            research: ['Ciencia de Datos', 'Inteligencia Artificial', 'Machine Learning', 'Visión por Computadora', 'Procesamiento de Lenguaje Natural'],
            scholar: 'https://scholar.google.es/citations?hl=es&user=BTdsSF8AAAAJ'
        },
        'mauricio-junior-santa-maria-ruiz': {
            name: 'Mauricio Junior Santa Maria Ruiz',
            role: 'Master in Business Administration',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Mauricio%20Junior%20Santa%20Maria%20Ruiz.jpeg',
            bio: 'Master in Business Administration (MBA) y profesional del área de negocios, vinculado a la Universidad Autónoma del Estado de Quintana Roo. Su experiencia abarca la gestión empresarial, la administración estratégica y el desarrollo de competencias organizacionales. Ha colaborado en investigaciones sobre gestión del talento humano apoyado por TIC, liderazgo resonante y competitividad organizacional.',
            research: ['Administración Estratégica', 'MBA', 'Gestión Empresarial', 'Talento Humano'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'tanya-makita-balcorta': {
            name: 'Tanya Makita Balcorta',
            role: 'Investigadora',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Tanya%20Makita%20Balcorta.jpeg',
            bio: 'Investigadora de la Universidad Autónoma del Estado de Quintana Roo con líneas de investigación en responsabilidad social empresarial, estudios organizacionales y desarrollo sostenible. Ha coautorado trabajos sobre la aproximación teórica de la responsabilidad social empresarial en México y la filosofía de las universidades públicas en Cancún, Quintana Roo.',
            research: ['Responsabilidad Social Empresarial', 'Estudios Organizacionales', 'Desarrollo Sostenible'],
            scholar: 'https://www.uqroo.mx/investigacion'
        },
        'liney-manjarrez-henriquez': {
            name: 'Liney Manjarrez Henríquez',
            role: 'Ponente Principal',
            affiliation: 'Universidad de la Costa (CUC)',
            img: 'assets/images/Liney%20Manjarrez%20Henr%C3%ADquez.jpeg',
            bio: 'Doctora por la Universitat Politècnica de València, España, con una destacada trayectoria internacional en investigación sobre relaciones universidad-empresa, innovación empresarial y producción científica. Su tesis doctoral analizó el efecto de las relaciones universidad-empresa sobre la segunda misión universitaria. Ha publicado en revistas científicas de alto impacto sobre transferencia de conocimiento, innovación abierta en PYMEs, colaboración universidad-industria y producción académica. Es profesora e investigadora en la Universidad de la Costa (CUC) y su trabajo ha sido fundamental para comprender cómo las sinergias entre academia e industria impulsan la innovación y el desarrollo tecnológico en la región.',
            research: ['Relaciones Universidad-Empresa', 'Innovación', 'Transferencia de Conocimiento', 'Producción Científica', 'Gestión de la Innovación'],
            scholar: 'https://scholar.google.com/citations?hl=en&user=c4HL8GsAAAAJ'
        },
        'elda-patricia-beltran-manzanero': {
            name: 'Dra. Elda Patricia Beltrán Manzanero',
            role: 'Investigadora',
            affiliation: 'Universidad Autónoma del Estado de Quintana Roo (UQROO)',
            img: 'assets/images/Dra.%20Elda%20Patricia%20Beltran%20Manzanero.jpeg',
            bio: 'Jefa del Departamento de Mercadotecnia y Negocios de la Universidad Autónoma del Estado de Quintana Roo e investigadora del grupo "Negocios, Mercadotecnia e Innovación". Fue galardonada con el Premio iQuatro Editores por su investigación sobre inteligencia emocional en estudiantes de negocios. Realizó una estancia académica en Japón (2019) en un programa de propiedad intelectual auspiciado por JICA, desarrollando investigación conjunta con el Osaka Institute of Technology. Es mentora del programa "Ellas en la Ciencia", impulsando la participación de niñas y jóvenes en STEM. Su investigación abarca la mercadotecnia, la innovación educativa y el emprendimiento con perspectiva de género.',
            research: ['Mercadotecnia', 'Innovación Educativa', 'Inteligencia Emocional', 'Emprendimiento', 'Propiedad Intelectual'],
            scholar: 'https://www.uqroo.mx/investigacion'
        }
    };

    // Open Speaker Modal
    const speakerCards = document.querySelectorAll('.expositor-card');
    speakerCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const speakerId = card.getAttribute('data-speaker');
            const speaker = speakersData[speakerId];
            if (speaker && speakerModalContent && speakerModal) {
                speakerModalContent.innerHTML = `
                    <div class="speaker-modal-header">
                        <img class="speaker-modal-avatar" src="${speaker.img}" alt="${speaker.name}">
                        <div class="speaker-modal-head">
                            <h2>${speaker.name}</h2>
                            <div class="speaker-role">${speaker.role}</div>
                            <div class="speaker-affiliation">${speaker.affiliation}</div>
                        </div>
                    </div>
                    <div class="speaker-modal-body">
                        <p>${speaker.bio}</p>
                        <div class="speaker-research">
                            ${speaker.research.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                        <a href="${speaker.scholar}" target="_blank" class="speaker-pub-link">
                            <i class="fa-solid fa-book-open"></i> Ver publicaciones académicas
                        </a>
                    </div>
                `;
                speakerModal.classList.add('active');
            }
        });
    });
});
