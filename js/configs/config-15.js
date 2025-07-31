/**
 * Configuración para la versión 15
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
        number: '19172851237', // Número de WhatsApp sin el +
        defaultMessage: 'Hola%2C%20necesito%20ayuda%20espiritual%20con%20hechizos%20de%20amor%20y%20trabajos%20espirituales' // Mensaje predeterminado (codificado para URL)
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