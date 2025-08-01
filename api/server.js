// Edge Function para Vercel - Version minima para debugging
export const runtime = 'edge';

export default async function handler(req) {
  try {
    const url = new URL(req.url);
    const host = req.headers.get('host') || '';
    
    // Mapeo simple
    const configMap = {
      'amarres-de-amor-efectivos': 5,
      'brujeria-consulta-gratis': 3,
      'brujos-expertos-online': 6
    };
    
    // Extraer subdominio
    const parts = host.split('.');
    const subdomain = parts.length >= 3 ? parts[0] : '';
    const configNum = configMap[subdomain] || null;
    
    // Debug simple
    if (url.pathname === '/debug') {
      const info = {
        host: host,
        subdomain: subdomain,
        configNum: configNum,
        timestamp: new Date().toISOString()
      };
      
      return new Response(JSON.stringify(info, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Respuesta simple
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Brujo Jacob</title>
  <meta charset="utf-8">
</head>
<body>
  <h1>Brujo Jacob</h1>
  <p>Subdominio: ${subdomain || 'ninguno'}</p>
  <p>Config: ${configNum || 'default'}</p>
  <p><a href="/debug">Debug</a></p>
  ${configNum ? `<script src="./js/configs/config-${configNum}.js"></script>` : '<script src="./js/config.js"></script>'}
</body>
</html>`;
    
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
    
  } catch (error) {
    return new Response(`Error: ${error.message}\nStack: ${error.stack}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}