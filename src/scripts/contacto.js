// Formulario de contacto -> Web3Forms.
// La clave de acceso es pública por diseño: va en el navegador (PUBLIC_WEB3FORMS_KEY).
const ENDPOINT = 'https://api.web3forms.com/submit'
const DOH = 'https://cloudflare-dns.com/dns-query'

// Dominios de correo desechable y de prueba: no son personas reales.
const DESECHABLES = new Set([
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com', 'temp-mail.org', 'yopmail.com',
  'trashmail.com', 'sharklasers.com', 'getnada.com', 'dispostable.com', 'maildrop.cc', 'throwawaymail.com',
  'fakeinbox.com', 'mailnesia.com', 'mintemail.com', 'example.com', 'example.org', 'test.com', 'prueba.com',
])

const FORMATO = /^[a-z0-9._%+-]+@([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,})$/i

export function dominioDe(correo) {
  return FORMATO.exec((correo ?? '').trim())?.[1].toLowerCase() ?? null
}

/** Formato correcto y dominio que no sea desechable ni de prueba. */
export function correoPlausible(correo) {
  const dominio = dominioDe(correo)
  return Boolean(dominio) && !DESECHABLES.has(dominio)
}

/** Confirma por DNS que el dominio recibe correo (registro MX). Si no se puede consultar, no bloquea. */
export async function dominioRecibeCorreo(dominio, fetchFn = fetch) {
  try {
    const res = await fetchFn(`${DOH}?name=${encodeURIComponent(dominio)}&type=MX`, {
      headers: { Accept: 'application/dns-json' },
    })
    if (!res.ok) return true
    const json = await res.json()
    if (json.Status === 3) return false // NXDOMAIN: el dominio no existe
    return Array.isArray(json.Answer) && json.Answer.some((r) => r.type === 15)
  } catch {
    return true
  }
}

export function validar({ nombre, correo, mensaje }) {
  return Boolean(nombre?.trim()) && correoPlausible(correo) && Boolean(mensaje?.trim())
}

export async function enviar(datos, { clave, fetchFn = fetch } = {}) {
  if (!validar(datos)) return { ok: false, motivo: 'invalido' }
  if (!clave) return { ok: false, motivo: 'sin-clave' }
  try {
    // FormData sin Content-Type propio es una "petición simple": el navegador no hace preflight CORS,
    // que Web3Forms rechaza.
    const cuerpo = new FormData()
    cuerpo.append('access_key', clave)
    cuerpo.append('subject', 'Nuevo mensaje desde avilacarlosdev.com')
    cuerpo.append('from_name', 'Portafolio avilacarlosdev.com')
    cuerpo.append('name', datos.nombre.trim())
    cuerpo.append('email', datos.correo.trim())
    cuerpo.append('message', datos.mensaje.trim())
    cuerpo.append('botcheck', datos.botcheck ?? '')
    const res = await fetchFn(ENDPOINT, { method: 'POST', body: cuerpo })
    const json = await res.json()
    return json.success ? { ok: true } : { ok: false, motivo: 'servicio' }
  } catch {
    return { ok: false, motivo: 'red' }
  }
}

/** Conecta el formulario. Los textos vienen en data-messages (JSON) según el idioma de la página. */
export function conectar(form, { clave = import.meta.env?.PUBLIC_WEB3FORMS_KEY ?? '' } = {}) {
  const mensajes = JSON.parse(form.dataset.messages ?? '{}')
  const estado = form.querySelector('[data-estado]')
  const boton = form.querySelector('button[type=submit]')
  const mostrar = (texto, tipo) => {
    estado.textContent = texto
    estado.dataset.tipo = tipo
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const f = new FormData(form)
    const datos = {
      nombre: f.get('nombre'),
      correo: f.get('correo'),
      mensaje: f.get('mensaje'),
      botcheck: f.get('botcheck'),
    }
    if (!validar(datos)) {
      const soloFallaElCorreo = datos.nombre?.trim() && datos.mensaje?.trim()
      mostrar(soloFallaElCorreo ? mensajes.correoFalso : mensajes.invalido, 'error')
      return
    }
    boton.disabled = true
    mostrar(mensajes.enviando, 'info')
    if (!(await dominioRecibeCorreo(dominioDe(datos.correo)))) {
      mostrar(mensajes.correoFalso, 'error')
      boton.disabled = false
      return
    }
    const r = await enviar(datos, { clave })
    if (r.ok) {
      form.reset()
      mostrar(mensajes.ok, 'ok')
    } else {
      mostrar(mensajes.error, 'error')
    }
    boton.disabled = false
  })
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('form-contacto')
  if (form) conectar(form)
}
