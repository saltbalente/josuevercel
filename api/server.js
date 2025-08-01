// Edge Function para Vercel - Versión ultra-simple y robusta
export const runtime = 'edge';

export default async function handler(req) {
  try {
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
      const debugHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Debug Info</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f0f0f0; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
    .info { padding: 10px; margin: 10px 0; border-radius: 4px; background: #e8f4fd; }
    .success { background: #d4edda; color: #155724; }
    .warning { background: #fff3cd; color: #856404; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Debug - Configuracion de Subdominios</h1>
    
    <div class="info ${configNum ? 'success' : 'warning'}">
      <h3>Estado de Configuracion</h3>
      <p><strong>Host:</strong> ${host}</p>
      <p><strong>Subdominio:</strong> ${subdomain || 'ninguno'}</p>
      <p><strong>Configuracion:</strong> ${configNum ? `config-${configNum}.js` : 'config.js (predeterminada)'}</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
    </div>
    
    <div class="info success">
      <h3>Edge Function Funcionando</h3>
      <p>El middleware esta ejecutandose correctamente.</p>
    </div>
    
    <div>
      <button onclick="window.location.href='/'" style="background: #007bff; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin: 5px;">
        Ir a Pagina Principal
      </button>
    </div>
  </div>
</body>
</html>`;
      
      return new Response(debugHtml, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    // Pagina principal con configuracion dinamica
    const configScript = configNum ? 
      `<script src="./js/configs/config-${configNum}.js"></script>` : 
      '<script src="./js/config.js"></script>';
    
    const mainHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brujo Jacob - Consulta Gratis</title>
    <meta name="description" content="Brujo Jacob - Experto en brujeria, amarres de amor y hechizos efectivos. Consulta gratis.">
    <link rel="stylesheet" href="./css/critical.min.css">
    <link rel="icon" type="image/x-icon" href="./images/favicon.ico">
    <style>
        body { margin: 0; font-family: Arial, sans-serif; background: #000000; color: #333; line-height: 1.6; }
        .header { background: linear-gradient(45deg, #000, #333); color: #fff; padding: 1rem; text-align: center; }
        .logo { font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; }
        .phone-container { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 1rem 0; }
        .phone-link { color: #fff; text-decoration: none; font-size: 1.2rem; font-weight: bold; }
        .description2 { font-size: 1rem; opacity: 0.9; }
        .main-content { text-align: center; padding: 2rem; color: white; }
        .whatsapp-btn { background: #25d366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 2rem 0; }
        .debug-link { color: #ccc; font-size: 0.9rem; }
    </style>
</head>
<body>
    <header class="header">
        <div class="logo">🔮 Brujo Jacob</div>
        <div class="phone-container">
            <a href="tel:+19154004296" class="phone-link">📞 +1 (915) 400-4296</a>
        </div>
        <div class="description2">Consulta Gratis - Amarres de Amor Efectivos</div>
    </header>
    
    <main class="main-content">
        <h1>🌟 Brujo Jacob - Maestro en Brujeria</h1>
        <p>Mas de 35 años de experiencia en amarres de amor y hechizos efectivos</p>
        <p><strong>Subdominio:</strong> ${subdomain || 'principal'}</p>
        <p><strong>Configuracion:</strong> ${configNum ? `Especializada (${configNum})` : 'General'}</p>
        
        <a href="https://wa.me/12545956299?text=NECESITO%20AYUDA" class="whatsapp-btn">
            💬 Consulta Gratis por WhatsApp
        </a>
        
        <div>
            <a href="/debug" class="debug-link">🔍 Ver informacion tecnica</a>
        </div>
    </main>
    
    ${configScript}
    <script src="./js/main.min.js"></script>
    
    <script>
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
    
    return new Response(mainHtml, {
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
    
  } catch (error) {
    // Error fallback
    const errorHtml = `<!DOCTYPE html>
<html>
<head><title>Error</title></head>
<body>
  <h1>Error en Edge Function</h1>
  <p>Error: ${error.message}</p>
  <p>Stack: ${error.stack}</p>
</body>
</html>`;
    
    return new Response(errorHtml, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}