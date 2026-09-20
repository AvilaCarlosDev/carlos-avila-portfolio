import { describe, it, expect, vi } from 'vitest'
import {
  dominioDe,
  correoPlausible,
  dominioRecibeCorreo,
  validar,
  enviar,
} from '../src/scripts/contacto.js'

const datosOk = { nombre: 'Ana Pérez', correo: 'ana@correo.com', mensaje: 'Hola Carlos' }

describe('correo: formato y plausibilidad', () => {
  it.each(['ana@correo.com', 'Ana.Real+prueba@gmail.com', 'a_b-c@sub.dominio.co'])('acepta %s', (c) => {
    expect(correoPlausible(c)).toBe(true)
  })

  it.each(['a@a.a', 'ana@localhost', 'sin-arroba.com', 'ana@', '@correo.com', 'ana@correo', 'ana perez@correo.com', ''])(
    'rechaza %j',
    (c) => {
      expect(correoPlausible(c)).toBe(false)
    },
  )

  it.each(['x@mailinator.com', 'x@yopmail.com', 'ana@example.com', 'x@test.com'])('rechaza dominios desechables o de prueba: %s', (c) => {
    expect(correoPlausible(c)).toBe(false)
  })

  it('extrae el dominio en minúsculas', () => {
    expect(dominioDe('Ana@CORREO.com')).toBe('correo.com')
    expect(dominioDe('no-es-correo')).toBeNull()
  })
})

describe('dominio: registro MX por DNS', () => {
  const doh = (json, ok = true) => vi.fn().mockResolvedValue({ ok, json: async () => json })

  it('acepta un dominio con registro MX', async () => {
    const f = doh({ Status: 0, Answer: [{ type: 15, data: '10 mx.correo.com.' }] })
    expect(await dominioRecibeCorreo('correo.com', f)).toBe(true)
    expect(f.mock.calls[0][0]).toContain('name=correo.com&type=MX')
  })

  it('rechaza un dominio que no existe (NXDOMAIN)', async () => {
    expect(await dominioRecibeCorreo('no-existe.invalid', doh({ Status: 3 }))).toBe(false)
  })

  it('rechaza un dominio que existe pero no recibe correo', async () => {
    expect(await dominioRecibeCorreo('solo-web.com', doh({ Status: 0, Answer: [{ type: 1, data: '1.2.3.4' }] }))).toBe(false)
  })

  it('no bloquea si el servicio DNS falla (red caída o respuesta no válida)', async () => {
    expect(await dominioRecibeCorreo('correo.com', vi.fn().mockRejectedValue(new Error('red')))).toBe(true)
    expect(await dominioRecibeCorreo('correo.com', doh({}, false))).toBe(true)
  })
})

describe('validar', () => {
  it('requiere nombre, correo plausible y mensaje', () => {
    expect(validar(datosOk)).toBe(true)
    expect(validar({ ...datosOk, nombre: '  ' })).toBe(false)
    expect(validar({ ...datosOk, mensaje: '' })).toBe(false)
    expect(validar({ ...datosOk, correo: 'x@mailinator.com' })).toBe(false)
  })
})

describe('enviar a Web3Forms', () => {
  it('envía FormData (petición simple, sin preflight) con los campos y la clave', async () => {
    const f = vi.fn().mockResolvedValue({ json: async () => ({ success: true }) })
    const r = await enviar({ ...datosOk, botcheck: '' }, { clave: 'clave-123', fetchFn: f })
    expect(r).toEqual({ ok: true })
    const [url, init] = f.mock.calls[0]
    expect(url).toBe('https://api.web3forms.com/submit')
    expect(init.method).toBe('POST')
    expect(init.body).toBeInstanceOf(FormData)
    expect(init.headers?.['Content-Type']).toBeUndefined()
    expect(init.body.get('access_key')).toBe('clave-123')
    expect(init.body.get('name')).toBe('Ana Pérez')
    expect(init.body.get('email')).toBe('ana@correo.com')
    expect(init.body.get('message')).toBe('Hola Carlos')
  })

  it('no envía nada si los datos no son válidos', async () => {
    const f = vi.fn()
    expect(await enviar({ ...datosOk, correo: 'a@a.a' }, { clave: 'k', fetchFn: f })).toEqual({ ok: false, motivo: 'invalido' })
    expect(f).not.toHaveBeenCalled()
  })

  it('no envía si falta la clave', async () => {
    const f = vi.fn()
    expect(await enviar(datosOk, { clave: '', fetchFn: f })).toEqual({ ok: false, motivo: 'sin-clave' })
    expect(f).not.toHaveBeenCalled()
  })

  it('informa error del servicio y error de red', async () => {
    const rechazo = vi.fn().mockResolvedValue({ json: async () => ({ success: false }) })
    expect(await enviar(datosOk, { clave: 'k', fetchFn: rechazo })).toEqual({ ok: false, motivo: 'servicio' })
    const caida = vi.fn().mockRejectedValue(new Error('red'))
    expect(await enviar(datosOk, { clave: 'k', fetchFn: caida })).toEqual({ ok: false, motivo: 'red' })
  })
})
