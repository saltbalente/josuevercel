// Edge Function para manejo robusto de subdominios
export const runtime = 'edge';

export default function handler(req) {
  const url = new URL(req.url);
  const host = req.headers.get('host') || '';
  
  // Mapeo de subdominios a configuraciones
  const configMap = {
    'amarres-de-amor-efectivos': 5,
    'brujeria-consulta-gratis': 3,
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
  const parts = host.split('.');
  const subdomain = parts.length >= 3 ? parts[0] : '';
  const configNum = configMap[subdomain] || null;
  
  // Página de debug
  if (url.pathname === '/debug') {
    const debugInfo = {
      host: host,
      subdomain: subdomain || 'ninguno',
      configNum: configNum,
      configFile: configNum ? `config-${configNum}.js` : 'config.js',
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') || 'unknown'
    };
    
    return new Response(JSON.stringify(debugInfo, null, 2), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }
  
  // Configuración dinámica de scripts
  const configScript = configNum ? 
    `<script src="./js/configs/config-${configNum}.js"></script>` : 
    '<script src="./js/config.js"></script>';
  
  // HTML principal
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brujo Jacob - Consulta Gratis</title>
  <meta name="description" content="Brujo Jacob - Experto en brujería, amarres de amor y hechizos efectivos. Consulta gratis.">
  <link rel="stylesheet" href="./css/critical.min.css">
  <link rel="icon" type="image/x-icon" href="./images/favicon.ico">
  <style>
    body { margin: 0; font-family: Arial, sans-serif; background: #000; color: #fff; }
    .header { background: linear-gradient(45deg, #000, #333); padding: 1rem; text-align: center; }
    .logo { font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; }
    .main-content { text-align: center; padding: 2rem; }
    .config-info { background: #333; padding: 1rem; margin: 1rem 0; border-radius: 8px; }
    .debug-link { color: #ccc; font-size: 0.9rem; text-decoration: none; }
  </style>
</head>
<body>
  <header class="header">
    <div class="logo">🔮 Brujo Jacob</div>
    <div>Consulta Gratis - Amarres de Amor Efectivos</div>
  </header>
  
  <main class="main-content">
    <h1>🌟 Brujo Jacob - Maestro en Brujería</h1>
    <p>Más de 35 años de experiencia en amarres de amor y hechizos efectivos</p>
    
    <div class="config-info">
      <p><strong>Subdominio:</strong> ${subdomain || 'principal'}</p>
      <p><strong>Configuración:</strong> ${configNum ? `Especializada (${configNum})` : 'General'}</p>
      <p><strong>Archivo:</strong> ${configNum ? `config-${configNum}.js` : 'config.js'}</p>
    </div>
    
    <div>
      <a href="/debug" class="debug-link">🔍 Ver información técnica</a>
    </div>
  </main>
  
  ${configScript}
  <script src="./js/main.min.js"></script>
</body>
</html>`;
  
  return new Response(html, {
    headers: { 
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
}