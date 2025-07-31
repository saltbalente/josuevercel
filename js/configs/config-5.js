/**
 * Configuración para la versión 5
 * Este archivo contiene los valores configurables para la landing page
 * Esta versión solo tiene WhatsApp (sin número de teléfono)
 */

const CONFIG = {
    // Configuración del número de teléfono (vacío para esta versión)
    phone: {
        number: '', // Sin número de teléfono
        formatted: '' // Sin número formateado
    },
    
    // Configuración de WhatsApp
    whatsapp: {
        number: '19498917311', // Número de WhatsApp sin el +
        defaultMessage: 'NECESITO%20AYUDA' // Mensaje predeterminado (codificado para URL)
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