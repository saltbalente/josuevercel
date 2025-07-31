/**
 * Script para probar la detección de subdominios long tail
 * Simula cómo Vercel procesaría las solicitudes con diferentes hosts
 */

const middleware = require('./api/server.js');

// Simular objetos de request y response
function createMockRequest(host) {
    return {
        headers: {
            host: host
        }
    };
}

function createMockResponse() {
    let content = '';
    let headers = {};
    
    return {
        setHeader: (key, value) => {
            headers[key] = value;
        },
        end: (data) => {
            content = data;
            console.log('Response headers:', headers);
            
            // Buscar qué configuración se está cargando
            const configMatch = content.match(/config-(\d+)\.js/);
            if (configMatch) {
                console.log(`✅ Configuración detectada: config-${configMatch[1]}.js`);
            } else {
                console.log('❌ Usando configuración por defecto (config.js)');
            }
        },
        statusCode: 200
    };
}

// Probar diferentes subdominios
const testCases = [
    'brujeria-consulta-gratis.esoterico.app',
    'amarres-de-amor-efectivos.esoterico.app',
    'brujos-expertos-online.esoterico.app',
    'esoterico.app', // Sin subdominio
    'www.esoterico.app' // Con www
];

console.log('🧪 Probando detección de subdominios long tail...\n');

testCases.forEach((host, index) => {
    console.log(`Test ${index + 1}: ${host}`);
    
    const req = createMockRequest(host);
    const res = createMockResponse();
    
    try {
        middleware(req, res);
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    console.log('---\n');
});