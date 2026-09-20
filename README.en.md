# Avilacarlosdev · portfolio

**English** · [Español](README.md)

[![CI](https://github.com/AvilaCarlosDev/carlos-avila-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AvilaCarlosDev/carlos-avila-portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Portfolio of **Carlos Avila** (developer, community support specialist and senior mentor at 4Geeks Academy). A short site with five blocks: who I am, what I have done, my projects, my downloadable CV and a contact form that only accepts real emails.

**Site:** <https://avilacarlosdev.com> · **CV:** [Spanish](public/Carlos-Avila-CV-ES.pdf) · [English](public/Carlos-Avila-CV-EN.pdf)

## Features

- **Truly bilingual:** two static pages, `/` (Spanish) and `/en/` (English), with an ES/EN button. It works without JavaScript and each language is indexed separately (`hreflang`).
- **Fast:** Astro generates static HTML with no framework JavaScript; images are optimized to WebP and fonts are self-hosted.
- **Complete SEO:** per-language title and description, canonical URL, Open Graph and Twitter, JSON-LD structured data (`Person` and `WebSite`), `sitemap.xml`, `robots.txt`, `manifest.webmanifest` and a 404 page.
- **Accessible:** skip link, a single `h1`, alt text on every image, labeled form, visible focus and `prefers-reduced-motion` support.
- **Private and secure:** no cookies or analytics; security headers and a strict CSP (`vercel.json`); privacy policy in both languages; `security.txt`.
- **A form that filters fake emails:** it validates the format, rejects disposable domains and checks via DNS that the domain receives mail (MX record).

## Tech

Astro 7 · plain CSS · Fontsource (Instrument Serif, Inter, JetBrains Mono) · Vitest · ESLint · GitHub Actions · Vercel

## Getting started

Requirements: Node.js 22 or later.

```bash
npm ci          # install dependencies
cp .env.example .env   # and fill in PUBLIC_WEB3FORMS_KEY
npm run dev     # dev server at http://localhost:4321
npm run lint    # code review
npm run build   # generates dist/
npm test        # tests (needs dist/: run build first)
npm run preview # serve dist/ locally
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `PUBLIC_WEB3FORMS_KEY` | Access key for [Web3Forms](https://web3forms.com). It is public by design: it travels in the browser. Keep it in `.env` (git-ignored) and in the Vercel dashboard. |

## Structure

```text
src/
  i18n/          es.json and en.json: all site text, with the same structure
  components/    Header, Hero, Quien, Trayectoria, Proyectos, Curriculum, Contacto, Footer, Legal
  layouts/       Base.astro: SEO, hreflang, Open Graph, JSON-LD
  pages/         index (ES), en/index, privacidad, en/privacy, 404
  scripts/       contacto.js: form validation and submission
  assets/        images that Astro optimizes
public/          CV PDFs, favicons, og.jpg, robots, sitemap, manifest, security.txt
tests/           tests for content, the form and the built HTML
docs/            design spec and decisions
```

## Tests

`npm test` runs 87 tests in three groups:

- **`i18n.test.js`:** Spanish and English have exactly the same structure, no empty strings, and the figures match.
- **`contacto.test.js`:** email validation (format, disposable domains, MX record) and `FormData` submission.
- **`sitio.test.js`:** on the built HTML, per page: language, title and description, canonical, reciprocal `hreflang`, Open Graph, a single `h1`, JSON-LD, images with `alt` and local, internal links that exist, footer with copyright; and site-wide: `robots.txt`, `sitemap.xml`, manifest, `security.txt`, unindexed 404, a 1200×630 `og.jpg` and security headers.

## Continuous integration

`.github/workflows/ci.yml` runs lint, build, tests and a dependency audit on every push to `main` and on every pull request.

## Deployment

The site is deployed on Vercel. Security headers live in `vercel.json`.

## Documentation

- [Design spec](docs/superpowers/specs/2026-09-19-portafolio-astro-design.md)
- [Architecture and decisions](docs/ARQUITECTURA.md)
- [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Code of conduct](CODE_OF_CONDUCT.md) · [Changelog](CHANGELOG.md)

## License

Code under the [MIT](LICENSE) license. The text, portrait, pixel-art characters and the `<CA/>` signature belong to Carlos Avila and are not to be reused without permission.
