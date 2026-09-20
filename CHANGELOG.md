# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed / Corregido

- Spanish copy now uses tuteo (Venezuelan Spanish) instead of voseo ("Cuéntame en qué puedo ayudarte", "Escríbeme", "Descarga mi CV"). A test rejects voseo forms. / El español usa tuteo (venezolano) y no voseo; una prueba rechaza esas formas.
- The CV PDFs use the verified project figures (23 APIs, 342 tests, 94 tests, 15 skills verified byte for byte). / Los CV en PDF usan las cifras verificadas de los proyectos.
- The email field example is `ejemplo@ejemplo.com` / `example@example.com`. / El ejemplo del campo de correo es `ejemplo@ejemplo.com` / `example@example.com`.

### Changed / Cambiado

- "What I have done" now means the projects. The career timeline section was removed (it lives in the CV). / "Qué he hecho" son los proyectos. Se quitó la sección de recorrido laboral (está en el CV).
- Project figures were re-measured in clean clones and corrected: apis-gratis-es 23 APIs, 5 demos and 342 tests (was 22 and "250+"); mcp-readiness-check 94 tests (was 81); openclaw-skills states that 15 of 37 skills are verified byte for byte. / Las cifras de los proyectos se volvieron a medir en clones limpios y se corrigieron.

### Added / Añadido

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
