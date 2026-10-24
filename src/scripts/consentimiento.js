// Analítica con consentimiento previo: Google Analytics (GA4) solo se descarga si el visitante acepta.
// Sin respuesta o con "no", el navegador no contacta a Google ni guarda cookies de analítica.
// La respuesta se recuerda en localStorage; si el almacenamiento está bloqueado, se vuelve a preguntar.
export const CLAVE = 'consentimiento-analitica'

const leer = (almacen) => { try { return almacen.getItem(CLAVE) } catch { return null } }
const guardar = (almacen, valor) => { try { almacen.setItem(CLAVE, valor) } catch { /* modo privado: no se recuerda */ } }

export function cargarAnalitica(id, doc = document, win = window) {
  if (!/^G-[A-Z0-9]+$/.test(id) || win.gtag) return false
  win.dataLayer = win.dataLayer || []
  win.gtag = function () { win.dataLayer.push(arguments) }
  win.gtag('js', new Date())
  // Sin señales de Google ni personalización de anuncios: solo estadística del sitio.
  win.gtag('config', id, { allow_google_signals: false, allow_ad_personalization_signals: false })
  const s = doc.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  doc.head.appendChild(s)
  return true
}

export function iniciar(aviso, id, { almacen = globalThis.localStorage, doc = document, win = window } = {}) {
  const respuesta = leer(almacen)
  if (respuesta === 'si') return cargarAnalitica(id, doc, win)
  if (respuesta === 'no') return false
  aviso.hidden = false
  aviso.querySelector('[data-aceptar]').addEventListener('click', () => {
    guardar(almacen, 'si')
    aviso.hidden = true
    cargarAnalitica(id, doc, win)
  })
  aviso.querySelector('[data-rechazar]').addEventListener('click', () => {
    guardar(almacen, 'no')
    aviso.hidden = true
  })
  return false
}
