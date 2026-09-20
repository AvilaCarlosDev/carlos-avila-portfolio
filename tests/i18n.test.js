import { describe, it, expect } from 'vitest'
import es from '../src/i18n/es.json'
import en from '../src/i18n/en.json'

const forma = (v) => {
  if (Array.isArray(v)) return v.map(forma)
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, forma(x)]))
  return typeof v
}
const hojas = (v, ruta = '') =>
  Array.isArray(v)
    ? v.flatMap((x, i) => hojas(x, `${ruta}[${i}]`))
    : v && typeof v === 'object'
      ? Object.entries(v).flatMap(([k, x]) => hojas(x, ruta ? `${ruta}.${k}` : k))
      : [[ruta, v]]

describe('contenido bilingüe', () => {
  it('ES y EN tienen exactamente la misma estructura (claves, listas y tipos)', () => {
    expect(forma(en)).toEqual(forma(es))
  })

  it('no hay textos vacíos en ningún idioma', () => {
    for (const [nombre, d] of [['es', es], ['en', en]]) {
      const vacios = hojas(d).filter(([, v]) => typeof v === 'string' && !v.trim()).map(([r]) => r)
      expect(vacios, `vacíos en ${nombre}`).toEqual([])
    }
  })

  it('cada idioma declara su propio código y el otro idioma como destino del botón', () => {
    expect([es.lang, en.lang]).toEqual(['es', 'en'])
    expect(es.nav.switchTo.hreflang).toBe('en')
    expect(en.nav.switchTo.hreflang).toBe('es')
  })

  it('las cifras de los proyectos coinciden entre idiomas', () => {
    const cifras = (d) => d.proyectos.items.map((i) => i.numbers.map((n) => n.match(/\d+/)?.[0]))
    expect(cifras(en)).toEqual(cifras(es))
  })

  it('los enlaces externos son idénticos en ambos idiomas', () => {
    const urls = (d) => d.proyectos.items.map((i) => i.url)
    expect(urls(en)).toEqual(urls(es))
  })
})

describe('español venezolano: tuteo, sin voseo rioplatense', () => {
  // Carlos es venezolano y habla de tú. Estas formas son del voseo (contame, escribime, podés, vos...).
  const VOSEO = /\b(vos|contame|escribime|escribile|decime|mirá|probá|completá|usá|descargá|elegí|fijate|podés|tenés|querés|sabés|escribís|leés|acá|dale)\b/i

  it('es.json no contiene formas de voseo', () => {
    const hits = hojas(es).filter(([, v]) => typeof v === 'string' && VOSEO.test(v)).map(([r, v]) => `${r}: ${v.match(VOSEO)[0]}`)
    expect(hits).toEqual([])
  })
})
