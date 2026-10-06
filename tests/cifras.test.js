// Las cifras que muestra el sitio deben coincidir con las medidas en los repositorios
// (src/data/verificadas.json). Nada de números inventados ni desactualizados.
import { describe, it, expect } from 'vitest'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import es from '../src/i18n/es.json'
import en from '../src/i18n/en.json'
import verificadas from '../src/data/verificadas.json'

const V = verificadas.proyectos
const numeros = (textos) => textos.join(' ').match(/\d+/g)?.map(Number) ?? []
const item = (d, id) => d.proyectos.items.find((i) => i.id === id)

describe('cifras verificadas de los proyectos', () => {
  for (const [nombre, d] of [['ES', es], ['EN', en]]) {
    it(`${nombre}: apis-gratis-es muestra 23 APIs, 5 demos y 342 pruebas`, () => {
      const n = numeros(item(d, 'apis-gratis-es').numbers)
      expect(n).toEqual([V['apis-gratis-es'].apis, V['apis-gratis-es'].demos, V['apis-gratis-es'].pruebas])
      const suma = Object.values(V['apis-gratis-es'].detalle).reduce((a, b) => a + b, 0)
      expect(suma).toBe(V['apis-gratis-es'].pruebas)
    })

    it(`${nombre}: mcp-readiness-check muestra 94 pruebas y 94 % de cobertura`, () => {
      const n = numeros(item(d, 'mcp-readiness-check').numbers)
      expect(n).toEqual([V['mcp-readiness-check'].pruebas, V['mcp-readiness-check'].cobertura])
      expect(Math.round(V['mcp-readiness-check'].detalle['sentencias %'])).toBe(V['mcp-readiness-check'].cobertura)
    })

    it(`${nombre}: polaris-local-ai muestra 6 modelos de texto y visión, 2 de imagen y 25 pruebas`, () => {
      const o = V['polaris-local-ai']
      const n = numeros(item(d, 'polaris-local-ai').numbers)
      expect(n).toEqual([o.modelosTextoVision, o.modelosImagen, o.pruebas])
    })

    it(`${nombre}: no queda ninguna cifra antigua o inventada`, () => {
      const texto = JSON.stringify(d.proyectos)
      for (const viejo of ['250+', '81 ', '22 API', '81 tests', '81 pruebas']) expect(texto, viejo).not.toContain(viejo)
    })
  }

  it('la fecha de medición está registrada y no es futura', () => {
    expect(new Date(verificadas.fecha).getTime()).toBeLessThanOrEqual(Date.now())
  })

  it('los proyectos de la página son exactamente los tres elegidos, con enlace a su repositorio', () => {
    for (const d of [es, en]) {
      expect(d.proyectos.items.map((i) => i.id)).toEqual(['polaris-local-ai', 'mcp-readiness-check', 'apis-gratis-es'])
      for (const i of d.proyectos.items) expect(i.url).toBe(`https://github.com/AvilaCarlosDev/${i.id}`)
    }
  })

  it('las demos para negocios son las seis landings, con demo en vivo y repositorio', () => {
    const rubros = ['delivery', 'barberia', 'deportes', 'ferreteria', 'floristeria', 'taxi']
    for (const d of [es, en]) {
      expect(d.proyectos.demos.items.map((i) => i.id)).toEqual(rubros.map((r) => `landing-${r}-demo`))
      for (const [k, i] of d.proyectos.demos.items.entries()) {
        expect(i.url).toBe(`https://github.com/AvilaCarlosDev/${i.id}`)
        expect(i.demoUrl).toBe(`https://agencia-web-${rubros[k]}-demo.vercel.app/`)
      }
    }
  })
})

const pdftotext = spawnSync('pdftotext', ['-v']).error === undefined
const textoPdf = (f) => spawnSync('pdftotext', [resolve(import.meta.dirname, '../public', f), '-'], { encoding: 'utf8' }).stdout.replace(/\s+/g, ' ')

describe.skipIf(!pdftotext)('el CV en PDF usa las mismas cifras verificadas', () => {
  const V2 = verificadas.proyectos
  for (const f of ['Carlos-Avila-CV-ES.pdf', 'Carlos-Avila-CV-EN.pdf']) {
    it(`${f}: cifras actuales y ninguna antigua`, () => {
      const t = textoPdf(f)
      for (const c of [V2['apis-gratis-es'].apis, V2['apis-gratis-es'].pruebas, V2['mcp-readiness-check'].pruebas, V2['openclaw-skills'].byteAByte]) expect(t, String(c)).toContain(String(c))
      for (const viejo of [/22 (APIs|free)/, /250/, / 81 /]) expect(t, String(viejo)).not.toMatch(viejo)
    })
  }
})
