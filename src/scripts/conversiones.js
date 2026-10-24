// Conversiones para Google Analytics: los contactos que deja la web (formulario, WhatsApp, correo, CV).
// Si el visitante no aceptó la analítica no existe window.gtag y no se envía nada.

/** Devuelve el evento que corresponde a un enlace, o null si no es un contacto. */
export function clasificar(href) {
  if (!href) return null
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return { nombre: 'contactar_whatsapp' }
  if (href.startsWith('mailto:')) return { nombre: 'contactar_correo' }
  const cv = href.match(/Carlos-Avila-CV-(ES|EN)\.pdf$/)
  if (cv) return { nombre: 'descargar_cv', params: { idioma: cv[1].toLowerCase() } }
  return null
}

export function evento(nombre, params = {}, win = window) {
  if (typeof win.gtag !== 'function') return false
  win.gtag('event', nombre, params)
  return true
}

/** Un solo listener para toda la página: cubre también los enlaces que se añadan después. */
export function escuchar(doc = document, win = window) {
  doc.addEventListener('click', (e) => {
    const c = clasificar(e.target.closest?.('a[href]')?.getAttribute('href'))
    if (c) evento(c.nombre, c.params ?? {}, win)
  })
}
