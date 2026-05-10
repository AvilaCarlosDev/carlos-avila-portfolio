import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faJs, faLinkedin, faLinux, faNodeJs, faPython, faReact } from '@fortawesome/free-brands-svg-icons'
import { faBookOpen, faBoxOpen, faCode, faEnvelope, faGlobe, faMapLocationDot, faPeopleGroup, faRobot, faRocket, faScrewdriverWrench, faServer, faShip, faTerminal, faToolbox, faUser, faWandMagicSparkles, faWind } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import wantedPortrait from './assets/wanted-portrait.webp'

const communityProjects = [
  {
    title: 'Awesome Venezuela Dev',
    badge: 'Community Resource',
    description: {
      es: 'Curaduría de recursos para developers venezolanos: herramientas, comunidades, oportunidades y referencias útiles.',
      en: 'A curated list of resources for Venezuelan developers: tools, communities, opportunities and useful references.',
    },
    stack: ['Open Source', 'Comunidad', 'Markdown'],
    repo: 'https://github.com/AvilaCarlosDev/awesome-venezuela-dev',
    reward: { es: 'Valor comunidad', en: 'Community value' },
  },
  {
    title: 'GitHub Streak Keeper',
    badge: 'Dev Automation',
    description: {
      es: 'Script reutilizable para automatizar checkpoints, logs y commits con propósito en múltiples repos.',
      en: 'Reusable script to automate checkpoints, logs and purposeful commits across multiple repositories.',
    },
    stack: ['Bash', 'Git', 'Automation'],
    repo: 'https://github.com/AvilaCarlosDev/github-streak-keeper',
    reward: { es: 'Productividad', en: 'Productivity' },
  },
  {
    title: 'Free APIs IA Español',
    badge: 'AI Resources',
    description: {
      es: 'Recursos en español para encontrar APIs gratuitas y herramientas útiles alrededor de IA y desarrollo.',
      en: 'Spanish resources to find free APIs and useful tools around AI and development.',
    },
    stack: ['AI', 'APIs', 'Docs'],
    repo: 'https://github.com/AvilaCarlosDev/free-apis-ia-espanol',
    reward: { es: 'Aprendizaje', en: 'Learning' },
  },
  {
    title: 'OpenClaw Skills',
    badge: 'Agent Skills',
    description: {
      es: 'Colección de skills y flujos para trabajar con agentes, automatización, diseño, debugging y productividad.',
      en: 'A collection of skills and workflows for agents, automation, design, debugging and productivity.',
    },
    stack: ['OpenClaw', 'Agents', 'DX'],
    repo: 'https://github.com/AvilaCarlosDev/openclaw-skills',
    reward: { es: 'IA práctica', en: 'Practical AI' },
  },
]

const tagIcons = {
  'Open Source': faGlobe,
  Comunidad: faPeopleGroup,
  Markdown: faBookOpen,
  Bash: faTerminal,
  Git: faGithub,
  Automation: faWandMagicSparkles,
  AI: faRobot,
  APIs: faServer,
  Docs: faBookOpen,
  OpenClaw: faCode,
  Agents: faRobot,
  DX: faScrewdriverWrench,
}

const landingProjects = [
  { title: 'Siena Flower', niche: { es: 'Floristería boutique', en: 'Boutique flower shop' }, url: 'https://agencia-web-floristeria-demo.vercel.app', repo: 'https://github.com/AvilaCarlosDev/landing-floristeria-demo', color: 'pink' },
  { title: 'CraveNow', niche: { es: 'Marketplace de delivery', en: 'Delivery marketplace' }, url: 'https://agencia-web-delivery-demo.vercel.app', repo: 'https://github.com/AvilaCarlosDev/landing-delivery-demo', color: 'orange' },
  { title: 'SportZone Pro', niche: { es: 'Tienda deportiva premium', en: 'Premium sports store' }, url: 'https://agencia-web-deportes-demo.vercel.app', repo: 'https://github.com/AvilaCarlosDev/landing-deportes-demo', color: 'green' },
  { title: 'RutaFija Black', niche: { es: 'Taxi y transfer premium', en: 'Premium taxi and transfer' }, url: 'https://agencia-web-taxi-demo.vercel.app', repo: 'https://github.com/AvilaCarlosDev/landing-taxi-demo', color: 'yellow' },
  { title: 'Noble Barber Society', niche: { es: 'Barbería premium', en: 'Premium barbershop' }, url: 'https://agencia-web-barberia-demo.vercel.app', repo: 'https://github.com/AvilaCarlosDev/landing-barberia-demo', color: 'blue' },
  { title: 'ObraMax Supply', niche: { es: 'Ferretería industrial', en: 'Industrial hardware supply' }, url: 'https://agencia-web-ferreteria-demo.vercel.app', repo: 'https://github.com/AvilaCarlosDev/landing-ferreteria-demo', color: 'steel' },
]

