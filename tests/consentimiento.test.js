import { describe, it, expect } from 'vitest'
import { iniciar, cargarAnalitica, CLAVE } from '../src/scripts/consentimiento.js'

// Dobles mínimos de navegador: el módulo solo usa estas piezas del DOM.
const almacen = (inicial = {}) => {
  const d = { ...inicial }
  return { getItem: (k) => d[k] ?? null, setItem: (k, v) => { d[k] = v }, d }
}
const entorno = () => {
  const scripts = []
  const doc = { head: { appendChild: (s) => scripts.push(s) }, createElement: () => ({}) }
  return { doc, win: {}, scripts }
}
const aviso = () => {
  const botones = {}
  return {
    hidden: true,
    botones,
    querySelector: (sel) => ({ addEventListener: (_e, fn) => { botones[sel] = fn } }),
  }
}

describe('consentimiento de analítica', () => {
  it('sin respuesta previa muestra el aviso y no carga nada de Google', () => {
    const { doc, win, scripts } = entorno()
    const a = aviso()
    iniciar(a, 'G-ABC123', { almacen: almacen(), doc, win })
    expect(a.hidden).toBe(false)
    expect(scripts).toEqual([])
    expect(win.gtag).toBeUndefined()
  })

  it('al aceptar guarda la respuesta, oculta el aviso y carga gtag', () => {
    const { doc, win, scripts } = entorno()
    const a = aviso()
    const al = almacen()
    iniciar(a, 'G-ABC123', { almacen: al, doc, win })
    a.botones['[data-aceptar]']()
    expect(al.d[CLAVE]).toBe('si')
    expect(a.hidden).toBe(true)
    expect(scripts[0].src).toBe('https://www.googletagmanager.com/gtag/js?id=G-ABC123')
  })

  it('al rechazar guarda la respuesta y no carga nada', () => {
    const { doc, win, scripts } = entorno()
    const a = aviso()
    const al = almacen()
    iniciar(a, 'G-ABC123', { almacen: al, doc, win })
    a.botones['[data-rechazar]']()
    expect(al.d[CLAVE]).toBe('no')
    expect(a.hidden).toBe(true)
    expect(scripts).toEqual([])
  })

  it('recuerda la respuesta: con "si" carga directo y con "no" no muestra el aviso', () => {
    const e1 = entorno()
    const a1 = aviso()
    iniciar(a1, 'G-ABC123', { almacen: almacen({ [CLAVE]: 'si' }), ...e1 })
    expect(e1.scripts).toHaveLength(1)
    expect(a1.hidden).toBe(true)

    const e2 = entorno()
    const a2 = aviso()
    iniciar(a2, 'G-ABC123', { almacen: almacen({ [CLAVE]: 'no' }), ...e2 })
    expect(e2.scripts).toEqual([])
    expect(a2.hidden).toBe(true)
  })

  it('rechaza IDs que no son de GA4 y no carga dos veces', () => {
    const { doc, win, scripts } = entorno()
    expect(cargarAnalitica('UA-123', doc, win)).toBe(false)
    expect(cargarAnalitica('G-ABC123"><script>', doc, win)).toBe(false)
    expect(cargarAnalitica('G-ABC123', doc, win)).toBe(true)
    expect(cargarAnalitica('G-ABC123', doc, win)).toBe(false)
    expect(scripts).toHaveLength(1)
  })

  it('si el almacenamiento falla (modo privado), sigue funcionando', () => {
    const { doc, win, scripts } = entorno()
    const roto = { getItem: () => { throw new Error('bloqueado') }, setItem: () => { throw new Error('bloqueado') } }
    const a = aviso()
    iniciar(a, 'G-ABC123', { almacen: roto, doc, win })
    expect(a.hidden).toBe(false)
    a.botones['[data-aceptar]']()
    expect(scripts).toHaveLength(1)
  })
})
