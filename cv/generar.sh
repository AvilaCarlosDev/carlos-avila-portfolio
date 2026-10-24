#!/usr/bin/env bash
# Genera los CV en PDF desde cv/cv-es.html y cv/cv-en.html con Chromium sin interfaz.
# Uso: bash cv/generar.sh   (necesita node_modules instalado por las fuentes)
set -euo pipefail
cd "$(dirname "$0")"
CHROME="${CHROME:-$(command -v chromium || command -v google-chrome || command -v chromium-browser)}"
for lang in es en; do
  "$CHROME" --headless=new --disable-gpu --allow-file-access-from-files --no-pdf-header-footer \
    --print-to-pdf="../public/Carlos-Avila-CV-${lang^^}.pdf" "file://$PWD/cv-${lang}.html" 2>/dev/null
  echo "public/Carlos-Avila-CV-${lang^^}.pdf"
done
