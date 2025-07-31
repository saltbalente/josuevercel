#!/bin/bash

# Crear directorios para fuentes
mkdir -p fonts/fontawesome

# Descargar fuentes Font Awesome
echo "Descargando fuentes Font Awesome..."

# Font Awesome Solid 900
wget -O fonts/fontawesome/fa-solid-900.woff2 "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2"
echo "Descargada: fa-solid-900.woff2"

# Font Awesome Brands 400
wget -O fonts/fontawesome/fa-brands-400.woff2 "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.woff2"
echo "Descargada: fa-brands-400.woff2"

# Descargar CSS de Font Awesome
wget -O fonts/fontawesome/all.min.css "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
echo "Descargada: all.min.css"

# Modificar CSS para usar fuentes locales y añadir font-display: swap
sed -i '' 's|../webfonts/|../fonts/fontawesome/|g' fonts/fontawesome/all.min.css
sed -i '' 's|font-family:"Font Awesome 6 Free";|font-family:"Font Awesome 6 Free";font-display:swap;|g' fonts/fontawesome/all.min.css
sed -i '' 's|font-family:"Font Awesome 6 Brands";|font-family:"Font Awesome 6 Brands";font-display:swap;|g' fonts/fontawesome/all.min.css

echo "Optimización de fuentes Font Awesome completada."