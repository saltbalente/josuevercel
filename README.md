# 🎭 Brujo Jacob - Sitio Web Optimizado

Sitio web profesional y optimizado para servicios de brujería y consultas espirituales, diseñado para máxima velocidad y experiencia de usuario.

## ✨ Características

### 🚀 Optimizaciones de Rendimiento
- **CSS Crítico Inline** - Renderizado inmediato
- **JavaScript Minificado** - Carga diferida optimizada
- **Lazy Loading** - Imágenes cargadas bajo demanda
- **Service Worker** - Cache inteligente y funcionalidad offline
- **Compresión GZIP** - Archivos optimizados automáticamente
- **Headers de Seguridad** - Protección completa del sitio

### 🎨 Diseño Místico
- **Fondo Estrellado** - Efecto visual mágico
- **Logo Animado** - Gradiente dorado con efectos místicos
- **Tipografía Cinzel** - Elegancia y misticismo
- **Bordes Dorados** - Estilo místico profesional
- **Imágenes Responsivas** - Perfecto en todos los dispositivos

### 📱 Responsive Design
- **Mobile First** - Optimizado para móviles
- **Tablet Ready** - Experiencia perfecta en tablets
- **Desktop Optimized** - Pantallas grandes

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y animaciones
- **JavaScript ES6+** - Funcionalidad interactiva
- **Service Worker** - Cache y funcionalidad offline
- **Vercel** - Despliegue y optimización automática

## 📁 Estructura del Proyecto

```
sitio_descargado/
├── index.html              # 🏠 Página principal optimizada
├── vercel.json             # ⚙️ Configuración Vercel
├── sw.js                   # 🔧 Service Worker
├── css/
│   ├── critical.min.css    # 🎯 CSS crítico inline
│   └── non-critical.min.css # 📦 CSS no crítico
├── js/
│   ├── main.min.js         # ⚡ JavaScript optimizado
│   ├── gtm-loader.js       # 📊 Cargador de Google Tag Manager
│   ├── config.js           # ⚙️ Configuración principal
│   └── configs/            # 🔢 Configuraciones múltiples (0-15)
├── fonts/                  # 🔤 Fuentes optimizadas
└── README.md              # 📖 Documentación
```

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue con Múltiples Subdominios Long-tail (Recomendado)
1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente la configuración
3. Configura subdominios con palabras clave para cada versión del sitio:
   - `brujeria-consulta-gratis.esoterico.app` → Carga `config-3.js`
   - `amarres-de-amor-efectivos.esoterico.app` → Carga `config-5.js`
   - `brujos-expertos-online.esoterico.app` → Carga `config-6.js`
   - etc.
4. Cada subdominio long-tail cargará automáticamente su configuración específica

**Consulta el archivo [README-DEPLOY.md](./README-DEPLOY.md) para instrucciones detalladas sobre cómo configurar los subdominios.**

### Opción 2: Despliegue Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

### Prueba Local de Configuraciones
Puedes probar diferentes configuraciones localmente antes de desplegar:

```bash
# Instalar dependencias necesarias
npm install

# Probar una configuración específica (por ejemplo, config-3)
node test-config.js 3

# Visita http://localhost:3030 en tu navegador
```

## 📊 Métricas de Rendimiento

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **Tiempo de Carga** | 8-12s | 1-3s | **75-85%** |
| **Tamaño de Página** | 2-3MB | 500-800KB | **70-80%** |
| **First Contentful Paint** | 4-6s | 0.8-1.5s | **75-80%** |
| **Largest Contentful Paint** | 6-8s | 1.5-2.5s | **70-75%** |

## 🎯 Optimizaciones Implementadas

### CSS Crítico
- Estilos críticos inline para renderizado inmediato
- CSS no crítico cargado de forma asíncrona
- Minificación completa de todos los estilos

### JavaScript
- Código minificado y optimizado
- Carga diferida para scripts no críticos
- Funcionalidad del formulario de WhatsApp integrada

### Imágenes
- Lazy loading nativo para todas las imágenes
- URLs optimizadas de Blogger
- Responsive design completo

### Service Worker
- Cache inteligente de recursos estáticos
- Funcionalidad offline
- Actualización automática de cache

## 🔄 Sistema de Configuración para Múltiples Landing Pages

El proyecto incluye un sistema de configuración que permite gestionar múltiples versiones de la misma landing page con diferentes números de teléfono, WhatsApp y configuraciones de Google Tag Manager.

### 📋 Estructura de Configuración

- `js/config.js`: Archivo de configuración principal (predeterminado)
- `js/configs/`: Directorio con configuraciones específicas para cada versión
  - `config-0.js` a `config-15.js`: Archivos de configuración con números secuenciales

### 🔧 Cómo Cambiar la Configuración

Para cambiar entre diferentes configuraciones, sigue estos pasos:

#### Método 1: Cambiar la referencia en index.html

1. Abre el archivo `index.html`
2. Busca la línea que incluye el archivo de configuración:
   ```html
   <script src="./js/config.js"></script>
   ```
