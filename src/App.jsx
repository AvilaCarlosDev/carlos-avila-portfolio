import { useState, useEffect } from 'react'
import './App.css'

// ============================================================
// TRANSLATIONS (i18n) - ES / EN
// ============================================================
const translations = {
  es: {
    nav: {
      about: 'Sobre mi',
      services: 'Servicios',
      stack: 'Stack',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Hola, soy',
      name: 'Carlos Avila',
      role: 'Developer',
      flag: '🇻🇪',
      description: 'Developer & Community Support Specialist en 4Geeks Academy. Combino desarrollo web, mentoria estudiantil, automatizacion con IA y soporte tecnico para crear soluciones digitales con impacto real.',
      cta_projects: 'Ver Proyectos',
      cta_contact: 'Contactar',
      scroll: 'Scroll para mas',
    },
    about: {
      title: 'Sobre Mi',
      p1: 'Soy un Developer venezolano apasionado por crear productos digitales que marquen la diferencia. Trabajo como Community & Public Support Specialist en 4Geeks Academy, donde acompano y mentorizo a estudiantes en su camino hacia el desarrollo profesional.',
      p2: 'Mi enfoque combina precision tecnica, comunicacion clara y aprendizaje continuo. Disfruto resolviendo problemas complejos, automatizando procesos con IA y construyendo experiencias web modernas con React y Node.js.',
      repos: 'Repos publicos',
      followers: 'Seguidores',
      coffee: 'Cafes consumidos',
    },
    services: {
      title: 'Servicios',
      subtitle: 'Soluciones completas desde el concepto hasta el deploy',
      s1_title: 'Landing Pages',
      s1_desc: 'Paginas de alto impacto optimizadas para conversion. Rapidas, responsive y con diseno que captura la esencia de tu marca.',
      s1_f1: 'Diseno personalizado',
      s1_f2: 'SEO optimizado',
      s1_f3: 'Deploy en Vercel/Netlify',
      s2_title: 'React Apps',
      s2_desc: 'Aplicaciones web modernas con React. UI componetizada, estado bien manejado y experiencia de usuario fluida.',
      s2_f1: 'Componentes reutilizables',
      s2_f2: 'Estado con hooks',
      s2_f3: 'Tailwind CSS',
      s3_title: 'Full Stack',
      s3_desc: 'Desarrollo completo frontend + backend. APIs REST, bases de datos y deploy en la nube.',
      s3_f1: 'APIs REST con Node.js',
      s3_f2: 'Bases de datos SQL/NoSQL',
      s3_f3: 'Deploy en Vercel/Railway',
      s4_title: 'IA & Automatizacion',
      s4_desc: 'Integracion de herramientas de IA y automatizacion de flujos de trabajo para maximizar productividad.',
      s4_f1: 'Chatbots y asistentes',
      s4_f2: 'Automatizacion de tareas',
      s4_f3: 'Claude / ChatGPT / Ollama',
    },
    stack: {
      title: 'Stack Tecnologico',
      subtitle: 'Tecnologias y herramientas que uso en el dia a dia',
      frontend: 'Frontend',
      backend: 'Backend & DB',
      tools: 'Herramientas',
      ai: 'IA & Automatizacion',
    },
    projects: {
      title: 'Proyectos Destacados',
      subtitle: 'Algunos de mis trabajos recientes',
      view: 'Ver Proyecto',
      code: 'Codigo',
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Conectemos y construyamos algo genial juntos',
      email: 'Email',
      location: 'Ubicacion',
      location_val: 'Venezuela',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    footer: {
      rights: 'Carlos Avila. Todos los derechos reservados.',
      role: 'Developer & Community Support Specialist',
    },
  },
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      stack: 'Stack',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Carlos Avila',
      role: 'Developer',
      flag: '🇻🇪',
      description: 'Developer & Community & Public Support Specialist at 4Geeks Academy. I combine web development, student mentoring, AI automation and technical support to create digital solutions with real impact.',
      cta_projects: 'View Projects',
      cta_contact: 'Contact',
      scroll: 'Scroll for more',
    },
    about: {
      title: 'About Me',
      p1: "I'm a Venezuelan Developer passionate about building digital products that make a difference. I work as Community & Public Support Specialist at 4Geeks Academy, where I guide and mentor students on their journey to professional development.",
      p2: 'My approach blends technical precision, clear communication and continuous learning. I enjoy solving complex problems, automating workflows with AI and building modern web experiences with React and Node.js.',
      repos: 'Public repos',
      followers: 'Followers',
      coffee: 'Coffees consumed',
    },
    services: {
      title: 'Services',
      subtitle: 'End-to-end solutions from concept to deploy',
      s1_title: 'Landing Pages',
      s1_desc: 'High-impact pages optimized for conversion. Fast, responsive and designed to capture your brand essence.',
      s1_f1: 'Custom design',
      s1_f2: 'SEO optimized',
      s1_f3: 'Deploy on Vercel/Netlify',
      s2_title: 'React Apps',
      s2_desc: 'Modern web apps with React. Componentized UI, well-managed state and smooth user experience.',
      s2_f1: 'Reusable components',
      s2_f2: 'State with hooks',
      s2_f3: 'Tailwind CSS',
      s3_title: 'Full Stack',
      s3_desc: 'Complete frontend + backend development. REST APIs, databases and cloud deploy.',
      s3_f1: 'REST APIs with Node.js',
      s3_f2: 'SQL/NoSQL databases',
      s3_f3: 'Deploy on Vercel/Railway',
      s4_title: 'AI & Automation',
      s4_desc: 'Integration of AI tools and workflow automation to maximize productivity.',
      s4_f1: 'Chatbots and assistants',
      s4_f2: 'Task automation',
      s4_f3: 'Claude / ChatGPT / Ollama',
    },
    stack: {
      title: 'Tech Stack',
      subtitle: 'Technologies and tools I use daily',
      frontend: 'Frontend',
      backend: 'Backend & DB',
      tools: 'Tools',
      ai: 'AI & Automation',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Some of my recent work',
      view: 'View Project',
      code: 'Code',
    },
    contact: {
      title: 'Contact',
      subtitle: "Let's connect and build something great together",
      email: 'Email',
      location: 'Location',
      location_val: 'Venezuela',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    footer: {
      rights: 'Carlos Avila. All rights reserved.',
      role: 'Developer & Community Support Specialist',
    },
  },
}

