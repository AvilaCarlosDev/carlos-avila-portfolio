import { defineConfig } from 'astro/config'

// Sitio estático bilingüe: "/" (español) y "/en/" (inglés).
export default defineConfig({
  site: 'https://avilacarlosdev.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  // La CSP (font-src/img-src 'self') no permite data: URIs: los recursos pequeños se emiten como archivos.
  vite: { build: { assetsInlineLimit: 0 } },
})