const stack = [
  { name: 'React', icon: faReact },
  { name: 'JavaScript', icon: faJs },
  { name: 'Node.js', icon: faNodeJs },
  { name: 'Python', icon: faPython },
  { name: 'Flask', icon: faServer },
  { name: 'Tailwind', icon: faWind },
  { name: 'Vite', icon: faRocket },
  { name: 'Git', icon: faGithub },
  { name: 'Linux', icon: faLinux },
  { name: 'OpenClaw', icon: faCode },
  { name: 'AI Agents', icon: faRobot },
  { name: 'Automation', icon: faWandMagicSparkles },
]

const copy = {
  es: {
    nav: { map: 'Mapa', dev: 'DEV', landings: 'Landings', contact: 'Contacto' },
    heroEyebrow: 'Portfolio Developer · Web, IA y Comunidad',
    heroTitle: 'Construyo experiencias web con alma de aventura.',
    heroText: 'Developer venezolano creando herramientas para la comunidad DEV, automatizaciones con IA y landing pages listas para convertir visitantes en clientes.',
    treasureBtn: 'Ver tesoros DEV',
    landingBtn: 'Ver landings',
    mapLabel: 'Mapa de ruta',
    mapTitle: 'La Grand Line de Carlos Dev',
    islands: { about: 'Sobre mí', stack: 'Stack', community: 'Comunidad DEV', landings: 'Landings', contact: 'Contacto' },
    logLabel: 'Bitácora',
    logTitle: 'Developer + Comunidad + IA práctica.',
    logText: 'Trabajo entre desarrollo web, mentoría y soporte técnico en comunidad. Me interesa crear soluciones útiles: desde recursos para developers hasta demos comerciales que un negocio real pueda usar para vender más.',
    communityLabel: 'Tesoros para la comunidad',
    communityTitle: 'Proyectos DEV con valor real.',
    communityText: 'Repos que aportan recursos, automatización o aprendizaje para otros developers.',
    repoBtn: 'Ver repo →',
    landingLabel: 'Demos comerciales',
    landingTitle: 'Landing pages para conseguir clientes.',
    landingText: 'Cada demo representa un nicho real: diseño, CTA, estructura responsive y enfoque de conversión.',
    landingCardText: 'Demo lista para presentar a negocios locales y convertirla en proyecto pagado.',
    contactLabel: 'Zarpemos',
    contactTitle: '¿Construimos tu próxima landing o herramienta web?',
    contactText: 'Si necesitas una web rápida, clara y con personalidad, puedo ayudarte a convertir la idea en una experiencia lista para compartir.',
    emailBtn: 'Enviar mensaje',
    contactLinksTitle: 'Canales de contacto',
    location: 'Punto Fijo, Venezuela 🇻🇪',
    footer: '© 2026 Carlos Avila. Developer 🇻🇪',
    signature: 'Hecho con 💚 desde Venezuela · Navegando código, comunidad e IA.',
  },
  en: {
    nav: { map: 'Map', dev: 'DEV', landings: 'Landings', contact: 'Contact' },
    heroEyebrow: 'Developer Portfolio · Web, AI & Community',
    heroTitle: 'I build web experiences with an adventure soul.',
    heroText: 'Venezuelan developer creating tools for the DEV community, AI automations and landing pages ready to turn visitors into clients.',
    treasureBtn: 'View DEV treasures',
    landingBtn: 'View landings',
    mapLabel: 'Route map',
    mapTitle: 'Carlos Dev Grand Line',
    islands: { about: 'About me', stack: 'Stack', community: 'DEV Community', landings: 'Landings', contact: 'Contact' },
    logLabel: 'Logbook',
    logTitle: 'Developer + Community + Practical AI.',
    logText: 'I work across web development, mentoring and technical community support. I like building useful solutions: from resources for developers to commercial demos that real businesses can use to sell more.',
    communityLabel: 'Treasures for the community',
    communityTitle: 'DEV projects with real value.',
    communityText: 'Repositories that provide resources, automation or learning value for other developers.',
    repoBtn: 'View repo →',
    landingLabel: 'Commercial demos',
    landingTitle: 'Landing pages to get clients.',
    landingText: 'Each demo represents a real niche: design, CTA, responsive structure and conversion focus.',
    landingCardText: 'Demo ready to show local businesses and turn into a paid project.',
    contactLabel: 'Let’s sail',
    contactTitle: 'Should we build your next landing or web tool?',
    contactText: 'If you need a fast, clear website with personality, I can help you turn the idea into an experience ready to share.',
    emailBtn: 'Send message',
    contactLinksTitle: 'Contact channels',
    location: 'Punto Fijo, Venezuela 🇻🇪',
    footer: '© 2026 Carlos Avila. Developer 🇻🇪',
    signature: 'Made with 💚 from Venezuela · Sailing through code, community and AI.',
  },
}

