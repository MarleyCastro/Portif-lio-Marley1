
// Variável global para armazenar os dados
let portfolioData = null;

// ==================== DADOS FALLBACK ====================
// Dados embutidos caso o JSON não carregue
const FALLBACK_DATA = {
  "hardSkills": [
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      "name": "HTML5",
      "description": "Estruturação semântica e acessível",
      "progress": 90
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      "name": "CSS3",
      "description": "Estilização avançada e animações",
      "progress": 90
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      "name": "JavaScript",
      "description": "Programação interativa e dinâmica",
      "progress": 80
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      "name": "React",
      "description": "Desenvolvimento de interfaces modernas",
      "progress": 75
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      "name": "Java",
      "description": "Desenvolvimento back-end robusto",
      "progress": 75
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
      "name": "Spring Boot",
      "description": "APIs REST e microserviços",
      "progress": 70
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      "name": "MySQL",
      "description": "Banco de dados relacional",
      "progress": 70
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      "name": "Git",
      "description": "Controle de versão",
      "progress": 85
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      "name": "GitHub",
      "description": "Colaboração e versionamento",
      "progress": 85
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      "name": "Node.js",
      "description": "Desenvolvimento server-side",
      "progress": 70
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      "name": "Python",
      "description": "Scripts e automação",
      "progress": 65
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      "name": "Postman",
      "description": "Testes de API",
      "progress": 80
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      "name": "AWS",
      "description": "Cloud computing",
      "progress": 60
    },
    {
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
      "name": "Bootstrap",
      "description": "Framework CSS responsivo",
      "progress": 85
    }
  ],
  "softSkills": [
    {
      "icon": "💬",
      "name": "Comunicação",
      "description": "Habilidade de comunicar ideias de forma clara e efetiva"
    },
    {
      "icon": "🤝",
      "name": "Trabalho em Equipe",
      "description": "Colaboração eficaz em ambientes diversos"
    },
    {
      "icon": "🎯",
      "name": "Comprometimento",
      "description": "Dedicação total aos projetos e objetivos"
    },
    {
      "icon": "⛪",
      "name": "Trabalho Voluntário",
      "description": "Experiência em liderança comunitária na igreja"
    },
    {
      "icon": "🧠",
      "name": "Resolução de Problemas",
      "description": "Pensamento crítico e soluções criativas"
    },
    {
      "icon": "📚",
      "name": "Aprendizado Contínuo",
      "description": "Sempre buscando novos conhecimentos"
    }
  ],
  "projects": [
    {
      "id": 1,
      "title": "Sistema de Estacionamento",
      "description": "Sistema completo de gerenciamento de vagas",
      "image": "img/portfolio/sistema-vagas.png",
      "link": "https://marleycastro.github.io/sistema-estacionamento/",
      "github": "https://github.com/MarleyCastro/sistema-estacionamento",
      "tags": ["HTML", "CSS", "JavaScript"],
      "featured": true,
      "date": "2024-12"
    },
    {
      "id": 2,
      "title": "Jobs Worker Vibe Coder",
      "description": "Plataforma de gerenciamento de trabalhos",
      "image": "img/portfolio/jobs-worker.png",
      "link": "https://github.com/MarleyCastro/JobWoker",
      "github": "https://github.com/MarleyCastro/JobWoker",
      "tags": ["Node.js", "Express", "MongoDB"],
      "featured": true,
      "date": "2024-11"
    },
    {
      "id": 3,
      "title": "Chat Real Time",
      "description": "Aplicação de chat em tempo real",
      "image": "img/portfolio/chat-realtime.png",
      "link": "https://github.com/MarleyCastro/Chat-Real-Time",
      "github": "https://github.com/MarleyCastro/Chat-Real-Time",
      "tags": ["Socket.io", "React", "Node.js"],
      "featured": true,
      "date": "2024-10"
    },
    {
      "id": 4,
      "title": "TechMarket",
      "description": "E-commerce de tecnologia",
      "image": "img/portfolio/tech-market.png",
      "link": "https://github.com/MarleyCastro/Tech-Marcket",
      "github": "https://github.com/MarleyCastro/Tech-Marcket",
      "tags": ["React", "API", "CSS"],
      "featured": false,
      "date": "2024-09"
    },
    {
      "id": 5,
      "title": "To Do List",
      "description": "Aplicativo de gerenciamento de tarefas",
      "image": "img/portfolio/todo-list.png",
      "link": "https://marleycastro.github.io/ListaApp/",
      "github": "https://github.com/MarleyCastro/ListaApp",
      "tags": ["JavaScript", "LocalStorage"],
      "featured": false,
      "date": "2024-08"
    },
    {
      "id": 6,
      "title": "Gerador de Senha",
      "description": "Ferramenta para criar senhas seguras",
      "image": "img/portfolio/gerador-senha.png",
      "link": "https://marleycastro.github.io/Gerador-de-senha/",
      "github": "https://github.com/MarleyCastro/Gerador-de-senha",
      "tags": ["JavaScript", "Security"],
      "featured": false,
      "date": "2024-07"
    },
    {
      "id": 7,
      "title": "QRCode Generator",
      "description": "Gerador de códigos QR personalizados",
      "image": "img/portfolio/qrcode.png",
      "link": "https://marleycastro.github.io/QRcreate/",
      "github": "https://github.com/MarleyCastro/QRcreate",
      "tags": ["JavaScript", "API"],
      "featured": false,
      "date": "2024-06"
    },
    {
      "id": 8,
      "title": "Projeto Barbearia",
      "description": "Website institucional para barbearia",
      "image": "img/portfolio/barbearia.png",
      "link": "https://marleycastro.github.io/Barbearia-app/",
      "github": "https://github.com/MarleyCastro/Barbearia-app",
      "tags": ["HTML", "CSS", "Design"],
      "featured": false,
      "date": "2024-05"
    },
    {
      "id": 9,
      "title": "LinkTree Clone",
      "description": "Clone da plataforma LinkTree",
      "image": "img/portfolio/linktree.png",
      "link": "https://marleycastro.github.io/Rocketseat/",
      "github": "https://github.com/MarleyCastro/Rocketseat",
      "tags": ["HTML", "CSS"],
      "featured": false,
      "date": "2024-04"
    },
    {
      "id": 10,
      "title": "Youtube Clone",
      "description": "Interface clone do YouTube",
      "image": "img/portfolio/youtube-clone.png",
      "link": "https://marleycastro.github.io/Clone-Youtube/",
      "github": "https://github.com/MarleyCastro/Clone-Youtube",
      "tags": ["HTML", "CSS", "JavaScript"],
      "featured": false,
      "date": "2024-03"
    },
    {
      "id": 11,
      "title": "Google Clone",
      "description": "Clone da página inicial do Google",
      "image": "img/portfolio/google-clone.png",
      "link": "https://marleycastro.github.io/Projeto-google/#",
      "github": "https://github.com/MarleyCastro/Projeto-google",
      "tags": ["HTML", "CSS"],
      "featured": false,
      "date": "2024-02"
    },
    {
      "id": 12,
      "title": "Projeto Advocacia",
      "description": "Website para escritório de advocacia",
      "image": "img/portfolio/advocacia.png",
      "link": "https://marleycastro.github.io/Escrit-rio-de-Advoc-cia-2.0-/",
      "github": "https://github.com/MarleyCastro/Escrit-rio-de-Advoc-cia-2.0-",
      "tags": ["HTML", "CSS", "Design"],
      "featured": false,
      "date": "2024-01"
    }
  ],
    "contact": {
    "email": "marley.castro@example.com",
    "phone": "+55 11 97616-8002",
    "whatsapp": "5511976168002",
    "github": "https://github.com/MarleyCastro",
    "linkedin": "https://linkedin.com/in/marleycastro",
    "location": "São Paulo, SP - Brasil"
  },
  "personal": {
    "name": "Marley Castro",
    "title": "Full Stack Developer",
    "profileImage": "img/profile/foto-marley.png",
    "bio": "Desenvolvedor de tecnologia com mais de 2 anos de dedicação intensa à área, sempre motivado pela curiosidade e paixão por inovação.",
    "yearsOfExperience": 2,
    "projectsCompleted": 12,
    "happyClients": 8
  }
};
