# Portafolio avilacarlosdev.com — diseño

Fecha: 2026-09-19 · Autor: Carlos Avila · Estado: aprobado por Carlos, en construcción

## Objetivo

Un portafolio corto que **venda**: quién es Carlos, qué ha hecho, su CV y un formulario que funcione. Debe cargar al instante y estar completo en español e inglés.

## Alcance

Una sola página con cinco bloques, en este orden. Es el alcance que Carlos fijó: **quién soy, qué he hecho, los proyectos, el CV y el formulario**.

1. **Presentación:** titular "Del problema a la solución", frase de una línea, botones y retrato.
2. **Quién soy:** presentación breve, datos (rol actual, ubicación, idiomas) y herramientas.
3. **Qué he hecho:** recorrido de 6 puestos con fechas y la formación (incluye certificados). Sus fechas coinciden con el CV y LinkedIn.
4. **Proyectos:** `apis-gratis-es`, `mcp-readiness-check`, `openclaw-skills`, con cifras reales.
5. **CV:** miniatura y descarga en español e inglés.
6. **Contacto:** formulario (Web3Forms) y enlaces a GitHub y LinkedIn.

**Fuera de alcance (decidido por Carlos):** sección "¿Por qué contratarme?" (fue una recomendación mía que él descartó), sección "Hitos" (duplicaba los proyectos), etiquetas numeradas tipo "01 / SECCIÓN", landings de clientes, blog, panel, animaciones pesadas, más páginas.

## Decisiones

| Tema | Decisión | Motivo |
|---|---|---|
| Framework | Astro 7, salida estática, sin JavaScript de framework | Carga instantánea; contenido separado del diseño |
| Idiomas | Dos páginas reales: `/` (ES) y `/en/` (EN), con botón ES/EN | Funciona sin JS, se indexa por idioma, `hreflang` correcto |
| Contenido | `src/i18n/es.json` y `en.json` con la misma estructura | Una prueba exige paridad de claves entre idiomas |
| Menú | Barra fina, fija arriba, con espacio propio reservado | La píldora flotante anterior tapaba el contenido al bajar |
| Tipografía | Instrument Serif (titulares), Inter (texto), JetBrains Mono (etiquetas), autoalojadas | Sin peticiones a Google Fonts; mejor rendimiento y privacidad |
| Marca | Firma `<CA/>` en pixel art + mini-carlos (uno por sección, sin foto real encima) | Identidad propia y memorable |
| Formulario | Web3Forms por `FormData`; solo acepta correos reales (formato, no desechable, dominio con MX) | Sin backend; menos spam; JSON causaba preflight CORS rechazado |
| Imágenes | Todas propias; Astro las optimiza a WebP | Sin dependencias externas |

## Datos que se muestran (todos verificados)

- 22 APIs, 5 demos y 250+ pruebas (`apis-gratis-es`).
- 81 pruebas y 94 % de cobertura (`mcp-readiness-check`).
- 37 skills con procedencia verificada (`openclaw-skills`).
- 6 PRs aceptados en `pythiaLabs`, más `DevSwitch` e `icon-sprite`.
- Cargo: Community & Public Support Specialist · Senior Mentor en 4Geeks Academy.

Nada de cifras inventadas: cada número tiene su repositorio como respaldo.

## Calidad

- **Pruebas** (Vitest): paridad ES/EN, recursos existentes, validación del formulario, y sobre el HTML construido: `lang`, `hreflang`, `og:image` absoluto, anclas y enlaces.
- **CI** (GitHub Actions): lint, build, pruebas, auditoría de dependencias.
- **Seguridad:** cabeceras y CSP en `vercel.json`; la clave de Web3Forms vive en `.env`.

## Despliegue

Vercel. El dominio `avilacarlosdev.com` hoy sirve el sitio anterior: **no se cambia hasta que Carlos apruebe el nuevo**.