function App() {
  const [shipTarget, setShipTarget] = useState('about')
  const [lang, setLang] = useState('en')
  const [showContactForm, setShowContactForm] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')
  const t = copy[lang]

  const sailTo = (event, target, sectionId) => {
    event.preventDefault()
    setShipTarget(target)
    window.setTimeout(() => {
      document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', sectionId)
    }, 760)
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()
    setFormStatus('missing-endpoint')
  }

  return (
    <main className="bounty-app" lang={lang}>
      <nav className="nav">
        <a href="#hero" className="brand">&lt;CA/&gt;</a>
        <div className="nav-links">
          <a href="#map">{t.nav.map}</a>
          <a href="#community">{t.nav.dev}</a>
          <a href="#landings">{t.nav.landings}</a>
          <a href="#contact">{t.nav.contact}</a>
          <button className="lang-toggle" type="button" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label="Cambiar idioma">
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </nav>

      <section className="hero section" id="hero">
        <div className="grain" />

        <div className="hero-grid container">
          <div className="wanted-poster reveal-card" aria-label="Wanted poster Carlos Avila">
            <div className="poster-top">WANTED</div>
            <div className="poster-sub">Developer</div>
            <div className="poster-code">&lt;CA/&gt;</div>
            <div className="wanted-photo-frame">
              <img src={wantedPortrait} alt="Carlos Avila portrait for wanted poster" />
            </div>
            <div className="wanted-name">Carlos Avila</div>
            <p className="reward-label">REWARD</p>
            <p className="bounty">Digital products that convert</p>
            <div className="wanted-footer">React | Node | Python | AI</div>
          </div>

          <div className="hero-copy">
            <span className="eyebrow">{t.heroEyebrow}</span>
            <h2>{t.heroTitle}</h2>
            <p>{t.heroText}</p>
            <div className="hero-actions">
              <a className="btn primary" href="#community"><FontAwesomeIcon icon={faBoxOpen} /> {t.treasureBtn}</a>
              <a className="btn ghost" href="#landings"><FontAwesomeIcon icon={faRocket} /> {t.landingBtn}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section section" id="map">
        <div className="container">
          <span className="eyebrow">{t.mapLabel}</span>
          <h2>{t.mapTitle}</h2>
          <div className="treasure-map">
            <svg className="route" viewBox="0 0 900 380" aria-hidden="true"><path d="M70 260 C180 80, 320 330, 430 170 S680 90, 820 250" /></svg>
            <button className="island island-1" type="button" onClick={(event) => sailTo(event, 'about', '#about')}><strong><FontAwesomeIcon icon={faUser} /></strong><span>{t.islands.about}</span></button>
            <button className="island island-2" type="button" onClick={(event) => sailTo(event, 'stack', '#stack')}><strong><FontAwesomeIcon icon={faToolbox} /></strong><span>{t.islands.stack}</span></button>
            <button className="island island-3" type="button" onClick={(event) => sailTo(event, 'community', '#community')}><strong><FontAwesomeIcon icon={faPeopleGroup} /></strong><span>{t.islands.community}</span></button>
            <button className="island island-4" type="button" onClick={(event) => sailTo(event, 'landings', '#landings')}><strong><FontAwesomeIcon icon={faRocket} /></strong><span>{t.islands.landings}</span></button>
            <button className="island island-5" type="button" onClick={(event) => sailTo(event, 'contact', '#contact')}><strong><FontAwesomeIcon icon={faEnvelope} /></strong><span>{t.islands.contact}</span></button>
            <div className={`map-ship ship-to-${shipTarget}`} aria-hidden="true"><span><FontAwesomeIcon icon={faShip} /></span></div>
            <div className="compass">✦</div>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container split">
          <div><span className="eyebrow">{t.logLabel}</span><h2>{t.logTitle}</h2></div>
          <p>{t.logText}</p>
        </div>
        <div className="stack-cloud container" id="stack">
          {stack.map((item) => <span key={item.name}><b><FontAwesomeIcon icon={item.icon} /></b>{item.name}</span>)}
        </div>
      </section>

      <section className="section" id="community">
        <div className="container section-head"><span className="eyebrow">{t.communityLabel}</span><h2>{t.communityTitle}</h2><p>{t.communityText}</p></div>
        <div className="container bounty-grid">
          {communityProjects.map((project) => (
            <article className="bounty-card" key={project.title}>
              <div className="card-ribbon">{project.badge}</div>
              <h3>{project.title}</h3>
              <p>{project.description[lang]}</p>
              <div className="reward">{project.reward[lang]}</div>
              <div className="tags">{project.stack.map((tag) => <span key={tag}><b><FontAwesomeIcon icon={tagIcons[tag] || faCode} /></b>{tag}</span>)}</div>
              <a href={project.repo} target="_blank" rel="noreferrer">{t.repoBtn}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section landings" id="landings">
        <div className="container section-head"><span className="eyebrow">{t.landingLabel}</span><h2>{t.landingTitle}</h2><p>{t.landingText}</p></div>
        <div className="container landing-grid">
          {landingProjects.map((landing) => (
            <article className={`landing-card ${landing.color}`} key={landing.title}>
              <span>{landing.niche[lang]}</span>
              <h3>{landing.title}</h3>
              <p>{t.landingCardText}</p>
              <div className="landing-actions"><a href={landing.url} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGlobe} /> Live</a><a href={landing.repo} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /> Repo</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="container contact-card">
          <span className="eyebrow">{t.contactLabel}</span>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <div className="contact-links" aria-label={t.contactLinksTitle}>
            <a href="mailto:avilavaleriocarlos@gmail.com"><FontAwesomeIcon icon={faEnvelope} /> avilavaleriocarlos@gmail.com</a>
            <a href="https://github.com/AvilaCarlosDev" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /> GitHub · AvilaCarlosDev</a>
            <a href="https://www.linkedin.com/in/avilacarlosdev" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /> LinkedIn · avilacarlosdev</a>
            <span><FontAwesomeIcon icon={faMapLocationDot} /> {t.location}</span>
          </div>
          <div className="hero-actions center">
            <button className="btn primary" type="button" onClick={() => setShowContactForm((value) => !value)}>
              <FontAwesomeIcon icon={faEnvelope} /> {t.emailBtn}
            </button>
          </div>

          {showContactForm && (
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-grid">
                <label>
                  <span>{lang === 'es' ? 'Nombre' : 'Name'}</span>
                  <input type="text" name="name" placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'} required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" placeholder="you@example.com" required />
                </label>
              </div>
              <label>
                <span>{lang === 'es' ? 'Mensaje' : 'Message'}</span>
                <textarea name="message" rows="5" placeholder={lang === 'es' ? 'Cuéntame sobre tu proyecto...' : 'Tell me about your project...'} required />
              </label>
              <button className="btn primary form-submit" type="submit">
                <FontAwesomeIcon icon={faShip} /> {lang === 'es' ? 'Enviar mensaje' : 'Send message'}
              </button>
              {formStatus === 'missing-endpoint' && (
                <p className="form-note">
                  {lang === 'es'
                    ? 'Formulario listo. Falta conectar el servicio de envío para mandar correos sin salir de la página.'
                    : 'Form ready. A sending service still needs to be connected to send emails without leaving the page.'}
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a href="#hero" className="footer-logo">&lt;CA/&gt;</a>
          <p>{t.footer}</p>
          <p className="footer-signature">{t.signature}</p>
        </div>
      </footer>
    </main>
  )
}

export default App
