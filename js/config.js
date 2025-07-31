/**
 * Archivo de configuración para personalizar múltiples versiones del sitio
 * Cambia estos valores para cada versión del sitio
 */

// Configuración de la versión actual
const CONFIG = {
    // Información de contacto
    phone: {
        number: "9154004296",           // Número de teléfono sin formato
        formatted: "+1 (915) 400-4296"  // Número de teléfono con formato para mostrar
    },
    whatsapp: {
        number: "12545956299",          // Número de WhatsApp sin el signo +
        defaultMessage: "NECESITO%20AYUDA" // Mensaje predeterminado (codificado para URL)
    },
    // Configuración de analytics
    analytics: {
        gtmId: "GTM-T4BCC6P"            // ID de Google Tag Manager
    },
    // Información del brujo (opcional, si necesitas personalizar el nombre)
    brujo: {
        name: "Jacob",                  // Nombre del brujo
        title: "Maestro"                // Título del brujo
    }
};

// Exportar la configuración para que otros scripts puedan usarla
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}