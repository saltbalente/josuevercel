/**
 * Configuración para la versión 6
 * Este archivo contiene los valores configurables para la landing page
 */

const CONFIG = {
    // Configuración del número de teléfono
    phone: {
        number: '12148845031', // Número sin formato
        formatted: '(214) 884-5031' // Número con formato para mostrar
    },
    
    // Configuración de WhatsApp
    whatsapp: {
        number: '12545956299', // Número de WhatsApp sin el +
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