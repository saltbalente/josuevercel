/**
 * Script de prueba para verificar configuración de subdominios
 * Este script simula las peticiones y verifica que se cargue la configuración correcta
 */

const https = require('https');
const http = require('http');

// Configuración de prueba
const testCases = [
    {
        subdomain: 'amarres-de-amor-efectivos',
        expectedConfig: 5,
        url: 'https://amarres-de-amor-efectivos.esoterico.app/debug'
    },
    {
        subdomain: 'brujeria-consulta-gratis',
        expectedConfig: 3,
        url: 'https://brujeria-consulta-gratis.esoterico.app/debug'
    },
    {
        subdomain: 'brujos-expertos-online',
        expectedConfig: 6,
        url: 'https://brujos-expertos-online.esoterico.app/debug'
    }
];

// Función para hacer petición HTTP
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        };

        const client = urlObj.protocol === 'https:' ? https : http;
        
        const req = client.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.end();
    });
}

// Función para extraer información de configuración del HTML
function extractConfigInfo(html) {
    const configMatch = html.match(/Configuración:<\/strong>\s*([^<]+)/i);
    const subdomainMatch = html.match(/Subdominio:<\/strong>\s*([^<]+)/i);
    
    return {
        subdomain: subdomainMatch ? subdomainMatch[1].trim() : 'no detectado',
        config: configMatch ? configMatch[1].trim() : 'no detectado'
    };
}

// Función principal de prueba
async function runTests() {
    console.log('🔍 Iniciando pruebas de configuración de subdominios...\n');
    
    for (const testCase of testCases) {
        console.log(`📋 Probando: ${testCase.subdomain}`);
        console.log(`🌐 URL: ${testCase.url}`);
        console.log(`🎯 Configuración esperada: config-${testCase.expectedConfig}.js`);
        
        try {
            const response = await makeRequest(testCase.url);
            
            if (response.statusCode === 200) {
                const configInfo = extractConfigInfo(response.body);
                
                console.log(`✅ Respuesta exitosa (${response.statusCode})`);
                console.log(`📊 Subdominio detectado: ${configInfo.subdomain}`);
                console.log(`⚙️  Configuración cargada: ${configInfo.config}`);
                
                // Verificar si la configuración es correcta
                const expectedConfigText = `config-${testCase.expectedConfig}.js`;
                if (configInfo.config.includes(expectedConfigText)) {
                    console.log(`🎉 ¡CORRECTO! Se está cargando la configuración esperada`);
                } else {
                    console.log(`❌ ERROR: Se esperaba ${expectedConfigText} pero se obtuvo ${configInfo.config}`);
                }
            } else {
                console.log(`❌ Error HTTP: ${response.statusCode}`);
                console.log(`📄 Respuesta: ${response.body.substring(0, 200)}...`);
            }
        } catch (error) {
            console.log(`💥 Error de conexión: ${error.message}`);
        }
        
        console.log('─'.repeat(60));
    }
    
    console.log('\n🏁 Pruebas completadas');
}

// Ejecutar las pruebas
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { runTests, makeRequest, extractConfigInfo };