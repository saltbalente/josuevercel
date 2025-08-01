// Edge Function para Vercel que carga configuraciones basadas en subdominios
export default async function handler(req) {
  const url = new URL(req.url);
  const { pathname } = url;
  const host = req.headers.get('host') || '';
  
  // Función para extraer subdominio
  function extractSubdomain(host) {
    const hostParts = host.split('.');
    return hostParts.length >= 3 ? hostParts[0] : '';
  }
  
  // Función para obtener número de configuración
  function getConfigNumber(subdomain) {
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
    return configMap[subdomain] || null;
  }
  
  // Debug page
   if (pathname === '/debug') {
    
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
    
    const debugInfo = {
      host: host,
      subdomain: subdominio,
      configNum: configNum,
      pathname: req.url,
      userAgent: req.headers.get('user-agent') || 'No disponible',
      timestamp: new Date().toISOString(),
      headers: JSON.stringify(Object.fromEntries(req.headers.entries()), null, 2),
      method: req.method,
      vercelRegion: req.headers.get('x-vercel-deployment-url') || 'No disponible',
      vercelId: req.headers.get('x-vercel-id') || 'No disponible'
    };
    
    const debugHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Debug - Información del Subdominio</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .info-box { background: #e8f4fd; border: 1px solid #bee5eb; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .error { background: #f8d7da; border-color: #f5c6cb; color: #721c24; }
        .success { background: #d4edda; border-color: #c3e6cb; color: #155724; }
        .warning { background: #fff3cd; border-color: #ffeaa7; color: #856404; }
        .code { background: #f8f9fa; border: 1px solid #e9ecef; padding: 10px; font-family: monospace; white-space: pre-wrap; font-size: 12px; max-height: 300px; overflow-y: auto; }
        h1 { color: #333; }
        h2 { color: #666; margin-top: 25px; }
        .test-button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 5px; }
        .test-button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Debug - Información del Subdominio</h1>
        
        <h2>Información Básica</h2>
        <div class="info-box">
            <strong>Host:</strong> ${debugInfo.host}<br>
            <strong>Subdominio:</strong> ${debugInfo.subdomain || 'No detectado'}<br>
            <strong>Número de Config:</strong> ${debugInfo.configNum || 'No asignado'}<br>
            <strong>Pathname:</strong> ${debugInfo.pathname}<br>
            <strong>URL Completa:</strong> ${debugInfo.pathname}<br>
            <strong>Método:</strong> ${debugInfo.method}<br>
            <strong>Vercel Region:</strong> ${debugInfo.vercelRegion}<br>
            <strong>Vercel ID:</strong> ${debugInfo.vercelId}<br>
            <strong>Timestamp:</strong> ${debugInfo.timestamp}
        </div>
        
        <h2>Headers de la Petición</h2>
        <div class="code">${debugInfo.headers}</div>
        
        <h2>Test de Configuración</h2>
        <div id="config-test" class="info-box">
            <p>Cargando configuración...</p>
        </div>
        
        <h2>Tests Adicionales</h2>
        <div class="info-box">
            <button class="test-button" onclick="testConfigFile()">Test Directo del Archivo Config</button>
            <button class="test-button" onclick="testStaticFiles()">Test Archivos Estáticos</button>
            <button class="test-button" onclick="testRewriteRules()">Test Reglas de Rewrite</button>
        </div>
        
        <div id="additional-tests" class="info-box" style="display: none;">
            <h3>Resultados de Tests Adicionales</h3>
            <div id="test-results"></div>
        </div>
        
        <script>
            // Test de carga de configuración
            const configNum = ${configNum || 'null'};
            const configTestDiv = document.getElementById('config-test');
            
            if (configNum) {
                const script = document.createElement('script');
                script.src = \`/js/configs/config-\${configNum}.js?t=\${Date.now()}\`;
                script.onload = function() {
                    if (typeof CONFIG !== 'undefined') {
                        configTestDiv.innerHTML = \`
                            <div class="success">
                                <h3>✅ Configuración Cargada</h3>
                                <p><strong>Nombre:</strong> \${CONFIG.siteName}</p>
                                <p><strong>WhatsApp:</strong> \${CONFIG.whatsapp.number}</p>
                                <p><strong>Archivo:</strong> config-\${configNum}.js</p>
                                <div class="code">\${JSON.stringify(CONFIG, null, 2)}</div>
                            </div>
                        \`;
                    } else {
                        configTestDiv.innerHTML = \`
                            <div class="error">
                                <h3>❌ Error: Configuración no encontrada</h3>
                                <p>La variable CONFIG no está definida. Esto indica que el archivo de configuración no se cargó correctamente.</p>
                                <p><strong>Archivo esperado:</strong> /js/configs/config-\${configNum}.js</p>
                            </div>
                        \`;
                    }
                };
                script.onerror = function(e) {
                    configTestDiv.innerHTML = \`
                        <div class="error">
                            <h3>❌ Error: No se pudo cargar el archivo</h3>
                            <p>El archivo config-\${configNum}.js no se pudo cargar desde /js/configs/</p>
                            <p><strong>Error:</strong> \${e.message || 'Error de red o archivo no encontrado'}</p>
                        </div>
                    \`;
                };
                document.head.appendChild(script);
            } else {
                configTestDiv.innerHTML = \`
                    <div class="error">
                        <h3>❌ Error: No hay número de configuración</h3>
                        <p>No se pudo determinar qué archivo de configuración usar para este subdominio.</p>
                    </div>
                \`;
            }
            
            function testConfigFile() {
                const resultsDiv = document.getElementById('test-results');
                document.getElementById('additional-tests').style.display = 'block';
                
                fetch(\`/js/configs/config-\${configNum}.js?t=\${Date.now()}\`)
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        }
                        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
                    })
                    .then(text => {
                        resultsDiv.innerHTML += \`
                            <div class="success">
                                <h4>✅ Archivo Config Accesible</h4>
                                <p>El archivo se puede descargar directamente</p>
                                <div class="code">\${text.substring(0, 500)}...</div>
                            </div>
                        \`;
                    })
                    .catch(error => {
                        resultsDiv.innerHTML += \`
                            <div class="error">
                                <h4>❌ Error al acceder al archivo Config</h4>
                                <p>\${error.message}</p>
                            </div>
                        \`;
                    });
            }
            
            function testStaticFiles() {
                const resultsDiv = document.getElementById('test-results');
                document.getElementById('additional-tests').style.display = 'block';
                
                const testFiles = ['/js/main.min.js', '/css/critical.min.css'];
                
                testFiles.forEach(file => {
                    fetch(\`\${file}?t=\${Date.now()}\`)
                        .then(response => {
                            if (response.ok) {
                                resultsDiv.innerHTML += \`
                                    <div class="success">
                                        <h4>✅ \${file} - Accesible</h4>
                                    </div>
                                \`;
                            } else {
                                throw new Error(\`HTTP \${response.status}\`);
                            }
                        })
                        .catch(error => {
                            resultsDiv.innerHTML += \`
                                <div class="error">
                                    <h4>❌ \${file} - Error: \${error.message}</h4>
                                </div>
                            \`;
                        });
                });
            }
            
            function testRewriteRules() {
                const resultsDiv = document.getElementById('test-results');
                document.getElementById('additional-tests').style.display = 'block';
                
                resultsDiv.innerHTML += \`
                    <div class="warning">
                        <h4>🔍 Información de Rewrite Rules</h4>
                        <p>Las reglas de rewrite en vercel.json deberían permitir que los archivos JS se sirvan directamente.</p>
                        <p>Si este debug se está ejecutando, significa que el middleware está funcionando.</p>
                        <p>El problema podría estar en el orden de las reglas o en el cache de Vercel.</p>
                    </div>
                \`;
            }
        </script>
    </div>
</body>
</html>
    `;
    
    return new Response(debugHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
  
  // Extraer el subdominio usando las funciones definidas
  const subdomain = extractSubdomain(host);
  const configNum = getConfigNumber(subdomain);
  
  // Obtener la URL base para fetch
   const baseUrl = url.origin;
   
   try {
     // Cargar index.html usando fetch
     const indexResponse = await fetch(`${baseUrl}/index.html`);
     if (!indexResponse.ok) {
       return new Response('Error loading page', { status: 500 });
     }
     
     let indexContent = await indexResponse.text();
     
     // Si hay configuración específica, reemplazar la referencia al config.js
     if (configNum) {
       indexContent = indexContent.replace(
         '<script src="./js/config.js"></script>',
         `<script src="./js/configs/config-${configNum}.js"></script>`
       );
     }
     
     return new Response(indexContent, {
       headers: { 'Content-Type': 'text/html; charset=utf-8' }
     });
   } catch (error) {
     return new Response('Error loading configuration', { status: 500 });
   }
};