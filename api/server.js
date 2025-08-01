// Edge Function para Vercel - Manejo robusto de subdominios
export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  const { pathname } = url;
  const host = req.headers.get('host') || '';
  
  // Mapeo de subdominios a configuraciones
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
  
  // Extraer subdominio
  const hostParts = host.split('.');
  const subdomain = hostParts.length >= 3 ? hostParts[0] : '';
  const configNum = configMap[subdomain] || null;
  
  // Debug page
  if (pathname === '/debug') {
    const debugInfo = {
      host,
      subdomain,
      configNum,
      pathname,
      timestamp: new Date().toISOString(),
      headers: Object.fromEntries(req.headers.entries())
    };
    
    const debugHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Debug - Subdomain Configuration</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f0f0f0; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
    .status { padding: 10px; margin: 10px 0; border-radius: 4px; }
    .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .warning { background: #fff3cd; color: #856404; border: 1px solid #ffeaa7; }
    .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    pre { background: #f8f9fa; padding: 15px; border-radius: 4px; overflow-x: auto; }
    .test-btn { background: #007bff; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 Debug - Configuración de Subdominios</h1>
    
    <div class="status ${configNum ? 'success' : 'warning'}">
      <h3>Estado de Configuración</h3>
      <p><strong>Host:</strong> ${host}</p>
      <p><strong>Subdominio:</strong> ${subdomain || 'ninguno'}</p>
      <p><strong>Configuración:</strong> ${configNum ? `config-${configNum}.js` : 'config.js (predeterminada)'}</p>
      <p><strong>Timestamp:</strong> ${debugInfo.timestamp}</p>
    </div>
    
    <div class="status success">
      <h3>✅ Edge Function Funcionando</h3>
      <p>El middleware está ejecutándose correctamente en Vercel Edge Runtime.</p>
    </div>
    
    <h3>📋 Información Técnica</h3>
    <pre>${JSON.stringify(debugInfo, null, 2)}</pre>
    
    <h3>🧪 Pruebas</h3>
    <button class="test-btn" onclick="window.location.href='/'">
      🏠 Ir a Página Principal
    </button>
    <button class="test-btn" onclick="testConfig()">
      🔧 Probar Configuración
    </button>
    
    <script>
      function testConfig() {
        const configNum = ${configNum || 'null'};
        const configFile = configNum ? \`./js/configs/config-\${configNum}.js\` : './js/config.js';
        
        fetch(configFile)
          .then(response => {
            if (response.ok) {
              alert('✅ Archivo de configuración encontrado: ' + configFile);
            } else {
              alert('❌ Error cargando configuración: ' + response.status);
            }
          })
          .catch(error => {
            alert('❌ Error de red: ' + error.message);
          });
      }
    </script>
  </div>
</body>
</html>`;
    
    return new Response(debugHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
  
  // HTML base del sitio con configuración dinámica
  const baseHtml = `<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=6">
    <meta name="description" content="Brujo Jacob - Experto en brujería, amarres de amor y hechizos efectivos. Consulta gratis. Más de 35 años de experiencia.">
    <meta name="generator" content="Brujo Jacob">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="./css/critical.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link rel="preload" href="./fonts/cinzel-v23-latin-400.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="./fonts/cinzel-v23-latin-700.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- Fuentes Cinzel -->
    <style>
      @font-face {
        font-family: 'Cinzel';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/cinzel-v23-latin-400.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Cinzel';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/cinzel-v23-latin-700.woff2') format('woff2');
      }
    </style>
    
    <!-- DNS Prefetch -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//www.googletagmanager.com">
    
    <!-- Critical CSS -->
    <style>
        body{margin:0;font-family:Arial,sans-serif;background:#000000;color:#333;line-height:1.6}
        .header{background:linear-gradient(45deg,#000,#333);color:#fff;padding:1rem;text-align:center}
        .logo{font-size:2rem;font-weight:bold;margin-bottom:0.5rem}
        .phone-container{display:flex;align-items:center;justify-content:center;gap:1rem;margin:1rem 0}
        .phone-link{color:#fff;text-decoration:none;font-size:1.2rem;font-weight:bold}
        .description2{font-size:1rem;opacity:0.9}
    </style>
    
    <title>Brujo Jacob - Consulta Gratis de Brujería y Amarres de Amor</title>
    <link rel="icon" type="image/x-icon" href="./images/favicon.ico">
    <link rel="stylesheet" href="./css/critical.min.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="logo">🔮 Brujo Jacob</div>
        <div class="phone-container">
            <a href="tel:+19154004296" class="phone-link">📞 +1 (915) 400-4296</a>
        </div>
        <div class="description2">Consulta Gratis - Amarres de Amor Efectivos</div>
    </header>
    
    <!-- Main Content -->
    <main>
        <div style="text-align: center; padding: 2rem; color: white;">
            <h1>🌟 Brujo Jacob - Maestro en Brujería</h1>
            <p>Más de 35 años de experiencia en amarres de amor y hechizos efectivos</p>
            <p><strong>Subdominio:</strong> ${subdomain || 'principal'}</p>
            <p><strong>Configuración:</strong> ${configNum ? `Especializada (${configNum})` : 'General'}</p>
            
            <div style="margin: 2rem 0;">
                <a href="https://wa.me/12545956299?text=NECESITO%20AYUDA" 
                   style="background: #25d366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                    💬 Consulta Gratis por WhatsApp
                </a>
            </div>
            
            <div style="margin-top: 2rem;">
                <a href="/debug" style="color: #ccc; font-size: 0.9rem;">🔍 Ver información técnica</a>
            </div>
        </div>
    </main>
    
    <!-- Scripts -->
    ${configNum ? `<script src="./js/configs/config-${configNum}.js"></script>` : '<script src="./js/config.js"></script>'}
    <script src="./js/main.min.js"></script>
    
    <!-- Analytics -->
    <script>
        // GTM se cargará desde el archivo de configuración
        if (typeof CONFIG !== 'undefined' && CONFIG.analytics && CONFIG.analytics.gtmId) {
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer',CONFIG.analytics.gtmId);
        }
    </script>
</body>
</html>`;
  
  return new Response(baseHtml, {
    headers: { 
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300'
    }
  });
}