// ============================================================
// PROJECTS DATA
// ============================================================
const projects = [
  {
    title: 'GitHub Streak Keeper',
    emoji: '🟩',
    descEs: 'Scripts para mantener y visualizar la racha de contribuciones en GitHub de forma automatizada.',
    descEn: 'Scripts to maintain and visualize GitHub contribution streaks in an automated way.',
    tags: ['Python', 'GitHub API', 'Automation'],
    url: 'https://github.com/AvilaCarlosDev',
    urlCode: 'https://github.com/AvilaCarlosDev',
  },
  {
    title: 'Weather App',
    emoji: '⛅',
    descEs: 'Aplicacion del clima en tiempo real con API publica. Busqueda por ciudad, temperatura y pronostico.',
    descEn: 'Real-time weather app using a public API. Search by city, temperature and forecast.',
    tags: ['React', 'API REST', 'Tailwind CSS'],
    url: 'https://github.com/AvilaCarlosDev',
    urlCode: 'https://github.com/AvilaCarlosDev',
  },
  {
    title: 'Tienda de Muebles',
    emoji: '🪑',
    descEs: 'E-commerce completo con carrito de compras, catalogo de productos y diseno responsive moderno.',
    descEn: 'Full e-commerce with shopping cart, product catalog and modern responsive design.',
    tags: ['React', 'Node.js', 'CSS'],
    url: 'https://github.com/AvilaCarlosDev',
    urlCode: 'https://github.com/AvilaCarlosDev',
  },
  {
    title: 'Awesome Venezuela Dev',
    emoji: '🇻🇪',
    descEs: 'Repositorio colaborativo de recursos, herramientas y comunidades para developers venezolanos.',
    descEn: 'Collaborative repository of resources, tools and communities for Venezuelan developers.',
    tags: ['Open Source', 'Community', 'Markdown'],
    url: 'https://github.com/AvilaCarlosDev',
    urlCode: 'https://github.com/AvilaCarlosDev',
  },
]

