// Las cifras que muestra el sitio deben coincidir con las medidas en los repositorios
// (src/data/verificadas.json). Nada de números inventados ni desactualizados.
import { describe, it, expect } from 'vitest'
import es from '../src/i18n/es.json'
import en from '../src/i18n/en.json'
import verificadas from '../src/data/verificadas.json'

const V = verificadas.proyectos
const numeros = (textos) => textos.join(' ').match(/\d+/g)?.map(Number) ?? []
const item = (d, id) => d.proyectos.items.find((i) => i.id === id)
const todo = (d, id) => [...item(d, id).numbers, item(d, id).description]

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

    it(`${nombre}: openclaw-skills distingue las verificadas byte a byte de las derivadas y propias`, () => {
      const o = V['openclaw-skills']
      expect(o.byteAByte + o.derivadas + o.propias).toBe(o.skills)
      const n = numeros(todo(d, 'openclaw-skills'))
      for (const cifra of [o.skills, o.byteAByte, o.derivadas, o.propias, o.pruebas]) expect(n, String(cifra)).toContain(cifra)
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
      expect(d.proyectos.items.map((i) => i.id)).toEqual(['apis-gratis-es', 'mcp-readiness-check', 'openclaw-skills'])
      for (const i of d.proyectos.items) expect(i.url).toBe(`https://github.com/AvilaCarlosDev/${i.id}`)
    }
  })
})
