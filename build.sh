#!/usr/bin/env bash
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

rm -rf dist
mkdir -p dist/assets/img

cp src/index.html src/impressum.html src/datenschutz.html src/style.css src/app.js dist/

# Explizite Liste statt Wildcard: schließt Theme-Demo-/Stock-Bilder aus der Quell-Mediathek
# (WordPress-Import-Reste, u.a. Fotolia-Stock-Fotos) sicher vom Deployment aus.
IMAGES="logo-icon.webp hero-lichtshow.webp hero-lichtshow-900.webp bogen-nacht.webp bogen-nacht-900.webp \
  buehne-willkommen.webp regie-mischpult.webp buehne-show.webp \
  kieler-woche-1.webp kieler-woche-1-900.webp kieler-woche-2.webp kieler-woche-3.webp"
for f in $IMAGES; do
  cp "assets/img/$f" "dist/assets/img/$f"
done

echo "dist/ gebaut:"
echo "  HTML/CSS/JS: $(du -ch dist/*.html dist/*.css dist/*.js | tail -1 | cut -f1)"
echo "  Bilder:      $(ls dist/assets/img/*.webp | wc -l) Stück, $(du -sh dist/assets/img | cut -f1)"
echo "  Gesamt:      $(du -sh dist | cut -f1)"