// ============================================================
// MAIN APP
// ============================================================
function App() {
  const [visibleSections, setVisibleSections] = useState({})
  const [darkMode, setDarkMode] = useState(true)
  const [lang, setLang] = useState('es')
  const [menuOpen, setMenuOpen] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const html = document.documentElement
    if (darkMode) {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }
  }, [darkMode])

  const reveal = (id) => (visibleSections[id] ? 'visible' : '')

  return (
    <div className={`app-wrapper ${darkMode ? 'dark-mode' : 'light-mode'}`}>

      {/* NAVBAR */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" aria-label="Carlos Avila - Home">
            CA<span className="nav-logo-dot">.</span>
          </a>
          <ul className="nav-links" role="list">
            <li><a href="#sobre-mi" className="nav-link">{t.nav.about}</a></li>
            <li><a href="#servicios" className="nav-link">{t.nav.services}</a></li>
            <li><a href="#stack" className="nav-link">{t.nav.stack}</a></li>
            <li><a href="#proyectos" className="nav-link">{t.nav.projects}</a></li>
            <li><a href="#contacto" className="nav-link">{t.nav.contact}</a></li>
          </ul>
          <div className="nav-controls">
            <button
              className="btn-control"
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Espanol'}
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Espanol'}
            >
              <span className="control-icon">{lang === 'es' ? '🇺🇸' : '🇻🇪'}</span>
              <span className="control-label">{lang === 'es' ? 'EN' : 'ES'}</span>
            </button>
            <button
              className="btn-control"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              <span className="control-icon">{darkMode ? '☀️' : '🌙'}</span>
            </button>
            <button
              className="btn-control btn-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="control-icon">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <ul className="nav-mobile" role="list">
            {[
              ['#sobre-mi', t.nav.about],
              ['#servicios', t.nav.services],
              ['#stack', t.nav.stack],
              ['#proyectos', t.nav.projects],
              ['#contacto', t.nav.contact],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className={`hero-section ${reveal('hero')}`}>
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-content">
          <div className="hero-badge">{t.hero.greeting}</div>
          <h1 className="hero-title">
            <span className="gradient-text">{t.hero.name}</span>
          </h1>
          <h2 className="hero-subtitle">
            {t.hero.role} <span className="text-accent">{t.hero.flag}</span>
          </h2>
          <p className="hero-role-badge">
            Community &amp; Public Support Specialist &middot; 4Geeks Academy &middot; Mentor
          </p>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-ctas">
            <a href="#proyectos" className="btn btn-primary">{t.hero.cta_projects}</a>
            <a href="#contacto" className="btn btn-secondary">{t.hero.cta_contact}</a>
          </div>
          <div className="hero-scroll" aria-hidden="true">
            <span>&#8595; {t.hero.scroll}</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre-mi" className={`about-section fade-section ${reveal('sobre-mi')}`}>
        <div className="container">
          <h2 className="section-title">{t.about.title}</h2>
          <div className="about-grid">
            <div className="about-image slide-left">
              <div className="image-wrapper">
                <img
                  src="https://avatars.githubusercontent.com/u/183245483?v=4"
                  alt="Carlos Avila - Developer"
                  className="profile-photo"
                  loading="lazy"
                  width="280"
                  height="280"
                />
              </div>
            </div>
            <div className="about-content slide-right">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <div className="about-tags">
                {['React', 'Node.js', 'IA', 'Mentor', '4Geeks Academy', 'Open Source'].map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="about-stats">
                <div className="stat"><span className="stat-number">28</span><span className="stat-label">{t.about.repos}</span></div>
                <div className="stat"><span className="stat-number">21</span><span className="stat-label">{t.about.followers}</span></div>
                <div className="stat"><span className="stat-number">∞</span><span className="stat-label">{t.about.coffee}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className={`services-section fade-section ${reveal('servicios')}`}>
        <div className="container">
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
          <div className="services-grid">
            {[
              { icon: '🌐', title: t.services.s1_title, desc: t.services.s1_desc, features: [t.services.s1_f1, t.services.s1_f2, t.services.s1_f3] },
              { icon: '⚛️', title: t.services.s2_title, desc: t.services.s2_desc, features: [t.services.s2_f1, t.services.s2_f2, t.services.s2_f3] },
              { icon: '🔧', title: t.services.s3_title, desc: t.services.s3_desc, features: [t.services.s3_f1, t.services.s3_f2, t.services.s3_f3] },
              { icon: '🤖', title: t.services.s4_title, desc: t.services.s4_desc, features: [t.services.s4_f1, t.services.s4_f2, t.services.s4_f3] },
            ].map((s, i) => (
              <article key={i} className="service-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="service-icon" aria-hidden="true">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="service-features">
                  {s.features.map((f, fi) => <li key={fi}>✓ {f}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className={`stack-section fade-section ${reveal('stack')}`}>
        <div className="container">
          <h2 className="section-title">{t.stack.title}</h2>
          <p className="section-subtitle">{t.stack.subtitle}</p>
          <div className="stack-grid">
            <div className="stack-category">
              <h3 className="stack-cat-title"><span className="stack-cat-icon">🎨</span> {t.stack.frontend}</h3>
              <div className="stack-items">
                {['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3'].map((item) => (
                  <span key={item} className="stack-item">{item}</span>
                ))}
              </div>
            </div>
            <div className="stack-category">
              <h3 className="stack-cat-title"><span className="stack-cat-icon">⚙️</span> {t.stack.backend}</h3>
              <div className="stack-items">
                {['Node.js', 'Python', 'Express', 'REST APIs', 'PostgreSQL', 'MongoDB', 'MySQL'].map((item) => (
                  <span key={item} className="stack-item">{item}</span>
                ))}
              </div>
            </div>
            <div className="stack-category">
              <h3 className="stack-cat-title"><span className="stack-cat-icon">🛠️</span> {t.stack.tools}</h3>
              <div className="stack-items">
                {['Git', 'GitHub', 'Vercel', 'Railway', 'VS Code', 'Linux', 'Docker'].map((item) => (
                  <span key={item} className="stack-item">{item}</span>
                ))}
              </div>
            </div>
            <div className="stack-category stack-ai">
              <h3 className="stack-cat-title"><span className="stack-cat-icon">🤖</span> {t.stack.ai}</h3>
              <div className="stack-items">
                {['Claude Code', 'ChatGPT', 'Ollama', 'OpenClaw', 'Cursor', 'GitHub Copilot'].map((item) => (
                  <span key={item} className="stack-item stack-item-ai">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="proyectos" className={`projects-section fade-section ${reveal('proyectos')}`}>
        <div className="container">
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <article key={i} className="project-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="project-emoji" aria-hidden="true">{p.emoji}</div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{lang === 'es' ? p.descEs : p.descEn}</p>
                <div className="project-tags">
                  {p.tags.map((tag) => <span key={tag} className="project-tag">{tag}</span>)}
                </div>
                <div className="project-links">
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">{t.projects.view}</a>
                  <a href={p.urlCode} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">{t.projects.code}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className={`contact-section fade-section ${reveal('contacto')}`}>
        <div className="container">
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">📧</span>
                <div>
                  <strong>{t.contact.email}</strong>
                  <a href="mailto:avilacarlosdev@gmail.com" className="contact-link">avilacarlosdev@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">📍</span>
                <div>
                  <strong>{t.contact.location}</strong>
                  <span>{t.contact.location_val}</span>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">💼</span>
                <div>
                  <strong>{t.contact.linkedin}</strong>
                  <a href="https://linkedin.com/in/avilacarlosdev" target="_blank" rel="noopener noreferrer" className="contact-link">linkedin.com/in/avilacarlosdev</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">🐙</span>
                <div>
                  <strong>{t.contact.github}</strong>
                  <a href="https://github.com/AvilaCarlosDev" target="_blank" rel="noopener noreferrer" className="contact-link">github.com/AvilaCarlosDev</a>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <div className="cta-card">
                <div className="cta-icon" aria-hidden="true">🚀</div>
                <h3>{lang === 'es' ? 'Tienes un proyecto en mente?' : 'Have a project in mind?'}</h3>
                <p>{lang === 'es' ? 'Disponible para proyectos freelance, colaboraciones y oportunidades de trabajo.' : "Available for freelance projects, collaborations and job opportunities."}</p>
                <a href="mailto:avilacarlosdev@gmail.com" className="btn btn-primary btn-full">
                  {lang === 'es' ? 'Enviar Email' : 'Send Email'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="footer-logo">CA<span className="text-accent">.</span></span>
              <p className="footer-role">{t.footer.role}</p>
            </div>
            <div className="footer-links">
              <a href="https://github.com/AvilaCarlosDev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
              <a href="https://linkedin.com/in/avilacarlosdev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
              <a href="mailto:avilacarlosdev@gmail.com" aria-label="Email">Email</a>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} {t.footer.rights}</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
