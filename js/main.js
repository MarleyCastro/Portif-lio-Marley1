// ==================== MAIN JAVASCRIPT ====================
// Arquivo principal com toda a lógica da aplicação

// ==================== LOAD DATA ====================

/**
 * Carrega os dados do arquivo JSON ou usa fallback
 */
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar dados do JSON');
        }
        portfolioData = await response.json();
        console.log('✅ Dados carregados do JSON com sucesso!');
        return portfolioData;
    } catch (error) {
        console.warn('⚠️ Não foi possível carregar data.json, usando dados embutidos:', error.message);
        portfolioData = FALLBACK_DATA;
        return portfolioData;
    }
}

// ==================== RENDER FUNCTIONS ====================

/**
 * Renderiza as Hard Skills na página
 */
function renderHardSkills() {
    const container = document.getElementById('skills-container');
    if (!container || !portfolioData) return;

    container.innerHTML = '';

    portfolioData.hardSkills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="skill-icon">
                <img src="${skill.icon}" 
                     alt="${skill.name}" 
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22%3E%3Crect fill=%22%2300D9A3%22 width=%2260%22 height=%2260%22 rx=%2210%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2230%22 fill=%22white%22%3E${skill.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
            </div>
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            <div class="skill-progress">
                <div class="progress-bar" style="width: 0%" data-progress="${skill.progress}%"></div>
            </div>
        `;
        container.appendChild(card);
    });
}

/**
 * Renderiza as Soft Skills na página
 */
function renderSoftSkills() {
    const container = document.getElementById('soft-skills-container');
    if (!container || !portfolioData) return;

    container.innerHTML = '';

    portfolioData.softSkills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
        `;
        container.appendChild(card);
    });
}

/**
 * Renderiza os projetos do portfolio
 */
function renderPortfolio() {
    const container = document.getElementById('portfolio-container');
    if (!container || !portfolioData) return;

    container.innerHTML = '';

    portfolioData.projects.forEach(project => {
        const link = document.createElement('a');
        link.href = project.link;
        link.target = '_blank';
        link.style.textDecoration = 'none';
        link.style.color = 'inherit';

        link.innerHTML = `
            <div class="portfolio-card">
                <img src="${project.image}" 
                     alt="${project.title}" 
                     class="portfolio-image"
                     onerror="this.src='https://via.placeholder.com/400x250/0A0E27/00D9A3?text=${encodeURIComponent(project.title)}'">
                <div class="portfolio-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            </div>
        `;

        container.appendChild(link);
    });
}

// ==================== MENU TOGGLE ====================

/**
 * Abre/fecha o menu mobile
 */
function toggleMenu() {
    const nav = document.getElementById('nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// ==================== SMOOTH SCROLL ====================

/**
 * Implementa scroll suave para links âncora
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Fecha o menu mobile após clicar
                const nav = document.getElementById('nav');
                if (nav) {
                    nav.classList.remove('active');
                }
            }
        });
    });
}

// ==================== HEADER SCROLL EFFECT ====================

/**
 * Adiciona efeito no header ao rolar a página
 */
function setupHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '1rem 5%';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.padding = '1.5rem 5%';
            header.style.boxShadow = 'none';
        }
    });
}

// ==================== PROGRESS BAR ANIMATION ====================

/**
 * Anima as barras de progresso quando entram na viewport
 */
function setupProgressAnimation() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-progress');

                // Reset e anima
                progressBar.style.width = '0%';

                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);

                // Para de observar após animar
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    // Observa todas as barras de progresso após um delay
    setTimeout(() => {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            observer.observe(bar);
        });
    }, 500);
}

// ==================== FORM VALIDATION ====================

/**
 * Valida o formulário de contato
 */
