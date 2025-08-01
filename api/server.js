// Edge Function ultra-simple para debugging
export const runtime = 'edge';

export default function handler(req) {
  const url = new URL(req.url);
  const host = req.headers.get('host') || 'unknown';
  
  // Extraer subdominio
  const parts = host.split('.');
  const subdomain = parts.length >= 3 ? parts[0] : 'none';
  
  // Mapeo simple
  const configNum = subdomain === 'amarres-de-amor-efectivos' ? 5 :
                   subdomain === 'brujeria-consulta-gratis' ? 3 :
                   subdomain === 'brujos-expertos-online' ? 6 : null;
  
  if (url.pathname === '/debug') {
    return new Response(`{
  "host": "${host}",
  "subdomain": "${subdomain}",
  "configNum": ${configNum || 'null'},
  "timestamp": "${new Date().toISOString()}"
}`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Brujo Jacob</title>
</head>
<body>
  <h1>Brujo Jacob</h1>
  <p>Subdominio: ${subdomain}</p>
  <p>Config: ${configNum || 'default'}</p>
  <p><a href="/debug">Debug</a></p>
</body>
</html>`;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}