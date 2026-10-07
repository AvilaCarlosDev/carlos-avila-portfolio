// Videos de los proyectos (la isla de polaris-local-ai): no se descargan hasta que la tarjeta
// aparece en pantalla y se pausan al salir. Con movimiento reducido se queda la imagen fija.
const quieto = matchMedia('(prefers-reduced-motion: reduce)')

const observador = new IntersectionObserver((entradas) => {
  for (const { target: v, isIntersecting } of entradas) {
    if (isIntersecting && !quieto.matches) v.play().catch(() => {})
    else v.pause()
  }
}, { threshold: 0.35 })

for (const v of document.querySelectorAll('video.anim')) {
  v.muted = true
  observador.observe(v)
}
