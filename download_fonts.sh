#!/bin/bash

# Crear directorio de fuentes si no existe
mkdir -p fonts

# Descargar fuentes Cinzel desde Google Fonts
echo "Descargando fuentes Cinzel..."

# Cinzel Regular (400)
wget -O fonts/cinzel-v23-latin-400.woff2 "https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-tbnfYPlDX5Z.woff2"
echo "Descargada: cinzel-v23-latin-400.woff2"

# Cinzel Bold (700)
wget -O fonts/cinzel-v23-latin-700.woff2 "https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-jHgfYPlDX5Z.woff2"
echo "Descargada: cinzel-v23-latin-700.woff2"

echo "Descarga de fuentes completada."