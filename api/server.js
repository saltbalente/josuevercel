// Middleware para Vercel que carga configuraciones basadas en subdominios
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Obtener el host de la solicitud
  const host = req.headers.host || '';
  
  // Extraer el subdominio (primera parte del dominio)
  let subdominio = '';
  const hostParts = host.split('.');
  
  // Si hay al menos 3 partes (subdominio.dominio.tld), el subdominio es la primera parte
  if (hostParts.length >= 3) {
    subdominio = hostParts[0];
  }
  
  // Mapeo de subdominios a configuraciones
  const configMap = {
    'config3': 3,
    'config5': 5,
    'config6': 6,
    'config7': 7,
    'config8': 8,
    'config9': 9,
    'config11': 11,
    'config15': 15,
    'config16': 16,
    'config17': 17,
    'config18': 18,
    'config20': 20,
    'config21': 21
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