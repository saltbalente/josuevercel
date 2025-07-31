/**
 * Script para probar diferentes configuraciones localmente
 * Ejecutar con: node test-config.js <número-de-configuración>
 * Ejemplo: node test-config.js 3
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Obtener el número de configuración de los argumentos de la línea de comandos
const configNum = process.argv[2];

// Verificar que se proporcionó un número de configuración válido
if (!configNum || isNaN(parseInt(configNum))) {
  console.error('Error: Debes proporcionar un número de configuración válido.');
  console.error('Uso: node test-config.js <número-de-configuración>');
  console.error('Ejemplo: node test-config.js 3');
  process.exit(1);
}

// Verificar que el archivo de configuración existe
const configPath = path.join(__dirname, 'js', 'configs', `config-${configNum}.js`);
if (!fs.existsSync(configPath)) {
  console.error(`Error: El archivo de configuración config-${configNum}.js no existe.`);
  process.exit(1);
}

// Leer el archivo index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent;

try {
  indexContent = fs.readFileSync(indexPath, 'utf8');
} catch (err) {
  console.error('Error al leer el archivo index.html:', err);
  process.exit(1);
}

// Reemplazar la referencia a config.js con la configuración específica
const modifiedContent = indexContent.replace(
  '<script src="./js/config.js"></script>',
  `<script src="./js/configs/config-${configNum}.js"></script>`
);

// Crear un servidor HTTP para servir el contenido modificado
const server = http.createServer((req, res) => {
  // Servir el HTML modificado para la ruta principal
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(modifiedContent);
    return;
  }

  // Para otras rutas, intentar servir el archivo correspondiente
  const filePath = path.join(__dirname, req.url);
  
  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // El archivo no existe
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Archivo no encontrado');
      return;
    }

    // Determinar el tipo de contenido basado en la extensión del archivo
    const ext = path.extname(filePath);
    let contentType = 'text/plain';
    
    switch (ext) {
      case '.html':
        contentType = 'text/html';
        break;
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.woff':
      case '.woff2':
        contentType = 'font/woff2';
        break;
    }

    // Leer y servir el archivo
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

// Puerto para el servidor
const PORT = 3031;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  console.log(`Mostrando la configuración ${configNum} (${configPath})`);
  console.log('Presiona Ctrl+C para detener el servidor');
});