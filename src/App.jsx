import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [visibleSections, setVisibleSections] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className={`hero-section ${visibleSections['hero'] ? 'visible' : ''}`}>
        <div className="hero-content">
          <div className="hero-badge">👋 Hola, soy</div>
          <h1 className="hero-title">
            <span className="gradient-text">Carlos Ávila</span>
          </h1>
          <h2 className="hero-subtitle">
            Developer <span className="text-accent">🇻🇪</span>
          </h2>
          <p className="hero-description">
            Creo soluciones digitales que combinan potencia, estética y funcionalidad.
            Especializado en React, Node.js y experiencias web modernas.
          </p>
          <div className="hero-ctas">
            <a href="#proyectos" className="btn btn-primary">
              Ver Proyectos
            </a>
            <a href="#contacto" className="btn btn-secondary">
              Contactar
            </a>
          </div>
          <div className="hero-scroll">
            <span>↓ Scroll para más</span>
          </div>
        </div>
      </section>

      {/* Sobre Mí */}
      <section id="sobre-mi" className={`about-section ${visibleSections['sobre-mi'] ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Sobre Mí</h2>
          <div className="about-grid">
            <div className="about-image">
              <div className="image-placeholder">
                <img src="https://avatars.githubusercontent.com/u/183245483?v=4" alt="Carlos Ávila" className="profile-photo" />
              </div>
            </div>
            <div className="about-content">
              <p>
                Soy un desarrollador Full Stack venezolano con pasión por crear productos digitales
                que marquen la diferencia. Mi enfoque combina la precisión técnica con la creatividad
                para entregar soluciones que no solo funcionan, sino que inspiran.
              </p>
              <p>
                Actualmente trabajo en <strong>4Geeks Academy</strong>, donde ayudo a formar
                la próxima generación de desarrolladores. Cuando no estoy codificando,
                me encontrarás explorando nuevas tecnologías, contribuyendo a proyectos
                open source o disfrutando de anime y videojuegos.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">28</span>
                  <span className="stat-label">Repos públicos</span>
                </div>
                <div className="stat">
                  <span className="stat-number">21</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">Cafés consumidos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className={`services-section ${visibleSections['servicios'] ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Servicios</h2>
          <p className="section-subtitle">
            Soluciones completas desde el concepto hasta el deploy
          </p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>Landing Pages</h3>
              <p>
                Páginas de alto impacto optimizadas para conversión. Rápidas, 
                responsive y con diseño que captura la esencia de tu marca.
              </p>
              <ul className="service-features">
                <li>✓ Diseño personalizado</li>
                <li>✓ SEO optimizado</li>
                <li>✓ Deploy en Vercel/Netlify</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">⚛️</div>
              <h3>Aplicaciones React</h3>
              <p>
                SPAs modernas con React, Vite y las últimas tecnologías.
                Experiencias fluidas y escalables.
              </p>
              <ul className="service-features">
                <li>✓ React + Vite + Tailwind</li>
                <li>✓ State management (Zustand/Redux)</li>
                <li>✓ Integración de APIs</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Full Stack Development</h3>
              <p>
                Soluciones end-to-end con Node.js, Python y bases de datos
                modernas. Desde el backend hasta el deploy.
              </p>
              <ul className="service-features">
                <li>✓ APIs REST/GraphQL</li>
                <li>✓ Bases de datos (MySQL, PostgreSQL, MongoDB)</li>
                <li>✓ Docker & CI/CD</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🤖</div>
              <h3>Automatización & IA</h3>
              <p>
                Agentes inteligentes, automatización de workflows y 
                soluciones con IA para potenciar tu productividad.
              </p>
              <ul className="service-features">
                <li>✓ OpenClaw & Agentes IA</li>
                <li>✓ Automatización de tareas</li>
                <li>✓ Integraciones personalizadas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stack Tecnológico */}
      <section id="stack" className={`stack-section ${visibleSections['stack'] ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Stack Tecnológico</h2>
          <p className="section-subtitle">
            Las herramientas que uso para dar vida a las ideas
          </p>
          <div className="stack-categories">
            <div className="stack-category">
              <h3>Frontend</h3>
              <div className="stack-grid">
                <span className="stack-item">⚛️ React</span>
                <span className="stack-item">⚡ Vite</span>
                <span className="stack-item">🎨 Tailwind CSS</span>
                <span className="stack-item">📘 TypeScript</span>
                <span className="stack-item">🅰️ Angular</span>
                <span className="stack-item">💚 Vue.js</span>
              </div>
            </div>
            <div className="stack-category">
              <h3>Backend</h3>
              <div className="stack-grid">
                <span className="stack-item">🟢 Node.js</span>
                <span className="stack-item">🐍 Python</span>
                <span className="stack-item">🔷 Flask</span>
                <span className="stack-item">🐘 Laravel</span>
                <span className="stack-item">🐘 PHP</span>
              </div>
            </div>
            <div className="stack-category">
              <h3>Bases de Datos</h3>
              <div className="stack-grid">
                <span className="stack-item">🐬 MySQL</span>
                <span className="stack-item">🗄️ SQLite</span>
                <span className="stack-item">🍃 MongoDB</span>
                <span className="stack-item">🐘 PostgreSQL</span>
              </div>
            </div>
            <div className="stack-category">
              <h3>DevOps & Tools</h3>
              <div className="stack-grid">
                <span className="stack-item">🐙 Git</span>
                <span className="stack-item">🐳 Docker</span>
                <span className="stack-item">🔷 Linux</span>
                <span className="stack-item">🦀 OpenClaw</span>
                <span className="stack-item">⚙️ CI/CD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className={`projects-section ${visibleSections['proyectos'] ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Proyectos Destacados</h2>
          <p className="section-subtitle">
            Una selección de mi trabajo reciente
          </p>
          <div className="projects-grid">
            {/* Proyecto 1: GitHub Streak Keeper */}
            <div className="project-card">
              <div className="project-header">
                <span className="project-folder">🟩</span>
                <div className="project-links">
                  <a href="https://github.com/AvilaCarlosDev/github-streak-keeper" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
              <h3 className="project-title">GitHub Streak Keeper</h3>
              <p className="project-description">
                Herramienta original para mantener tu racha de contribuciones en GitHub.
                Scripts automatizados con systemd timers y cron jobs.
              </p>
              <div className="project-tags">
                <span className="tag">🐚 Shell</span>
                <span className="tag">⚙️ Automatización</span>
                <span className="tag">📊 Productividad</span>
              </div>
            </div>

            {/* Proyecto 2: Weather App */}
            <div className="project-card">
              <div className="project-header">
                <span className="project-folder">⛅</span>
                <div className="project-links">
                  <a href="https://github.com/AvilaCarlosDev/weather-app-Vite" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
              <h3 className="project-title">Weather App</h3>
              <p className="project-description">
                Aplicación del clima con Vite + React. Consumo de API en tiempo real,
                búsqueda por ciudad y pronóstico extendido.
              </p>
              <div className="project-tags">
                <span className="tag">⚛️ React</span>
                <span className="tag">⚡ Vite</span>
                <span className="tag">🌡️ API REST</span>
              </div>
            </div>

            {/* Proyecto 3: Tienda de Muebles */}
            <div className="project-card">
              <div className="project-header">
                <span className="project-folder">🪑</span>
                <div className="project-links">
                  <a href="https://github.com/AvilaCarlosDev/Maqueta-Tienda-de-muebles" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
              <h3 className="project-title">Tienda de Muebles</h3>
              <p className="project-description">
                E-commerce completo con catálogo de productos, carrito de compras
                y diseño responsive. Ideal para negocios de retail.
              </p>
              <div className="project-tags">
                <span className="tag">💻 JavaScript</span>
                <span className="tag">🛒 E-commerce</span>
                <span className="tag">📱 Responsive</span>
              </div>
            </div>

            {/* Proyecto 4: Awesome Venezuela Dev */}
            <div className="project-card">
              <div className="project-header">
                <span className="project-folder">🇻🇪</span>
                <div className="project-links">
                  <a href="https://github.com/AvilaCarlosDev/awesome-venezuela-dev" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
              <h3 className="project-title">Awesome Venezuela Dev</h3>
              <p className="project-description">
                Lista curada de recursos para desarrolladores venezolanos: comunidades,
                herramientas locales, eventos y oportunidades laborales.
              </p>
              <div className="project-tags">
                <span className="tag">📚 Recursos</span>
                <span className="tag">🇻🇪 Comunidad</span>
                <span className="tag">🌍 Open Source</span>
              </div>
            </div>
          </div>
          
          <div className="projects-cta">
            <a href="https://github.com/AvilaCarlosDev" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Ver todos los proyectos en GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className={`contact-section ${visibleSections['contacto'] ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">¿Tienes un proyecto?</h2>
          <p className="section-subtitle">
            Hablemos sobre cómo puedo ayudarte a hacerlo realidad
          </p>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:Avilavaleriocarlos@gmail.com">Avilavaleriocarlos@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Ubicación</h4>
                  <p>Punto Fijo, Falcón, Venezuela 🇻🇪</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div>
                  <h4>Disponibilidad</h4>
                  <p>Abierto a oportunidades freelance</p>
                </div>
              </div>
            </div>
            <div className="contact-social">
              <a href="https://www.linkedin.com/in/avilacarlosdev" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/AvilaCarlosDev" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>
              <a href="https://twitter.com/avilacarlosdev" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span>Twitter/X</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            Hecho con <span className="text-accent">💚</span> y ☕ en Venezuela
          </p>
          <p className="footer-year">© 2026 Carlos Ávila. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}

export default App
