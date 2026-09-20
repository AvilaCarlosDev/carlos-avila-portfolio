import { defineConfig } from 'astro/config'

// Sitio estático bilingüe: "/" (español) y "/en/" (inglés).
export default defineConfig({
  site: 'https://avilacarlosdev.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
})
