# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed / Cambiado

- The apis-gratis-es card now shows the current published home page (map + weather hero), the same capture used in the GitHub profile, instead of the old demos grid. / La tarjeta de apis-gratis-es muestra ahora la portada publicada actual (mapa y clima), la misma captura que se usa en el perfil de GitHub, en vez de la cuadrícula de demos anterior.
- mcp-readiness-check was removed from featured projects because it is not published on NPM yet; its figures stay in `verificadas.json` only because the CV PDFs still cite them. The section now shows Forja, polaris-local-ai and apis-gratis-es. / mcp-readiness-check salió de proyectos destacados porque todavía no está inscrito en NPM; sus cifras siguen en `verificadas.json` solo porque los CV en PDF todavía las citan. La sección muestra Forja, polaris-local-ai y apis-gratis-es.
- polaris-local-ai now shows its animated floating island (the repository's own 3D scene) instead of a terminal screenshot. It is a 470 KB WebM/MP4 loop (the original animated WebP weighed 1.4 MB) that is not downloaded until the card is on screen, pauses when it leaves and stays still with reduced motion. / polaris-local-ai muestra su isla flotante animada en vez de una captura de terminal: video de 470 KB (el WebP animado original pesaba 1,4 MB) que no se descarga hasta que la tarjeta aparece, se pausa al salir y queda quieto con movimiento reducido.

### Fixed / Corregido

- Forja re-measured (2026-10-07): 160 tests, 109 permission tests and 13 migrations (was 93, 45 and 6). New copy for assigned routines, diet, progress and payments, and a new screenshot with three phone screens. / Forja medida de nuevo: 160 pruebas, 109 de permisos y 13 migraciones (antes 93, 45 y 6). Texto nuevo con rutinas asignadas, dieta, evolución y cobros, y captura nueva con tres pantallas del teléfono.
- apis-gratis-es figures re-measured in a clean clone (2026-10-07): 23 verified APIs, 1777 in the extended directory (unverified, from public-apis), 5 demos and 351 tests (88 Python + 255 Node + 8 parity; was 342). / Cifras de apis-gratis-es medidas de nuevo: 23 APIs verificadas, 1777 en el directorio ampliado (sin verificar), 5 demos y 351 pruebas (antes 342).
- The CV PDF check now compares against `verificadas.cv`, the figures the PDF actually cites (2026-09-20), so the site can show current numbers until the CV is regenerated. / La prueba del CV en PDF compara contra `verificadas.cv`, las cifras que cita el PDF, hasta que se regenere.

### Added / Añadido

- Forja as the featured project: live app, verified figures (93 tests, 45 permission tests, 6 migrations) and a desktop + phone screenshot. / Forja como proyecto destacado: app en vivo, cifras verificadas y captura en PC y teléfono.
- Every project card shows a real screenshot of the product instead of an illustration. / Cada proyecto muestra una captura real del producto en vez de una ilustración.
- "Websites for businesses" block (inside Projects): the 6 demos with live thumbnails, what is included, a 3-step process and a WhatsApp quote button. On phones the demos are a swipeable carousel. / Bloque "Webs para negocios" dentro de Proyectos: las 6 demos con miniatura, qué incluye, el proceso en 3 pasos y botón de WhatsApp; en el teléfono, carrusel deslizable.
- WhatsApp contact (+58 424 622 3267) next to the form. / Contacto por WhatsApp junto al formulario.

### Changed / Cambiado

- Hero in two columns with a clear value proposition for both audiences (teams hiring and businesses) and two calls to action: "See projects" and "Websites for your business". / Hero a dos columnas, con propuesta de valor para los dos públicos y dos llamadas a la acción.
- "Also" fact now reads "Freelance developer: apps and websites for businesses". / El dato "También" ahora dice "Desarrollador freelance: apps y webs para negocios".

### Fixed / Corregido

- 404 page used voseo ("buscás"); a test now checks the whole Spanish copy. / La 404 usaba voseo; una prueba revisa todo el texto en español.
- The CV thumbnail's accessible name now contains its visible text (Lighthouse label-content-name-mismatch). / El nombre accesible de la miniatura del CV contiene su texto visible.
- Layout test ignores items inside intentional scroll containers; page-level horizontal overflow is still checked. / La prueba de diseño ignora lo que está dentro de un carrusel; el desborde de la página se sigue verificando.

### Fixed / Corregido

- Spanish copy now uses tuteo (Venezuelan Spanish) instead of voseo ("Cuéntame en qué puedo ayudarte", "Escríbeme", "Descarga mi CV"). A test rejects voseo forms. / El español usa tuteo (venezolano) y no voseo; una prueba rechaza esas formas.
- The CV PDFs use the verified project figures (23 APIs, 342 tests, 94 tests, 15 skills verified byte for byte). / Los CV en PDF usan las cifras verificadas de los proyectos.
- The email field example is `ejemplo@ejemplo.com` / `example@example.com`. / El ejemplo del campo de correo es `ejemplo@ejemplo.com` / `example@example.com`.

### Changed / Cambiado

- The projects section now shows polaris-local-ai, mcp-readiness-check and apis-gratis-es. openclaw-skills was removed because its repository is archived; its figures stay in `verificadas.json` only because the CV PDFs still cite them. / La sección de proyectos muestra polaris-local-ai, mcp-readiness-check y apis-gratis-es. Se quitó openclaw-skills porque su repositorio está archivado; sus cifras siguen en `verificadas.json` solo porque los CV en PDF todavía las citan.
- "What I have done" now means the projects. The career timeline section was removed (it lives in the CV). / "Qué he hecho" son los proyectos. Se quitó la sección de recorrido laboral (está en el CV).
- Project figures were re-measured in clean clones and corrected: apis-gratis-es 23 APIs, 5 demos and 342 tests (was 22 and "250+"); mcp-readiness-check 94 tests (was 81); openclaw-skills states that 15 of 37 skills are verified byte for byte. / Las cifras de los proyectos se volvieron a medir en clones limpios y se corrigieron.

### Added / Añadido

- "Demos for businesses" block inside the projects section: the six landing demos, each with its live site and repository. / Bloque "Demos para negocios" dentro de proyectos: las seis landings demo, cada una con su sitio en vivo y su repositorio.
- polaris-local-ai figures measured in a clean clone (6 text and vision models, 2 image models, 25 tests). / Cifras de polaris-local-ai medidas en un clon limpio.
- `src/data/verificadas.json` with the command behind every figure, and `tests/cifras.test.js` to keep the site in sync with it. / `src/data/verificadas.json` con el comando de cada cifra y `tests/cifras.test.js` para mantener el sitio sincronizado.
- A "See demos" button for apis-gratis-es (live on GitHub Pages). / Botón "Ver demos" para apis-gratis-es (en vivo en GitHub Pages).

### Added / Añadido

- Real-browser layout tests (overflow, broken images, fonts) at three widths. / Pruebas de diseño en un navegador real (desborde, imágenes rotas y fuentes) en tres anchos.

### Added / Añadido

- "Who I am" and "What I have done" sections (career timeline and education), in both languages. / Secciones "Quién soy" y "Qué he hecho" (recorrido y formación), en ambos idiomas.
- Window dots in the portrait frame use the red, yellow and green colors. / Los puntos del marco del retrato usan los colores rojo, amarillo y verde.

### Changed / Cambiado

- The CV character keeps a margin from the card edge. / El personaje del CV mantiene un margen respecto al borde de la tarjeta.

### Changed / Cambiado

- The page contains only what was agreed: who I am, what I have done, projects, the CV and the contact form. The "Why hire me" section and the numbered section labels were removed. / La página contiene solo lo acordado: quién soy, qué he hecho, el CV y el formulario. Se quitaron la sección "¿Por qué contratarme?" y las etiquetas numeradas de sección.

### Fixed / Corregido

- Horizontal overflow on mobile in the new sections: the mobile rules were declared before the base rules and lost. They now live at the end of the stylesheet. / Desborde horizontal en móvil en las secciones nuevas: las reglas de móvil estaban antes que las reglas base y perdían; ahora van al final de la hoja.

- Fonts are no longer inlined as `data:` URIs, which the CSP blocked. / Las fuentes ya no se incrustan como `data:` URI, que la CSP bloqueaba.

### Added / Añadido

- Community and quality files: license, code of conduct, contributing guide, security policy, issue and pull request templates, Dependabot and CI. / Archivos de comunidad y calidad: licencia, código de conducta, guía de contribución, política de seguridad, plantillas de issues y pull requests, Dependabot y CI.