3. Cambia la ruta para usar una configuración específica:
   ```html
   <script src="./js/configs/config-3.js"></script>
   ```

#### Método 2: Copiar la configuración deseada

1. Selecciona el archivo de configuración que deseas usar (por ejemplo, `js/configs/config-5.js`)
2. Copia su contenido
3. Pega el contenido en el archivo `js/config.js`

### ⚙️ Estructura del Archivo de Configuración

Cada archivo de configuración contiene un objeto `CONFIG` con las siguientes propiedades:

#### Configuración con Teléfono y WhatsApp

```javascript
const CONFIG = {
    // Configuración del número de teléfono
    phone: {
        number: '12028318214', // Número sin formato
        formatted: '(202) 831-8214' // Número con formato para mostrar
    },
    
    // Configuración de WhatsApp
    whatsapp: {
        number: '16098854854', // Número de WhatsApp sin el +
        defaultMessage: 'Hola%2C%20quiero%20consultar%20gratis%20con%20el%20maestro%2C%20por%20favor.' // Mensaje predeterminado (codificado para URL)
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
```

#### Configuración Solo con WhatsApp (sin teléfono)

```javascript
const CONFIG = {
    // Configuración del número de teléfono (vacío para versiones solo WhatsApp)
    phone: {
        number: '', // Dejar vacío para ocultar elementos de teléfono
        formatted: '' // Dejar vacío para ocultar elementos de teléfono
    },
    
    // Configuración de WhatsApp
    whatsapp: {
        number: '19292759883', // Número de WhatsApp sin el +
        defaultMessage: 'Hola%2C%20quiero%20consultar%20gratis%20con%20el%20maestro%2C%20por%20favor.' // Mensaje predeterminado (codificado para URL)
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
```

### 📱 Configuraciones Disponibles

Actualmente hay 13 configuraciones disponibles con diferentes configuraciones de contacto:

#### Versiones con Teléfono y WhatsApp:
- **Versión 6**: Teléfono: (214) 884-5031 | WhatsApp: 12545956299
- **Versión 7**: Teléfono: (413) 391-2149 | WhatsApp: 14133912149
- **Versión 9**: Teléfono: (202) 831-8214 | WhatsApp: 16098854854
- **Versión 11**: Teléfono: (202) 831-8214 | WhatsApp: 17864621385
- **Versión 15**: Teléfono: (202) 831-8214 | WhatsApp: 19172851237
- **Versión 17**: Teléfono y WhatsApp: 1717171717
- **Versión 18**: Teléfono y WhatsApp: 1818181818
- **Versión 21**: Teléfono y WhatsApp: 2121212121

#### Versiones solo con WhatsApp (sin número de teléfono):
- **Versión 3**: Solo WhatsApp: 16462043573
- **Versión 5**: Solo WhatsApp: 19498917311
- **Versión 8**: Solo WhatsApp: 17606662274
- **Versión 16**: Solo WhatsApp: 14252453250
- **Versión 20**: Solo WhatsApp: 19292759883

### 🔄 Funcionamiento

El sistema utiliza JavaScript para actualizar dinámicamente todos los enlaces de WhatsApp y números de teléfono en la página cuando se carga. Esto permite mantener un único código base con múltiples configuraciones.

#### Actualización de Enlaces

Los elementos que se actualizan automáticamente incluyen:

1. Todos los enlaces con la clase `whatsapp-link`
2. Elementos de teléfono con IDs específicos (cuando hay número de teléfono configurado):
   - `header-phone`
   - `arcane-phone` y `arcane-phone-formatted`
   - `footer-phone` y `footer-phone-text`
   - `floating-phone`

Adicionalmente, si se configura el nombre del brujo, se actualizarán los elementos con la clase `arcane-highlight-name`.

#### Configuraciones Solo con WhatsApp

Para las versiones que solo tienen WhatsApp (sin número de teléfono):

1. El sistema detecta automáticamente cuando el campo `phone.number` está vacío
2. Los botones y elementos de teléfono se ocultan automáticamente
3. Solo se muestran los botones de WhatsApp
4. El diseño se ajusta para mantener una apariencia coherente

Esto permite tener versiones de la landing page que funcionan exclusivamente con WhatsApp como método de contacto, sin mostrar elementos de teléfono innecesarios.

## 🔧 Configuración Vercel

El archivo `vercel.json` incluye:
- **Headers de seguridad** completos
- **Cache optimizado** para diferentes tipos de archivos
- **Service Worker** configurado correctamente
- **Compresión automática** habilitada

## 📞 Contacto

- **WhatsApp**: +1 (915) 400-4296
- **Sitio Web**: https://www.brujeriadeamoryregresosdepareja.store/

## 📄 Licencia

Este proyecto está optimizado para uso comercial del Brujo Jacob.

---

**¡Sitio web optimizado de 0 a 100 en velocidad y diseño místico!** ✨🚀