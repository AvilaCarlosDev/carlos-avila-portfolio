import { useState, useEffect, useRef } from 'react'
import './App.css'

// ============================================================
// CARLOS AVILA PORTFOLIO - COMPLETE REDESIGN v2.0
// Developer | Mentor | Community & Public Support Specialist
// ============================================================

const PROJECTS = [
  {
    id: 1,
    title: 'AI Chat Interface',
    description: 'Interfaz de chat moderna con LLMs locales. Construida con React + Flask, soporta streaming y múltiples modelos de IA.',
    tags: ['React', 'Flask', 'Python', 'Ollama', 'AI'],
    github: 'https://github.com/AvilaCarlosDev',
    demo: null,
    featured: true,
    type: 'personal',
  },
  {
    id: 2,
    title: 'Portfolio v2',
    description: 'Este portfolio — construido con React 19, Vite, Tailwind CSS v4 y animaciones CSS personalizadas.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'CSS Animations'],
    github: 'https://github.com/AvilaCarlosDev/carlos-avila-portfolio',
    demo: 'https://carlos-avila-portfolio.vercel.app',
    featured: true,
    type: 'personal',
  },
  {
    id: 3,
    title: 'Landing Page Builder',
    description: 'Plantillas de landing pages optimizadas para conversión con deploy en un click a Vercel o Netlify.',
    tags: ['React', 'Node.js', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/AvilaCarlosDev',
    demo: null,
    featured: true,
    type: 'client',
  },
  {
    id: 4,
    title: '4Geeks Support Dashboard',
    description: 'Herramienta interna para tracking de estudiantes, tickets de soporte e interacciones en 4Geeks Academy.',
    tags: ['React', 'REST API', 'JavaScript', 'CSS'],
    github: 'https://github.com/AvilaCarlosDev',
    demo: null,
    featured: false,
    type: 'client',
  },
]

const AI_LAB = [
  {
    id: 1,
    icon: '🤖',
    title: 'Local LLM Workflows',
    description: 'Experimentos con Ollama, LM Studio y modelos locales. Construyendo herramientas de IA offline-first que funcionan sin APIs en la nube.',
    descriptionEn: 'Experiments with Ollama, LM Studio and local models. Building offline-first AI tools that work without cloud APIs.',
    tags: ['Ollama', 'LM Studio', 'Python', 'Local AI'],
    status: 'active',
  },
  {
    id: 2,
    icon: '⚡',
    title: 'Automation Pipelines',
    description: 'Automatización de tareas usando agentes de IA, workflows de n8n y scripts personalizados de Python. Desde generación de contenido hasta procesamiento de datos.',
    descriptionEn: 'Task automation using AI agents, n8n workflows and custom Python scripts. From content generation to data processing.',
    tags: ['n8n', 'Python', 'Claude API', 'Automation'],
    status: 'active',
  },
  {
    id: 3,
    icon: '💬',
    title: 'Prompt Engineering Lab',
    description: 'Testing sistemático de prompts, chaining y optimización. Construyendo plantillas de prompts reutilizables para flujos de desarrollo y contenido.',
    descriptionEn: 'Systematic prompt testing, chaining and optimization. Building reusable prompt templates for development and content workflows.',
    tags: ['Prompt Engineering', 'Claude', 'ChatGPT', 'Templates'],
    status: 'building',
  },
  {
    id: 4,
    icon: '🔧',
    title: 'AI-Powered Dev Tools',
    description: 'Explorando cómo la IA puede acelerar el desarrollo: bots de revisión de código, generadores de documentación y configuraciones inteligentes de autocompletado.',
    descriptionEn: 'Exploring how AI can accelerate development: code review bots, documentation generators and smart code completion setups.',
    tags: ['GitHub Copilot', 'Continue.dev', 'Cursor', 'VS Code'],
    status: 'exploring',
  },
]

const TECH_STACK = {
  Frontend: [
    { name: 'JavaScript', icon: '🟨' },
    { name: 'React', icon: '⚛️' },
    { name: 'HTML5', icon: '🧱' },
    { name: 'CSS3', icon: '🎨' },
    { name: 'Tailwind CSS', icon: '💨' },
    { name: 'Vite', icon: '⚡' },
  ],
  Backend: [
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Flask', icon: '🌶️' },
    { name: 'REST APIs', icon: '🔌' },
    { name: 'SQL', icon: '🗄️' },
  ],
  Tools: [
    { name: 'Git', icon: '🌿' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'Vercel', icon: '▲' },
    { name: 'VS Code', icon: '💙' },
    { name: 'Linux', icon: '🐧' },
  ],
  AI: [
    { name: 'Claude API', icon: '🧠' },
    { name: 'Ollama', icon: '🦙' },
    { name: 'ChatGPT', icon: '💬' },
    { name: 'n8n', icon: '🔗' },
    { name: 'LangChain', icon: '🔗' },
  ],
}

const EXPERIENCE = [
  {
    period: '2023 — Presente',
    periodEn: '2023 — Present',
    role: 'Community & Public Support Specialist',
    company: '4Geeks Academy',
    companyUrl: 'https://4geeks.com',
    description: 'Apoyando a una comunidad global de desarrolladores y estudiantes. Gestiono soporte técnico a través de canales digitales, reviso proyectos de estudiantes, guío a los estudiantes en desafíos de código y ayudo a mantener una experiencia de aprendizaje positiva y de alta calidad.',
    descriptionEn: 'Supporting a global community of developers and learners. I manage technical support across digital channels, review student projects, guide learners through coding challenges and help maintain a positive, high-quality learning experience.',
    tags: ['Community Support', 'Student Mentoring', 'Technical Assistance', 'Project Review', 'Communication'],
  },
  {
    period: '2023 — Presente',
    periodEn: '2023 — Present',
    role: 'Mentor & Technical Guide',
    company: '4Geeks Academy',
    companyUrl: 'https://4geeks.com',
    description: 'Mentoreando estudiantes en desarrollo web — desde fundamentos hasta proyectos full-stack. Proporciono revisiones de código, sesiones de debug, feedback de proyectos y orientación profesional. Ayudo a los estudiantes a construir confianza y habilidades profesionales.',
    descriptionEn: 'Mentoring students in web development — from fundamentals to full-stack projects. I provide code reviews, debug sessions, project feedback and career guidance. I help learners build confidence and professional skills.',
    tags: ['Mentorship', 'Code Review', 'Web Development', 'Learner Support', 'Career Guidance'],
  },
  {
    period: '2022 — Presente',
    periodEn: '2022 — Present',
    role: 'Freelance Developer',
    company: 'Independent',
    companyUrl: null,
    description: 'Construyendo soluciones web personalizadas para clientes: landing pages, aplicaciones React, scripts de automatización y herramientas digitales. Enfocado en código limpio, entrega rápida e impacto real para pequeños negocios y creadores.',
    descriptionEn: 'Building custom web solutions for clients: landing pages, React apps, automation scripts and digital tools. Focused on clean code, fast delivery and real impact for small businesses and creators.',
    tags: ['React', 'Node.js', 'Landing Pages', 'Automation', 'Freelance'],
  },
]

// ── HOOKS ─────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function useTypewriter(texts, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[idx]
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed)
      setDisplayed(current.slice(0, charIdx + 1))
      return () => clearTimeout(t)
    } else if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    } else if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
      setDisplayed(current.slice(0, charIdx - 1))
      return () => clearTimeout(t)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setIdx((i) => (i + 1) % texts.length)
    }
  }, [charIdx, deleting, idx, texts, speed, pause])

  return displayed
}

