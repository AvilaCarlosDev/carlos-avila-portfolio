import { describe, it, expect } from 'vitest'
import { clasificar, evento, escuchar } from '../src/scripts/conversiones.js'

describe('conversiones: qué enlace es un contacto', () => {
  it.each([
    ['https://wa.me/584246223267?text=Hola', { nombre: 'contactar_whatsapp' }],
    ['https://api.whatsapp.com/send?phone=58424', { nombre: 'contactar_whatsapp' }],
    ['mailto:contacto@avilacarlosdev.com', { nombre: 'contactar_correo' }],
    ['/Carlos-Avila-CV-ES.pdf', { nombre: 'descargar_cv', params: { idioma: 'es' } }],
    ['https://avilacarlosdev.com/Carlos-Avila-CV-EN.pdf', { nombre: 'descargar_cv', params: { idioma: 'en' } }],
  ])('%s', (href, esperado) => {
    expect(clasificar(href)).toEqual(esperado)
  })

  it('los demás enlaces no cuentan', () => {
    for (const href of ['/', '#proyectos', 'https://github.com/AvilaCarlosDev', '/proyectos/demo.pdf', null]) {
      expect(clasificar(href)).toBeNull()
    }
  })
})

describe('conversiones: envío a Google Analytics', () => {
  it('sin gtag (el visitante no aceptó) no hace nada ni falla', () => {
    expect(evento('generate_lead', {}, {})).toBe(false)
  })

  it('con gtag envía el evento con sus parámetros', () => {
    const llamadas = []
    const win = { gtag: (...a) => llamadas.push(a) }
    expect(evento('generate_lead', { method: 'formulario' }, win)).toBe(true)
    expect(llamadas).toEqual([['event', 'generate_lead', { method: 'formulario' }]])
  })

  it('escucha los clics de toda la página y solo envía los de contacto', () => {
    const llamadas = []
    const win = { gtag: (...a) => llamadas.push(a) }
    let manejador
    const doc = { addEventListener: (tipo, fn) => { if (tipo === 'click') manejador = fn } }
    escuchar(doc, win)
    const clic = (href) => manejador({ target: { closest: () => (href ? { getAttribute: () => href } : null) } })
    clic('https://wa.me/584246223267')
    clic('https://github.com/AvilaCarlosDev')
    clic(null)
    clic('/Carlos-Avila-CV-EN.pdf')
    expect(llamadas).toEqual([
      ['event', 'contactar_whatsapp', {}],
      ['event', 'descargar_cv', { idioma: 'en' }],
    ])
  })
})
