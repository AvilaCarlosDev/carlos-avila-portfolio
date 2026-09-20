import js from '@eslint/js'
import globals from 'globals'
import astro from 'eslint-plugin-astro'

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/'] },
  js.configs.recommended,
  ...astro.configs.recommended,
  { files: ['**/*.{js,mjs}', '**/*.astro'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
]