// ── COMPONENTS ────────────────────────────────────────────

function Navbar({ theme, toggleTheme, lang, toggleLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = {
    es: [
      { href: '#about', label: 'Sobre Mí' },
      { href: '#experience', label: 'Experiencia' },
      { href: '#projects', label: 'Proyectos' },
      { href: '#ai-lab', label: 'AI Lab' },
      { href: '#mentorship', label: 'Mentoría' },
      { href: '#stack', label: 'Stack' },
      { href: '#contact', label: 'Contacto' },
    ],
    en: [
      { href: '#about', label: 'About' },
      { href: '#experience', label: 'Experience' },
      { href: '#projects', label: 'Projects' },
      { href: '#ai-lab', label: 'AI Lab' },
      { href: '#mentorship', label: 'Mentorship' },
      { href: '#stack', label: 'Stack' },
      { href: '#contact', label: 'Contact' },
    ],
  }

  const handleNav = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner container">
        <a href="#" className="nav-logo" aria-label="Carlos Avila - Home" onClick={(e) => handleNav(e, '#hero')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">CA</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`} role="list">
          {links[lang].map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link" onClick={(e) => handleNav(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            className="lang-btn"
            onClick={toggleLang}
            aria-label={`Switch to ${lang === 'es' ? 'English' : 'Español'}`}
            title={`${lang === 'es' ? 'English' : 'Español'}`}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

function Hero({ lang }) {
  const rolesEs = useTypewriter(['Developer', 'Mentor', 'Community Specialist', 'AI Explorer', 'Problem Solver'])
  const rolesEn = useTypewriter(['Desarrollador', 'Mentor', 'Community Specialist', 'Explorador de IA', 'Resolvedor de Problemas'])
  const roles = lang === 'es' ? rolesEs : rolesEn

  const t = {
    es: {
      available: 'Disponible para proyectos',
      imA: 'Soy un',
      desc: 'Desarrollador, mentor y especialista en tecnología comunitaria enfocado en construir experiencias web útiles, apoyar estudiantes y explorar flujos de trabajo modernos con IA.',
      venezuela: 'Venezuela',
      geeks: '4Geeks Academy',
      open: 'Abierto a oportunidades',
      viewWork: 'Ver Mi Trabajo',
      contact: 'Contáctame',
    },
    en: {
      available: 'Available for projects',
      imA: 'I\'m a',
      desc: 'Developer, mentor and community tech specialist focused on building useful web experiences, supporting learners, and exploring modern AI-powered workflows.',
      venezuela: 'Venezuela',
      geeks: '4Geeks Academy',
      open: 'Open to opportunities',
      viewWork: 'View My Work',
      contact: 'Get In Touch',
    },
  }

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid"></div>
        <div className="hero-glow glow-1"></div>
        <div className="hero-glow glow-2"></div>
        <div className="hero-orb"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-badge reveal">
          <span className="badge-dot"></span>
          <span>{t[lang].available}</span>
        </div>

        <h1 className="hero-name reveal reveal-delay-1">
          Carlos <span className="accent-gradient">Avila</span>
        </h1>

        <div className="hero-role reveal reveal-delay-2" aria-live="polite">
          <span className="role-prefix">{t[lang].imA} </span>
          <span className="role-typed">{roles}</span>
          <span className="cursor" aria-hidden="true">|</span>
        </div>

        <p className="hero-desc reveal reveal-delay-3">
          {t[lang].desc}
        </p>

        <div className="hero-meta reveal reveal-delay-4">
          <span className="meta-item">
            <span aria-hidden="true">📍</span> {t[lang].venezuela}
          </span>
          <span className="meta-sep" aria-hidden="true">·</span>
          <span className="meta-item">
            <span aria-hidden="true">🏢</span> {t[lang].geeks}
          </span>
          <span className="meta-sep" aria-hidden="true">·</span>
          <span className="meta-item">
            <span aria-hidden="true">🟢</span> {t[lang].open}
          </span>
        </div>

        <div className="hero-cta reveal reveal-delay-5">
          <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }) }}>
            {t[lang].viewWork}
            <span aria-hidden="true">→</span>
          </a>
          <a href="#contact" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) }}>
            {t[lang].contact}
          </a>
        </div>

        <div className="hero-social reveal reveal-delay-5" aria-label="Social links">
          <a href="https://github.com/AvilaCarlosDev" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub profile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/avilacarlosdev" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn profile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </div>

      <div className="scroll-indicator reveal reveal-delay-5" aria-hidden="true">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