function setupFormValidation() {
    const form = document.querySelector('.contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Pega os valores do formulário
            const name = form.querySelector('input[type="text"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const projectType = form.querySelector('select').value;
            const message = form.querySelector('textarea')?.value || '';

            // Validação básica
            if (!name || !phone || !projectType) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }

            // Monta a mensagem para WhatsApp
            const whatsappMessage = encodeURIComponent(
                `Olá! Meu nome é ${name}.\n` +
                `Telefone: ${phone}\n` +
                `Tipo de Projeto: ${projectType}\n` +
                `${message ? 'Mensagem: ' + message : ''}`
            );

            // Redireciona para WhatsApp
            const whatsappNumber = portfolioData?.contact?.whatsapp || '5511976168002';
            window.open(
                `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
                '_blank'
            );

            // Limpa o formulário
            form.reset();
        });
    }
}

// ==================== LOADING ANIMATION ====================

/**
 * Adiciona animação de fade-in aos elementos
 */
function setupFadeInAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todos os cards
    document.querySelectorAll('.skill-card, .portfolio-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// ==================== ACTIVE NAV LINK ====================

/**
 * Marca o link de navegação ativo baseado na seção visível
 */
function setupActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== WHATSAPP PULSE ANIMATION ====================

/**
 * Adiciona animação de pulso no botão do WhatsApp
 */
function setupWhatsAppPulse() {
    const whatsappBtn = document.querySelector('.whatsapp-float');

    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.style.animation = 'pulse 1s ease';

            setTimeout(() => {
                whatsappBtn.style.animation = '';
            }, 1000);
        }, 5000);
    }
}

// ==================== PRELOAD IMAGES ====================

/**
 * Pré-carrega imagens importantes
 */
function preloadImages() {
    if (!portfolioData) return;

    const images = [
        'img/profile/foto-perfil.png',
        ...portfolioData.projects.slice(0, 6).map(p => p.image)
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ==================== LOADING INDICATOR ====================

/**
 * Mostra indicador de carregamento
 */
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(10, 14, 39, 0.95); display: flex; 
                    align-items: center; justify-content: center; z-index: 9999;">
            <div style="text-align: center;">
                <div class="spinner" style="width: 50px; height: 50px; border: 5px solid rgba(0, 217, 163, 0.2); 
                     border-top-color: #00D9A3; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                <p style="color: #00D9A3; margin-top: 20px; font-size: 1.2rem;">
                    Carregando portfolio...
                </p>
            </div>
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

/**
 * Remove indicador de carregamento
 */
function hideLoading() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
        loadingDiv.style.opacity = '0';
        loadingDiv.style.transition = 'opacity 0.3s';
        setTimeout(() => loadingDiv.remove(), 300);
    }
}

// ==================== INITIALIZE ====================

/**
 * Inicializa todas as funcionalidades quando o DOM estiver pronto
 */
async function initializePortfolio() {
    // Mostra loading
    showLoading();

    try {
        // Carrega os dados do JSON (ou usa fallback)
        await loadPortfolioData();

        if (!portfolioData) {
            throw new Error('Falha ao carregar dados');
        }

        // Renderiza o conteúdo
        renderHardSkills();
        renderSoftSkills();
        renderPortfolio();

        // Configura funcionalidades
        setupSmoothScroll();
        setupHeaderScroll();
        setupProgressAnimation();
        setupFormValidation();
        setupFadeInAnimation();
        setupActiveNavLink();
        setupWhatsAppPulse();

        // Pré-carrega imagens
        preloadImages();

        // Remove loading
        setTimeout(() => {
            hideLoading();
        }, 500);

        console.log('✅ Portfolio inicializado com sucesso! 🚀');
    } catch (error) {
        console.error('❌ Erro ao inicializar portfolio:', error);
        hideLoading();

        // Tenta usar dados fallback
        if (!portfolioData) {
            console.log('🔄 Tentando usar dados de fallback...');
            portfolioData = FALLBACK_DATA;
            renderHardSkills();
            renderSoftSkills();
            renderPortfolio();
        }
    }
}

// ==================== EVENT LISTENERS ====================

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    // DOM já está pronto
    initializePortfolio();
}

// Recarrega em caso de redimensionamento (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('📱 Viewport redimensionado');
    }, 250);
});

// Log de erros
window.addEventListener('error', (e) => {
    console.error('❌ Erro capturado:', e.message, e.filename, e.lineno);
});

// Adiciona CSS para o spinner se não existir
if (!document.querySelector('#spinner-style')) {
    const style = document.createElement('style');
    style.id = 'spinner-style';
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}