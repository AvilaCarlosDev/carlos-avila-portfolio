// Pruebas sobre el sitio ya construido (dist/). Ejecutar después de `npm run build`.
import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'node-html-parser'

const dist = resolve(import.meta.dirname, '../dist')
const SITIO = 'https://avilacarlosdev.com'
const leer = (r) => readFileSync(resolve(dist, r), 'utf8')
const existe = (r) => existsSync(resolve(dist, r.replace(/^\//, '')))

const PAGINAS = [
  { archivo: 'index.html', path: '/', lang: 'es', otro: '/en/' },
  { archivo: 'en/index.html', path: '/en/', lang: 'en', otro: '/' },
  { archivo: 'privacidad/index.html', path: '/privacidad/', lang: 'es', otro: '/en/privacy/' },
  { archivo: 'en/privacy/index.html', path: '/en/privacy/', lang: 'en', otro: '/privacidad/' },
]

beforeAll(() => {
  if (!existsSync(dist)) throw new Error('Falta dist/: ejecutá `npm run build` antes de las pruebas.')
})

describe.each(PAGINAS)('$path', ({ archivo, path, lang, otro }) => {
  let doc
  beforeAll(() => { doc = parse(leer(archivo)) })
  const meta = (sel) => doc.querySelector(sel)?.getAttribute('content')
  const link = (rel, extra = '') => doc.querySelector(`link[rel="${rel}"]${extra}`)?.getAttribute('href')

  it('declara el idioma correcto en <html lang>', () => {
    expect(doc.querySelector('html').getAttribute('lang')).toBe(lang)
  })

  it('título (10–65 caracteres) y descripción (70–165 caracteres)', () => {
    const titulo = doc.querySelector('title').text
    expect(titulo.length).toBeGreaterThanOrEqual(10)
    expect(titulo.length).toBeLessThanOrEqual(65)
    const desc = meta('meta[name="description"]')
    expect(desc.length).toBeGreaterThanOrEqual(70)
    expect(desc.length).toBeLessThanOrEqual(165)
  })

  it('URL canónica absoluta y hreflang recíproco (es, en, x-default)', () => {
    expect(link('canonical')).toBe(SITIO + path)
    expect(link('alternate', `[hreflang="${lang}"]`)).toBe(SITIO + path)
    expect(link('alternate', `[hreflang="${lang === 'es' ? 'en' : 'es'}"]`)).toBe(SITIO + otro)
    expect(link('alternate', '[hreflang="x-default"]')).toBeTruthy()
  })

  it('Open Graph y Twitter completos, con imagen propia que existe', () => {
    for (const p of ['og:title', 'og:description', 'og:url', 'og:type', 'og:site_name', 'og:image', 'og:image:alt', 'og:locale']) {
      expect(meta(`meta[property="${p}"]`), p).toBeTruthy()
    }
    expect(meta('meta[property="og:url"]')).toBe(SITIO + path)
    const img = meta('meta[property="og:image"]')
    expect(img.startsWith(SITIO + '/')).toBe(true)
    expect(existe(img.replace(SITIO, ''))).toBe(true)
    expect(meta('meta[name="twitter:card"]')).toBe('summary_large_image')
    expect(meta('meta[name="twitter:image"]')).toBe(img)
  })

  it('tiene un solo <h1>', () => {
    expect(doc.querySelectorAll('h1')).toHaveLength(1)
  })

  it('robots, favicon, manifest, theme-color y enlace de salto', () => {
    expect(meta('meta[name="robots"]')).toMatch(/index/)
    expect(link('icon', '[sizes="32x32"]')).toBeTruthy()
    expect(link('apple-touch-icon')).toBeTruthy()
    expect(link('manifest')).toBe('/manifest.webmanifest')
    expect(meta('meta[name="theme-color"]')).toBeTruthy()
    expect(doc.querySelector('a.skip').getAttribute('href')).toBe('#contenido')
    expect(doc.querySelector('main#contenido')).not.toBeNull()
  })

  it('datos estructurados JSON-LD válidos (Person + WebSite)', () => {
    const json = JSON.parse(doc.querySelector('script[type="application/ld+json"]').text)
    const tipos = json['@graph'].map((n) => n['@type'])
    expect(tipos).toEqual(expect.arrayContaining(['Person', 'WebSite']))
    const persona = json['@graph'].find((n) => n['@type'] === 'Person')
    expect(persona.sameAs).toEqual(expect.arrayContaining(['https://github.com/AvilaCarlosDev', 'https://www.linkedin.com/in/avilacarlosdev']))
  })

  it('todas las imágenes tienen atributo alt y ninguna es externa', () => {
    for (const img of doc.querySelectorAll('img')) {
      expect(img.getAttribute('alt'), img.outerHTML.slice(0, 80)).not.toBeUndefined()
      expect(img.getAttribute('src')).not.toMatch(/^https?:/)
      expect(existe(img.getAttribute('src')), img.getAttribute('src')).toBe(true)
    }
  })

  it('los enlaces internos existen y los externos son seguros', () => {
    for (const a of doc.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href')
      if (href.startsWith('#')) {
        if (href.length > 1) expect(doc.querySelector(`[id="${href.slice(1)}"]`), href).not.toBeNull()
      } else if (href.startsWith('/')) {
        const ruta = href.split('#')[0]
        expect(existe(ruta) || existe(ruta + 'index.html'), href).toBe(true)
      } else if (href.startsWith('http')) {
        if (a.getAttribute('target') === '_blank') expect(a.getAttribute('rel') ?? '').toMatch(/noopener/)
      }
    }
  })

  it('pie con copyright, privacidad, código fuente y licencia', () => {
    const pie = doc.querySelector('footer').text
    expect(pie).toMatch(/©\s*2026/)
    expect(doc.querySelector('footer a[href*="priva"]')).not.toBeNull()
    expect(doc.querySelector('footer a[href*="github.com/AvilaCarlosDev/carlos-avila-portfolio"]')).not.toBeNull()
  })
})

describe('página de inicio: contenido y accesibilidad', () => {
  for (const [archivo, nombre] of [['index.html', 'ES'], ['en/index.html', 'EN']]) {
    it(`${nombre}: secciones, formulario etiquetado, CV descargable y botón de idioma`, () => {
      const doc = parse(leer(archivo))
      // Alcance acordado por Carlos: quién soy, qué he hecho (los proyectos), CV y formulario. Nada más.
      const ids = ['quien-soy', 'que-he-hecho', 'cv', 'contacto']
      expect(doc.querySelectorAll('main > section').map((s) => s.id)).toEqual(ids)
      expect(doc.querySelector('#por-que'), 'la sección "por qué contratarme" quedó fuera del alcance').toBeNull()
      expect(doc.querySelectorAll('.kick'), 'sin etiquetas numeradas tipo "01 / SECCIÓN"').toHaveLength(0)
      expect(doc.querySelectorAll('.site-nav a').map((a) => a.getAttribute('href'))).toEqual(ids.map((i) => `#${i}`))
      // Cada sección tiene su título (h2)
      for (const id of ids) expect(doc.querySelector(`section#${id} h2`), id).not.toBeNull()
      for (const campo of doc.querySelectorAll('#form-contacto input:not([name="botcheck"]), #form-contacto textarea')) {
        expect(doc.querySelector(`label[for="${campo.getAttribute('id')}"]`), campo.getAttribute('name')).not.toBeNull()
      }
      expect(doc.querySelector('#form-contacto').getAttribute('data-messages')).toContain('correoFalso')
      const descargas = doc.querySelectorAll('a[download]').map((a) => a.getAttribute('href'))
      // miniatura + botón principal (idioma de la página) y botón secundario (el otro idioma)
      const [principal, secundario] = nombre === 'ES' ? ['ES', 'EN'] : ['EN', 'ES']
      expect(descargas.sort()).toEqual([`/Carlos-Avila-CV-${principal}.pdf`, `/Carlos-Avila-CV-${principal}.pdf`, `/Carlos-Avila-CV-${secundario}.pdf`].sort())
      const cambio = doc.querySelector('.lang a')
      expect(cambio.getAttribute('href')).toBe(archivo === 'index.html' ? '/en/' : '/')
    })
  }
})

describe('archivos del sitio', () => {
  it('robots.txt apunta al sitemap y el sitemap lista las 4 páginas con hreflang', () => {
    expect(leer('robots.txt')).toMatch(/Sitemap:\s*https:\/\/avilacarlosdev\.com\/sitemap\.xml/)
    const xml = leer('sitemap.xml')
    for (const p of ['/', '/en/', '/privacidad/', '/en/privacy/']) expect(xml).toContain(`<loc>${SITIO}${p}</loc>`)
    expect(xml).toContain('hreflang="en"')
  })

  it('manifest válido con íconos existentes', () => {
    const m = JSON.parse(leer('manifest.webmanifest'))
    expect(m.name).toBeTruthy()
    for (const i of m.icons) expect(existe(i.src), i.src).toBe(true)
  })

  it('security.txt con contacto y fecha de expiración futura', () => {
    const t = leer('.well-known/security.txt')
    expect(t).toMatch(/^Contact:/m)
    const exp = t.match(/^Expires:\s*(.+)$/m)[1]
    expect(new Date(exp).getTime()).toBeGreaterThan(Date.now())
  })

  it('la 404 no se indexa', () => {
    expect(parse(leer('404.html')).querySelector('meta[name="robots"]').getAttribute('content')).toMatch(/noindex/)
  })

  it('og.jpg mide 1200×630', async () => {
    const sharp = (await import('sharp')).default
    const { width, height } = await sharp(resolve(dist, 'og.jpg')).metadata()
    expect([width, height]).toEqual([1200, 630])
  })

  it('vercel.json define CSP restrictiva, HSTS y cabeceras de seguridad', () => {
    const v = JSON.parse(readFileSync(resolve(import.meta.dirname, '../vercel.json'), 'utf8'))
    const cab = Object.fromEntries(v.headers[0].headers.map((h) => [h.key, h.value]))
    expect(cab['Content-Security-Policy']).toMatch(/default-src 'self'/)
    expect(cab['Content-Security-Policy']).toMatch(/connect-src[^;]*api\.web3forms\.com/)
    expect(cab['Content-Security-Policy']).toMatch(/frame-ancestors 'none'/)
    for (const k of ['Strict-Transport-Security', 'X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy']) expect(cab[k], k).toBeTruthy()
  })
})

describe('compatibilidad con la CSP (font-src y img-src \'self\')', () => {
  it('ninguna hoja de estilo incrusta fuentes o imágenes como data: URI', async () => {
    const { readdirSync } = await import('node:fs')
    const css = readdirSync(resolve(dist, '_astro')).filter((f) => f.endsWith('.css'))
    expect(css.length).toBeGreaterThan(0)
    const incrustados = css.filter((f) => /url\(\s*["']?data:/.test(readFileSync(resolve(dist, '_astro', f), 'utf8')))
    expect(incrustados, 'CSS con data: URI (la CSP los bloquea)').toEqual([])
  })
})

describe('imágenes: sin recortes accidentales', () => {
  it('cada imagen optimizada conserva la proporción de su original (Astro recorta si se fuerzan ancho y alto)', async () => {
    const sharp = (await import('sharp')).default
    const { readdirSync } = await import('node:fs')
    const originales = Object.fromEntries(readdirSync(resolve(import.meta.dirname, '../src/assets')).map((f) => [f.replace(/\.\w+$/, ''), f]))
    const recortadas = []
    for (const archivo of ['index.html', 'en/index.html']) {
      for (const img of parse(leer(archivo)).querySelectorAll('img[src^="/_astro/"]')) {
        const src = img.getAttribute('src')
        const nombre = src.split('/').pop().split('.')[0]
        if (!originales[nombre]) continue
        const [o, c] = await Promise.all([
          sharp(resolve(import.meta.dirname, '../src/assets', originales[nombre])).metadata(),
          sharp(resolve(dist, src.replace(/^\//, ''))).metadata(),
        ])
        const dif = Math.abs(o.width / o.height - c.width / c.height) / (o.width / o.height)
        if (dif > 0.03) recortadas.push(`${nombre}: original ${o.width}x${o.height} → ${c.width}x${c.height}`)
      }
    }
    expect(recortadas, 'imágenes con proporción alterada (recortadas)').toEqual([])
  })
})

describe('marco del retrato (ventana estilo Mac)', () => {
  it('los tres puntos usan los colores de cerrar, minimizar y ampliar', async () => {
    const { readdirSync } = await import('node:fs')
    const css = readdirSync(resolve(dist, '_astro'))
      .filter((f) => f.endsWith('.css'))
      .map((f) => readFileSync(resolve(dist, '_astro', f), 'utf8'))
      .join('\n')
      .toLowerCase()
    for (const color of ['#ff5f57', '#febc2e', '#28c840']) expect(css, color).toContain(color)
    const puntos = parse(leer('index.html')).querySelectorAll('.frame .bar i')
    expect(puntos).toHaveLength(3)
  })
})

describe('quién soy y qué he hecho: contenido', () => {
  for (const [archivo, nombre] of [['index.html', 'ES'], ['en/index.html', 'EN']]) {
    it(`${nombre}: quién soy incluye rol actual, idiomas y herramientas`, () => {
      const doc = parse(leer(archivo))
      const q = doc.querySelector('#quien-soy').text
      for (const clave of ['4Geeks Academy', 'B1', 'React', 'Python']) expect(q, clave).toContain(clave)
      expect(doc.querySelectorAll('#quien-soy .chips li').length).toBeGreaterThanOrEqual(8)
    })

    it(`${nombre}: qué he hecho son los 3 proyectos, con GitHub y la demo en vivo de apis-gratis-es`, () => {
      const doc = parse(leer(archivo))
      expect(doc.querySelectorAll('#que-he-hecho .proj')).toHaveLength(3)
      expect(doc.querySelectorAll('#que-he-hecho .proj h3').map((h) => h.text)).toEqual(['apis-gratis-es', 'mcp-readiness-check', 'openclaw-skills'])
      const demos = doc.querySelectorAll('#que-he-hecho a[href*="github.io"]')
      expect(demos).toHaveLength(1)
      expect(demos[0].getAttribute('href')).toBe('https://avilacarlosdev.github.io/apis-gratis-es/')
      expect(doc.querySelector('#trayectoria')).toBeNull()
    })
  }
})

describe('presentación: una sola llamada a la acción', () => {
  for (const [archivo, nombre] of [['index.html', 'ES'], ['en/index.html', 'EN']]) {
    it(`${nombre}: solo "ver proyectos"; GitHub y LinkedIn viven en Contacto`, () => {
      const doc = parse(leer(archivo))
      const botones = doc.querySelectorAll('#inicio .cta a')
      expect(botones.map((a) => a.getAttribute('href'))).toEqual(['#que-he-hecho'])
      expect(doc.querySelector('#inicio a[href*="github.com"]')).toBeNull()
      expect(doc.querySelector('#contacto a[href*="github.com/AvilaCarlosDev"]')).not.toBeNull()
      expect(doc.querySelector('#contacto a[href*="linkedin.com/in/avilacarlosdev"]')).not.toBeNull()
    })
  }
})

describe('formulario: ejemplos claros en los campos', () => {
  it.each([['index.html', 'ejemplo@ejemplo.com'], ['en/index.html', 'example@example.com']])('%s: el correo de ejemplo es %s', (archivo, ejemplo) => {
    const doc = parse(leer(archivo))
    expect(doc.querySelector('#c-correo').getAttribute('placeholder')).toBe(ejemplo)
  })
})
