# Avilacarlosdev · portafolio

[English](README.en.md) · **Español**

[![CI](https://github.com/AvilaCarlosDev/carlos-avila-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AvilaCarlosDev/carlos-avila-portfolio/actions/workflows/ci.yml)
[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-blue.svg)](LICENSE)

Portafolio de **Carlos Avila** (desarrollador, especialista en soporte a la comunidad y mentor senior en 4Geeks Academy). Un sitio corto con cinco bloques: quién soy, qué he hecho, mis proyectos, mi CV descargable y un formulario de contacto que solo acepta correos reales.

**Sitio:** <https://avilacarlosdev.com> · **CV:** [español](public/Carlos-Avila-CV-ES.pdf) · [inglés](public/Carlos-Avila-CV-EN.pdf)

## Características

- **Bilingüe de verdad:** dos páginas estáticas, `/` (español) y `/en/` (inglés), con botón ES/EN. Funciona sin JavaScript y cada idioma se indexa por separado (`hreflang`).
- **Rápido:** Astro genera HTML estático sin JavaScript de framework; las imágenes se optimizan a WebP y las fuentes se sirven desde el propio sitio.
- **SEO completo:** título y descripción por idioma, URL canónica, Open Graph y Twitter, datos estructurados JSON-LD (`Person` y `WebSite`), `sitemap.xml`, `robots.txt`, `manifest.webmanifest` y página 404.
- **Accesible:** enlace de salto, un solo `h1`, texto alternativo en todas las imágenes, formulario etiquetado, foco visible y respeto a `prefers-reduced-motion`.
- **Privado y seguro:** sin cookies ni analítica; cabeceras de seguridad y CSP restrictiva (`vercel.json`); política de privacidad en ambos idiomas; `security.txt`.
- **Formulario que filtra correos falsos:** valida el formato, rechaza dominios desechables y comprueba por DNS que el dominio recibe correo (registro MX).

## Tecnología

Astro 7 · CSS propio · Fontsource (Instrument Serif, Inter, JetBrains Mono) · Vitest · ESLint · GitHub Actions · Vercel

## Cómo usarlo

Requisitos: Node.js 22 o superior.

```bash
npm ci          # instala dependencias
cp .env.example .env   # y completa PUBLIC_WEB3FORMS_KEY
npm run dev     # servidor de desarrollo en http://localhost:4321
npm run lint    # revisión de código
npm run build   # genera dist/
npm test        # pruebas (requiere dist/: ejecuta build antes)
npm run preview # sirve dist/ localmente
```

### Variables de entorno

| Variable | Para qué sirve |
| --- | --- |
| `PUBLIC_WEB3FORMS_KEY` | Clave de acceso de [Web3Forms](https://web3forms.com). Es pública por diseño: viaja en el navegador. Se guarda en `.env` (ignorado por git) y en el panel de Vercel. |

## Estructura

```text
src/
  i18n/          es.json y en.json: todo el texto del sitio, con la misma estructura
  components/    Header, Hero, Quien, Trayectoria, Proyectos, Curriculum, Contacto, Footer, Legal
  layouts/       Base.astro: SEO, hreflang, Open Graph, JSON-LD
  pages/         index (ES), en/index, privacidad, en/privacy, 404
  scripts/       contacto.js: validación y envío del formulario
  assets/        imágenes que Astro optimiza
public/          CV en PDF, favicons, og.jpg, robots, sitemap, manifest, security.txt
tests/           pruebas del contenido, del formulario y del HTML construido
docs/            spec de diseño y decisiones
```

## Pruebas

`npm test` ejecuta 85 pruebas en tres grupos:

- **`i18n.test.js`:** español e inglés tienen exactamente la misma estructura, sin textos vacíos, y las cifras coinciden.
- **`contacto.test.js`:** validación del correo (formato, dominios desechables, registro MX) y envío por `FormData`.
- **`sitio.test.js`:** sobre el HTML ya construido, por página: idioma, título y descripción, canonical, `hreflang` recíproco, Open Graph, un solo `h1`, JSON-LD, imágenes con `alt` y locales, enlaces internos que existen, pie con copyright; y a nivel de sitio: `robots.txt`, `sitemap.xml`, manifest, `security.txt`, 404 sin indexar, `og.jpg` de 1200×630 y cabeceras de seguridad.

## Integración continua

`.github/workflows/ci.yml` ejecuta lint, build, pruebas y auditoría de dependencias en cada push a `main` y en cada pull request.

## Despliegue

El sitio se despliega en Vercel. Las cabeceras de seguridad viven en `vercel.json`.

## Documentación

- [Spec de diseño](docs/superpowers/specs/2026-09-19-portafolio-astro-design.md)
- [Arquitectura y decisiones](docs/ARQUITECTURA.md)
- [Contribuir](CONTRIBUTING.md) · [Seguridad](SECURITY.md) · [Código de conducta](CODE_OF_CONDUCT.md) · [Cambios](CHANGELOG.md)

## Licencia

Código bajo licencia [MIT](LICENSE). El texto, el retrato, los personajes en pixel art y la firma `<CA/>` son de Carlos Avila y no se reutilizan sin permiso.
