// Pruebas de diseño en un navegador real (Chrome) sobre el sitio construido.
// Detectan lo que el HTML no muestra: desbordes, imágenes rotas, fuentes sin cargar.
// Necesitan Chrome o Chromium; si no hay, se omiten con un aviso (en GitHub Actions sí hay).
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import { chromium } from 'playwright-core'

const dist = resolve(import.meta.dirname, '../dist')
const CHROME = [process.env.CHROME_PATH, '/usr/bin/google-chrome-stable', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find((p) => p && existsSync(p))
const TIPOS = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.ico': 'image/x-icon', '.pdf': 'application/pdf' }

let servidor, base, navegador

beforeAll(async () => {
  if (!CHROME) return
  servidor = createServer((req, res) => {
    let ruta = resolve(dist, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (existsSync(ruta) && statSync(ruta).isDirectory()) ruta = resolve(ruta, 'index.html')
    if (!existsSync(ruta)) { res.writeHead(404); return res.end('no encontrado') }
    res.writeHead(200, { 'content-type': TIPOS[extname(ruta)] ?? 'application/octet-stream' })
    res.end(readFileSync(ruta))
  })
  await new Promise((r) => servidor.listen(0, '127.0.0.1', r))
  base = `http://127.0.0.1:${servidor.address().port}`
  navegador = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] })
}, 60000)

afterAll(async () => {
  await navegador?.close()
  await new Promise((r) => (servidor ? servidor.close(r) : r()))
})

const PAGINAS = ['/', '/en/', '/privacidad/', '/en/privacy/']
const ANCHOS = [{ nombre: 'móvil', width: 390, height: 844 }, { nombre: 'tableta', width: 820, height: 1100 }, { nombre: 'escritorio', width: 1440, height: 900 }]

describe.skipIf(!CHROME)('diseño en un navegador real', () => {
  for (const ruta of PAGINAS) {
    for (const v of ANCHOS) {
      it(`${ruta} en ${v.nombre} (${v.width}px): sin desborde horizontal, sin imágenes rotas y fuentes cargadas`, async () => {
        const pagina = await navegador.newPage({ viewport: { width: v.width, height: v.height } })
        const errores = []
        pagina.on('pageerror', (e) => errores.push(String(e)))
        await pagina.goto(base + ruta, { waitUntil: 'networkidle' })
        await pagina.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager')))
        await pagina.waitForTimeout(500)
        const r = await pagina.evaluate(() => {
          const vw = innerWidth
          const ofensores = [...document.querySelectorAll('body *')]
            .filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.right > vw + 1 })
            .slice(0, 5)
            .map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`)
          return {
            ofensores,
            desborde: document.documentElement.scrollWidth - vw,
            rotas: [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')),
            fuente: document.fonts.check('40px "Instrument Serif"') && document.fonts.check('16px "Inter Variable"'),
          }
        })
        await pagina.close()
        expect(r.ofensores, 'elementos que se salen del ancho').toEqual([])
        expect(r.desborde).toBeLessThanOrEqual(0)
        expect(r.rotas).toEqual([])
        expect(r.fuente, 'fuentes propias cargadas').toBe(true)
        expect(errores).toEqual([])
      }, 30000)
    }
  }
})

// En CI un navegador es obligatorio: sin él, estas pruebas no protegerían nada.
describe.runIf(process.env.CI && !CHROME)('navegador en CI', () => {
  it('Chrome o Chromium está disponible', () => {
    expect.fail('No se encontró Chrome/Chromium. Define CHROME_PATH o instala uno en el runner.')
  })
})
