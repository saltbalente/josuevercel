// Middleware para Vercel que carga configuraciones basadas en subdominios
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Si se solicita la página de debug, servirla
  if (req.url === '/debug') {
    const debugPath = path.join(__dirname, '..', 'debug-subdomain.html');
    fs.readFile(debugPath, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Debug page not found');
        return;
      }
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(data);
    });
    return;
  }
  
  // Obtener el host de la solicitud
  const host = req.headers.host || '';
  
  // Extraer el subdominio (primera parte del dominio)
  let subdominio = '';
  const hostParts = host.split('.');
  
  // Si hay al menos 3 partes (subdominio.dominio.tld), el subdominio es la primera parte
  if (hostParts.length >= 3) {
    subdominio = hostParts[0];
  }
  
  // Mapeo de subdominios long tail a configuraciones
  const configMap = {
    'brujeria-consulta-gratis': 3,
    'amarres-de-amor-efectivos': 5,
    'brujos-expertos-online': 6,
    'hechizos-de-amor-poderosos': 7,
    'brujeria-blanca-consulta': 8,
    'amarres-rapidos-efectivos': 9,
    'brujos-consulta-gratis': 11,
    'magia-blanca-amarres': 15,
    'hechizos-efectivos-amor': 16,
    'brujeria-poderosa-online': 17,
    'amarres-de-pareja-gratis': 18,
    'brujos-especialistas-amor': 20,
    'consulta-esoterica-gratis': 21
  };
  
  // Determinar qué configuración usar
  let configNum = configMap[subdominio] || null;
  
  // Si no hay subdominio válido, usar la configuración predeterminada
  if (!configNum) {
    // Servir el archivo index.html original sin modificaciones
    const filePath = path.join(__dirname, '..', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error interno del servidor');
        return;
      }
      
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(data);
    });
    return;
  }
  
  // Si hay un subdominio válido, modificar el HTML para cargar la configuración específica
  const filePath = path.join(__dirname, '..', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Error interno del servidor');
      return;
    }
    
    // Reemplazar la referencia a config.js con la configuración específica
    const modifiedData = data.replace(
      '<script src="./js/config.js"></script>',
      `<script src="./js/configs/config-${configNum}.js"></script>`
    );
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(modifiedData);
  });
};