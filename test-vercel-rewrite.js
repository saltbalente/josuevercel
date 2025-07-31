const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3032;

// Simular las reglas de rewrite de vercel.json
const rewriteRules = [
  { source: '/debug', destination: '/api/server.js' },
  { source: '/js/(.*)', destination: '/js/$1' },
  { source: '/css/(.*)', destination: '/css/$1' },
  { source: '/images/(.*)', destination: '/images/$1' },
  { source: '/fonts/(.*)', destination: '/fonts/$1' },
  { source: '/', destination: '/api/server.js' }
];

// Middleware para simular las reglas de rewrite
app.use((req, res, next) => {
  console.log(`\n🔍 Solicitud: ${req.url}`);
  
  for (const rule of rewriteRules) {
    const regex = new RegExp('^' + rule.source.replace(/\*/g, '.*').replace(/\(/g, '\\(').replace(/\)/g, '\\)') + '$');
    
    if (regex.test(req.url)) {
      console.log(`✅ Coincide con regla: ${rule.source} -> ${rule.destination}`);
      
      // Si es un archivo estático (js, css, etc.), servirlo directamente
      if (rule.destination.startsWith('/js/') || 
          rule.destination.startsWith('/css/') || 
          rule.destination.startsWith('/images/') || 
          rule.destination.startsWith('/fonts/')) {
        
        const filePath = path.join(__dirname, rule.destination);
        console.log(`📁 Sirviendo archivo estático: ${filePath}`);
        
        if (fs.existsSync(filePath)) {
          console.log(`✅ Archivo encontrado`);
          return res.sendFile(filePath);
        } else {
          console.log(`❌ Archivo no encontrado`);
          return res.status(404).send('Archivo no encontrado');
        }
      }
      
      // Si es una ruta del servidor, continuar al middleware
      console.log(`🔄 Redirigiendo al middleware del servidor`);
      break;
    }
  }
  
  next();
});

// Importar y usar el middleware del servidor
const serverMiddleware = require('./api/server.js');
app.use(serverMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Servidor de prueba iniciado en http://localhost:${PORT}`);
  console.log(`\n🧪 Pruebas a realizar:`);
  console.log(`1. http://localhost:${PORT}/js/configs/config-3.js`);
  console.log(`2. http://localhost:${PORT}/debug (con Host: brujeria-consulta-gratis.esoterico.app)`);
  console.log(`3. http://localhost:${PORT}/ (con Host: brujeria-consulta-gratis.esoterico.app)`);
});