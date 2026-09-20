# Arquitectura y decisiones

## Visión general

Sitio estático generado con Astro. No hay servidor ni base de datos. El único servicio externo es Web3Forms, que recibe el formulario y lo entrega por correo.

```text
navegador ──▶ Vercel (HTML estático + cabeceras de seguridad)
   │
   ├─▶ Cloudflare DNS sobre HTTPS   (solo el dominio del correo, para comprobar el registro MX)
   └─▶ api.web3forms.com            (envío del formulario, por FormData)
```

## Decisiones

1. **Dos páginas por idioma, no un selector en JavaScript.** `/` y `/en/` son HTML real: se indexan por separado, funcionan sin JavaScript y el botón ES/EN es un enlace.
2. **Texto separado del diseño.** Todo el contenido vive en `src/i18n/es.json` y `en.json`, con la misma estructura. Una prueba falla si difieren.
3. **`FormData` y no JSON en el formulario.** Enviar JSON obliga al navegador a una comprobación previa CORS (preflight) que Web3Forms rechaza. Con `FormData` es una petición simple.
4. **Validar el correo en tres capas.** Formato estricto, lista de dominios desechables y registro MX consultado por DNS sobre HTTPS. Si el DNS no responde, no se bloquea al visitante. Nada verifica que la persona exista: eso solo lo haría un código enviado por correo.
5. **Barra superior fina y fija con espacio reservado.** La versión anterior era una píldora flotante que tapaba el contenido al bajar.
6. **Sin cookies ni analítica.** Menos superficie de privacidad y ninguna necesidad de aviso de cookies.
7. **Fuentes e imágenes propias.** Sin peticiones a servicios de terceros al cargar; Astro convierte las imágenes a WebP con los tamaños necesarios.
8. **Pruebas sobre el HTML construido.** Verifican lo que recibe el visitante y los buscadores, no lo que el código promete.

## Cómo agregar un idioma

1. Copia `src/i18n/es.json` a `src/i18n/<código>.json` y traduce.
2. Crea la página en `src/pages/<código>/index.astro`, igual que `en/index.astro`.
3. Añade el idioma al selector y a los `hreflang` de `src/layouts/Base.astro`, y al `sitemap.xml`.
4. Ejecuta `npm run build && npm test`: la prueba de paridad indica qué falta.
