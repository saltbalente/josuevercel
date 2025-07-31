# Optimización de Caché

Este documento describe las optimizaciones de caché implementadas en el sitio web para mejorar el rendimiento y reducir la carga del servidor.

## Configuración de Caché

Se han implementado las siguientes configuraciones de caché para diferentes tipos de recursos:

### Imágenes (WebP, JPG, PNG, SVG, ICO)

```
Cache-Control: public, max-age=2592000, stale-while-revalidate=86400
```

- `max-age=2592000`: Caché durante 30 días (2,592,000 segundos)
- `stale-while-revalidate=86400`: Permite usar la versión en caché durante 24 horas adicionales mientras se revalida en segundo plano

### CSS, JavaScript y Fuentes

```
Cache-Control: public, max-age=31536000, immutable
```

- `max-age=31536000`: Caché durante 1 año (31,536,000 segundos)
- `immutable`: Indica que el recurso no cambiará durante su tiempo de vida útil

### Otros recursos (HTML, XML, etc.)

```
Cache-Control: public, max-age=604800, stale-while-revalidate=86400
```

- `max-age=604800`: Caché durante 7 días (604,800 segundos)
- `stale-while-revalidate=86400`: Permite usar la versión en caché durante 24 horas adicionales mientras se revalida

### Service Worker (sw.js)

```
Cache-Control: public, max-age=0, must-revalidate
```

- `max-age=0`: No almacenar en caché
- `must-revalidate`: Debe revalidarse con el servidor en cada solicitud

## Archivos de Configuración

Se han proporcionado configuraciones para diferentes servidores web:

1. **Vercel** (`vercel.json`): Configuración principal para el despliegue en Vercel
2. **Apache** (`.htaccess`): Configuración alternativa para servidores Apache
3. **Nginx** (`nginx.conf`): Configuración alternativa para servidores Nginx

## Beneficios

- **Reducción de carga del servidor**: Menos solicitudes al servidor para recursos estáticos
- **Mejora de velocidad de carga**: Los recursos se cargan desde la caché local del navegador
- **Ahorro de ancho de banda**: Reducción significativa en la transferencia de datos
- **Mejor experiencia de usuario**: Carga más rápida en visitas repetidas

## Ahorro Potencial

La implementación de estas políticas de caché puede resultar en un ahorro potencial de aproximadamente 514 KiB en transferencia de datos para visitas repetidas.