function About({ lang }) {
  const t = {
    es: {
      label: 'Sobre Mí',
      heading: 'Construyendo cosas que <span class="accent-gradient">importan</span>',
      p1: 'Soy un desarrollador de Venezuela apasionado por crear productos digitales que resuelven problemas reales. Actualmente trabajo como <strong>Community & Public Support Specialist en 4Geeks Academy</strong>, donde apoyo y guío a estudiantes en su camino con el código.',
      p2: 'Mi trabajo está en la intersección de la ingeniería y la educación. Ayudo a los estudiantes a depurar código, entender conceptos, revisar proyectos y construir confianza. Al mismo tiempo, sigo construyendo — landing pages, aplicaciones web, herramientas de automatización y experimentos con IA.',
      p3: 'Estoy particularmente interesado en cómo la IA está remodelando los flujos de trabajo de desarrollo. Exploro LLMs locales, pipelines de automatización, prompt engineering y herramientas basadas en agentes como parte de mis proyectos personales.',
      years: 'Años en 4Geeks',
      students: 'Estudiantes Apoyados',
      projects: 'Proyectos Construidos',
      currently: 'Actualmente',
      role: 'Community & Public Support Specialist',
      company: '@ 4Geeks Academy',
    },
    en: {
      label: 'About',
      heading: 'Building things that <span class="accent-gradient">matter</span>',
      p1: 'I\'m a developer from Venezuela passionate about creating digital products that solve real problems. Currently I work as <strong>Community & Public Support Specialist at 4Geeks Academy</strong>, where I support and guide students across their coding journey.',
      p2: 'My work sits at the intersection of engineering and education. I help learners debug code, understand concepts, review projects and build confidence. At the same time, I keep building — landing pages, web apps, automation tools and AI experiments.',
      p3: 'I\'m particularly interested in how AI is reshaping developer workflows. I explore local LLMs, automation pipelines, prompt engineering and agent-based tools as part of my personal projects.',
      years: 'Years at 4Geeks',
      students: 'Students Supported',
      projects: 'Projects Built',
      currently: 'Currently',
      role: 'Community & Public Support Specialist',
      company: '@ 4Geeks Academy',
    },
  }

  return (
    <section id="about" className="section" aria-label="About me">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <p className="section-label reveal">{t[lang].label}</p>
            <h2 className="section-heading reveal reveal-delay-1" dangerouslySetInnerHTML={{ __html: t[lang].heading }} />
            <p className="about-p reveal reveal-delay-2" dangerouslySetInnerHTML={{ __html: t[lang].p1 }} />
            <p className="about-p reveal reveal-delay-3">{t[lang].p2}</p>
            <p className="about-p reveal reveal-delay-4">{t[lang].p3}</p>
            <div className="about-tags reveal reveal-delay-5">
              {['React', 'Node.js', 'Python', 'AI Tools', 'Mentorship', 'Community'].map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="about-side reveal reveal-delay-2">
            <div className="about-card">
              <div className="about-avatar">
                <img
                  src="https://avatars.githubusercontent.com/u/183245483?v=4"
                  alt="Carlos Avila - Developer and Mentor"
                  loading="lazy"
                  width="120"
                  height="120"
                />
              </div>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-num">2+</span>
                  <span className="stat-label">{t[lang].years}</span>
                </div>
                <div className="stat">
                  <span className="stat-num">100+</span>
                  <span className="stat-label">{t[lang].students}</span>
                </div>
                <div className="stat">
                  <span className="stat-num">20+</span>
                  <span className="stat-label">{t[lang].projects}</span>
                </div>
              </div>
              <div className="about-currently">
                <p className="currently-label">{t[lang].currently}</p>
                <p className="currently-val">{t[lang].role}</p>
                <p className="currently-company">{t[lang].company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience({ lang }) {
  const [active, setActive] = useState(0)

  const t = {
    es: {
      label: 'Experiencia',
      heading: 'Donde he <span class="accent-gradient">trabajado</span>',
    },
    en: {
      label: 'Experience',
      heading: 'Where I&apos;ve <span class="accent-gradient">worked</span>',
    },
  }

  return (
    <section id="experience" className="section section-alt" aria-label="Work experience">
      <div className="container">
        <p className="section-label reveal">{t[lang].label}</p>
        <h2 className="section-heading reveal reveal-delay-1" dangerouslySetInnerHTML={{ __html: t[lang].heading }} />

        <div className="exp-layout reveal reveal-delay-2">
          <div className="exp-tabs" role="tablist" aria-label="Experience tabs">
            {EXPERIENCE.map((exp, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                aria-controls={`exp-panel-${i}`}
                id={`exp-tab-${i}`}
                className={`exp-tab ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="exp-tab-company">{exp.company}</span>
                <span className="exp-tab-role">{exp.role}</span>
              </button>
            ))}
          </div>

          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              id={`exp-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`exp-tab-${i}`}
              className={`exp-panel ${active === i ? 'active' : ''}`}
            >
              <div className="exp-header">
                <h3 className="exp-role">{exp.role}</h3>
                <p className="exp-company">
                  {exp.companyUrl ? (
                    <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
                      @ {exp.company} ↗
                    </a>
                  ) : (
                    <span>@ {exp.company}</span>
                  )}
                </p>
                <p className="exp-period">{lang === 'es' ? exp.period : exp.periodEn}</p>
              </div>
              <p className="exp-desc">{lang === 'es' ? exp.description : exp.descriptionEn}</p>
              <div className="exp-tags">
                {exp.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects({ lang }) {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'featured' ? PROJECTS.filter((p) => p.featured) : PROJECTS

  const t = {
    es: {
      label: 'Proyectos',
      heading: 'Cosas que he <span class="accent-gradient">construido</span>',
      all: 'Todos',
      featured: 'Destacados',
      privateProject: 'Proyecto privado / Cliente',
      personalProject: 'Proyecto personal',
    },
    en: {
      label: 'Projects',
      heading: 'Things I\'ve <span class="accent-gradient">built</span>',
      all: 'All',
      featured: 'Featured',
      privateProject: 'Private Project / Client',
      personalProject: 'Personal Project',
    },
  }

  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="container">
        <p className="section-label reveal">{t[lang].label}</p>
        <h2 className="section-heading reveal reveal-delay-1" dangerouslySetInnerHTML={{ __html: t[lang].heading }} />

        <div className="proj-filters reveal reveal-delay-2" role="group" aria-label="Filter projects">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>{t[lang].all}</button>
          <button className={`filter-btn ${filter === 'featured' ? 'active' : ''}`} onClick={() => setFilter('featured')}>{t[lang].featured}</button>
        </div>

        <div className="projects-grid">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              className={`project-card reveal reveal-delay-${(i % 3) + 1}`}
              aria-label={`Project: ${p.title}`}
            >
              <div className="project-header">
                <div className="project-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <div className="project-links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.title} source code on GitHub`} className="project-link-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.title} live demo`} className="project-link-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  )}
                </div>
              </div>
              <h3 className="project-title">{p.title}</h3>
              {p.type && (
                <span className={`project-badge ${p.type}`}>
                  {p.type === 'client' ? t[lang].privateProject : t[lang].personalProject}
                </span>
              )}
              <p className="project-desc">{p.description}</p>
              <div className="project-tags">
                {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AILab({ lang }) {
  const statusMap = {
    es: {
      active: { label: 'Activo', color: 'green' },
      building: { label: 'Construyendo', color: 'yellow' },
      exploring: { label: 'Explorando', color: 'blue' },
    },
    en: {
      active: { label: 'Active', color: 'green' },
      building: { label: 'Building', color: 'yellow' },
      exploring: { label: 'Exploring', color: 'blue' },
    },
  }

  const t = {
    es: {
      label: 'AI Lab',
      heading: 'Experimentos &amp; <span class="accent-gradient">exploración</span>',
      desc: 'Un espacio donde exploro herramientas de IA, flujos de automatización y experimentos. Siempre construyendo, siempre aprendiendo.',
    },
    en: {
      label: 'AI Lab',
      heading: 'Experiments &amp; <span class="accent-gradient">exploration</span>',
      desc: 'A space where I explore AI tools, automation workflows and experiments. Always building, always learning.',
    },
  }

  return (
    <section id="ai-lab" className="section section-alt" aria-label="AI Lab experiments">
      <div className="container">
        <p className="section-label reveal">{t[lang].label}</p>
        <h2 className="section-heading reveal reveal-delay-1" dangerouslySetInnerHTML={{ __html: t[lang].heading }} />
        <p className="section-sub reveal reveal-delay-2">{t[lang].desc}</p>

        <div className="ailab-grid">
          {AI_LAB.map((item, i) => {
            const status = statusMap[lang][item.status]
            return (
              <div key={item.id} className={`ailab-card reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="ailab-top">
                  <span className="ailab-icon" aria-hidden="true">{item.icon}</span>
                  <span className={`status-badge status-${status.color}`}>{status.label}</span>
                </div>
                <h3 className="ailab-title">{item.title}</h3>
                <p className="ailab-desc">{lang === 'es' ? item.description : item.descriptionEn}</p>
                <div className="ailab-tags">
                  {item.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Mentorship({ lang }) {
  const highlightsEs = [
    { icon: '👨‍🎓', title: 'Apoyo a Estudiantes', desc: 'Guiando a estudiantes a través de desafíos de código, sesiones de debug y hitos de proyectos en 4Geeks Academy.' },
    { icon: '🔍', title: 'Revisiones de Código', desc: 'Revisando proyectos de estudiantes con feedback detallado, mejores prácticas y sugerencias constructivas para mejorar.' },
    { icon: '🌐', title: 'Construcción de Comunidad', desc: 'Gestionando canales digitales, facilitando discusiones y manteniendo la comunidad de aprendizaje activa, comprometida y acogedora.' },
    { icon: '🛠️', title: 'Guía Técnica', desc: 'Ayudando a los estudiantes a entender conceptos de desarrollo web, superar obstáculos y ganar confianza en sus habilidades.' },
    { icon: '📣', title: 'Soporte Público', desc: 'Manejando comunicaciones de cara al público, canales sociales y plataformas comunitarias con claridad y profesionalismo.' },
    { icon: '🚀', title: 'Mentoría Profesional', desc: 'Asesorando a estudiantes en estrategias de búsqueda de empleo, construcción de portfolio y cómo presentarse ante empleadores.' },
  ]
  const highlightsEn = [
    { icon: '👨‍🎓', title: 'Student Support', desc: 'Guiding learners through coding challenges, debugging sessions and project milestones at 4Geeks Academy.' },
    { icon: '🔍', title: 'Code Reviews', desc: 'Reviewing student projects with detailed feedback, best practices and constructive suggestions for improvement.' },
    { icon: '🌐', title: 'Community Building', desc: 'Managing digital channels, facilitating discussions and keeping the learning community active, engaged and welcoming.' },
    { icon: '🛠️', title: 'Technical Guidance', desc: 'Helping students understand web development concepts, work through blockers and gain confidence in their skills.' },
    { icon: '📣', title: 'Public Support', desc: 'Handling public-facing communications, social channels and community platforms with clarity and professionalism.' },
    { icon: '🚀', title: 'Career Mentoring', desc: 'Advising students on job search strategies, portfolio building and how to present themselves to employers.' },
  ]
  const highlights = lang === 'es' ? highlightsEs : highlightsEn

  const t = {
    es: {
      label: 'Mentoría',
      heading: 'Educación &amp; <span class="accent-gradient">comunidad</span>',
      desc: 'Más allá del código, creo en apoyar a las personas. Trabajar en 4Geeks Academy ha moldeado cómo pienso sobre la enseñanza, la comunicación y la comunidad.',
      quote: '"La mejor manera de aprender es enseñar — y la mejor manera de construir es apoyar a otros a construir también."',
    },
    en: {
      label: 'Mentorship',
      heading: 'Education &amp; <span class="accent-gradient">community</span>',
      desc: 'Beyond code, I believe in supporting people. Working at 4Geeks Academy has shaped how I think about teaching, communication and community.',
      quote: '"The best way to learn is to teach — and the best way to build is to support others in building too."',
    },
  }

  return (
    <section id="mentorship" className="section" aria-label="Mentorship and community work">
      <div className="container">
        <p className="section-label reveal">{t[lang].label}</p>
        <h2 className="section-heading reveal reveal-delay-1" dangerouslySetInnerHTML={{ __html: t[lang].heading }} />
        <p className="section-sub reveal reveal-delay-2">{t[lang].desc}</p>

        <div className="mentorship-grid">
          {highlights.map((h, i) => (
            <div key={i} className={`mentorship-card reveal reveal-delay-${(i % 3) + 1}`}>
              <span className="mentorship-icon" aria-hidden="true">{h.icon}</span>
              <h3 className="mentorship-title">{h.title}</h3>
              <p className="mentorship-desc">{h.desc}</p>
            </div>
          ))}
        </div>

        <div className="mentorship-quote reveal reveal-delay-3">
          <blockquote>
            <p>{t[lang].quote}</p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

function TechStack({ lang }) {
  const t = {
    es: {
      label: 'Stack',
      heading: 'Herramientas con las que <span class="accent-gradient">trabajo</span>',
      categories: {
        Frontend: 'Frontend',
        Backend: 'Backend',
        Tools: 'Herramientas',
        'AI & Automation': 'IA & Automatización',
      },
    },
    en: {
      label: 'Stack',
      heading: 'Tools I <span class="accent-gradient">work with</span>',
      categories: {
        Frontend: 'Frontend',
        Backend: 'Backend',
        Tools: 'Tools',
        'AI & Automation': 'AI & Automation',
      },
    },
  }

  return (
    <section id="stack" className="section section-alt" aria-label="Technology stack">
      <div className="container">
        <p className="section-label reveal">{t[lang].label}</p>
        <h2 className="section-heading reveal reveal-delay-1" dangerouslySetInnerHTML={{ __html: t[lang].heading }} />

        <div className="stack-grid">
          {Object.entries(TECH_STACK).map(([category, items], ci) => (
            <div key={category} className={`stack-category reveal reveal-delay-${ci + 1}`}>
              <h3 className="stack-cat-title">{t[lang].categories[category] || category}</h3>
              <div className="stack-items">
                {items.map((item) => (
                  <div key={item.name} className="stack-item">
                    <span className="stack-icon" aria-hidden="true">{item.icon}</span>
                    <span className="stack-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ lang }) {
  const t = {
    es: {
      label: 'Contacto',
      heading: 'Conectemos',
      desc: 'Estoy abierto a proyectos freelance, oportunidades full-time y conversaciones interesantes sobre web, IA y educación.',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      location: 'Ubicación',
      ctaTitle: '¿Listo para colaborar?',
      ctaText: 'Ya sea un proyecto, una pregunta o solo una conversación sobre tecnología — mi bandeja está abierta.',
      ctaBtn: 'Envíame un email',
    },
    en: {
      label: 'Contact',
      heading: 'Let&apos;s <span class="accent-gradient">connect</span>',
      desc: 'I&apos;m open to freelance projects, full-time opportunities and interesting conversations about web, AI and education.',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      location: 'Location',
      ctaTitle: 'Ready to collaborate?',
      ctaText: 'Whether it&apos;s a project, a question or just a conversation about tech — my inbox is open.',
      ctaBtn: 'Send me an email',
    },
  }

  return (
    <section id="contact" className="section" aria-label="Contact information">
      <div className="container">
        <p className="section-label reveal">{t[lang].label}</p>
        <h2 className="section-heading reveal reveal-delay-1" dangerouslySetInnerHTML={{ __html: t[lang].heading }} />
        <p className="section-sub reveal reveal-delay-2">{t[lang].desc}</p>

        <div className="contact-grid reveal reveal-delay-3">
          <div className="contact-info">
            <a href="mailto:avilavaleriocarlos@gmail.com" className="contact-item">
              <span className="contact-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <div>
                <p className="contact-label">{t[lang].email}</p>
                <p className="contact-value">avilavaleriocarlos@gmail.com</p>
              </div>
            </a>
            <a href="https://github.com/AvilaCarlosDev" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span className="contact-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </span>
              <div>
                <p className="contact-label">{t[lang].github}</p>
                <p className="contact-value">AvilaCarlosDev ↗</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/avilacarlosdev" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span className="contact-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </span>
              <div>
                <p className="contact-label">{t[lang].linkedin}</p>
                <p className="contact-value">avilacarlosdev ↗</p>
              </div>
            </a>
            <div className="contact-item static">
              <span className="contact-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </span>
              <div>
                <p className="contact-label">{t[lang].location}</p>
                <p className="contact-value">Venezuela 🇻🇪</p>
              </div>
            </div>
          </div>

          <div className="contact-cta">
            <div className="cta-card">
              <h3 className="cta-title">{t[lang].ctaTitle}</h3>
              <p className="cta-text">{t[lang].ctaText}</p>
              <a
                href="mailto:avilavaleriocarlos@gmail.com"
                className="btn btn-primary btn-lg"
              >
                {t[lang].ctaBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ lang }) {
  const t = {
    es: {
      tagline: 'Desarrollador · Mentor · Community Specialist',
      built: 'Hecho con React & Vite.',
      source: 'Código',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    en: {
      tagline: 'Developer · Mentor · Community Specialist',
      built: 'Built with React & Vite.',
      source: 'Source',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-left">
          <a href="#" className="footer-logo" aria-label="Carlos Avila - Back to top">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">CA</span>
            <span className="logo-bracket">/&gt;</span>
          </a>
          <p className="footer-tagline">{t[lang].tagline}</p>
        </div>
        <div className="footer-right">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Carlos Avila. {t[lang].built}
          </p>
          <div className="footer-links">
            <a href="https://github.com/AvilaCarlosDev/carlos-avila-portfolio" target="_blank" rel="noopener noreferrer" aria-label="Portfolio source code">{t[lang].source}</a>
            <a href="https://github.com/AvilaCarlosDev" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">{t[lang].github}</a>
            <a href="https://www.linkedin.com/in/avilacarlosdev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">{t[lang].linkedin}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── MAIN APP ──────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('ca-theme')
    return saved || 'dark'
  })

  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('ca-lang')
    return saved || 'es'
  })

  useScrollReveal()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.lang = lang
    localStorage.setItem('ca-theme', theme)
    localStorage.setItem('ca-lang', lang)
  }, [theme, lang])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  const toggleLang = () => setLang((l) => (l === 'es' ? 'en' : 'es'))

  return (
    <div className={`app-wrapper ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />
      <main id="main-content">
        <Hero lang={lang} />
        <About lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
        <AILab lang={lang} />
        <Mentorship lang={lang} />
        <TechStack lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
