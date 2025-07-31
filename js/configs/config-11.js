/**
 * Configuración para la versión 11
 * Este archivo contiene los valores configurables para la landing page
 */

const CONFIG = {
    // Configuración del número de teléfono
    phone: {
        number: '12028318214', // Número sin formato
        formatted: '(202) 831-8214' // Número con formato para mostrar
    },
    
    // Configuración de WhatsApp
    whatsapp: {
        number: '17864621385', // Número de WhatsApp sin el +
        defaultMessage: 'Hola%20maestro%2C%20deseo%20contarle%20mi%20caso%20para%20llegar%20a%20una%20solución%20efectiva.' // Mensaje predeterminado (codificado para URL)
    },
    
    // Configuración de analytics
    analytics: {
        gtmId: 'GTM-T4BCC6P' // ID de Google Tag Manager
    },
    
    // Información del brujo (opcional)
    brujo: {
        name: 'Jacob', // Nombre del brujo
        title: 'Maestro Jacob' // Título del brujo
    }
};

// Exportar la configuración para que esté disponible globalmente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG };
}