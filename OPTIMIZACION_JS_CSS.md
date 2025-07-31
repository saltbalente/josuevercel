# Optimización de JavaScript y CSS

## Resumen de Optimizaciones

Se han implementado varias optimizaciones para reducir el contenido JavaScript y CSS no utilizado, lo que ha resultado en un ahorro potencial de aproximadamente 74 KiB (56 KiB de JavaScript y 18 KiB de CSS).

## Optimizaciones de JavaScript

### Google Tag Manager (Ahorro: ~56 KiB)

1. **Carga diferida y condicional**:
   - Se ha implementado un cargador personalizado (`js/gtm-loader.js`) que retrasa la carga de Google Tag Manager.
   - GTM solo se carga después de la interacción del usuario (clic, desplazamiento, toque) o después de 3 segundos.

2. **Carga optimizada**:
   - Se utiliza una versión compacta de GTM con el parámetro `cx=c`.
   - Se han desactivado componentes no esenciales como Google Optimize.
   - Se ha configurado para restringir el procesamiento de datos y limitar el uso de datos.

3. **Mejoras de rendimiento**:
   - El script se carga con los atributos `async` y `defer`.
   - Se ha eliminado la carga bloqueante del iframe de noscript, reemplazándola por una carga dinámica.

## Optimizaciones de CSS

### Font Awesome (Ahorro: ~18 KiB)

1. **Eliminación de CSS no utilizado**:
   - Se ha eliminado la referencia al archivo completo `all.min.css` (89.5 KiB).
   - Se ha creado una versión optimizada (`css/fontawesome-custom.css`) que incluye solo los iconos necesarios.

2. **Optimización de fuentes**:
   - Se ha utilizado `unicode-range` para cargar solo los glifos específicos utilizados:
     - WhatsApp (U+F232)
     - Teléfono (U+F095, U+F879)
   - Se mantiene `font-display: swap` para mejorar el rendimiento percibido.

3. **Definiciones específicas**:
   - Se han incluido solo las definiciones CSS para los iconos utilizados en el sitio.

## Beneficios

1. **Mejora de rendimiento**:
   - Reducción del tiempo de carga inicial.
   - Mejora en métricas LCP (Largest Contentful Paint) y FCP (First Contentful Paint).

2. **Ahorro de ancho de banda**:
   - Reducción de aproximadamente 74 KiB en la transferencia total.
   - Menor consumo de datos para los usuarios.

3. **Experiencia de usuario mejorada**:
   - La página se carga más rápidamente sin scripts y estilos innecesarios.
   - Los recursos críticos se priorizan sobre los no esenciales.

## Implementación

1. **Archivos modificados**:
   - `index.html`: Actualizado para usar el cargador optimizado de GTM y eliminar referencias a CSS no utilizado.
   - `css/fontawesome-custom.css`: Optimizado para incluir solo los iconos necesarios.

2. **Archivos nuevos**:
   - `js/gtm-loader.js`: Cargador personalizado para Google Tag Manager.
   - `OPTIMIZACION_JS_CSS.md`: Documentación de las optimizaciones realizadas.

## Verificación

Para verificar que las optimizaciones funcionan correctamente:

1. Abrir la página en el navegador y comprobar que los iconos se muestran correctamente.
2. Verificar que Google Tag Manager se carga después de la interacción del usuario o después de 3 segundos.
3. Utilizar las herramientas de desarrollo del navegador para confirmar la reducción en el tamaño de transferencia.