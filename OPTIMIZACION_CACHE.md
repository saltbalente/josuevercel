# Optimización de Caché

## Resumen de Optimizaciones

Se han optimizado las configuraciones de caché del sitio web para mejorar el tiempo de carga en visitas repetidas. Las optimizaciones realizadas han permitido un ahorro potencial de aproximadamente 46 KiB según el informe de rendimiento.

## Cambios Realizados

### 1. Configuración en Vercel (vercel.json)

#### Antes:

```json
{
  "source": "/(css|js|fonts)/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
},
{
  "source": "/images/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=2592000, stale-while-revalidate=86400"
    }
  ]
}
```

#### Después:

```json
{
  "source": "/(css|js)/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
},
{
  "source": "/fonts/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
},
{
  "source": "/fonts/fontawesome/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
},
{
  "source": "/images/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, stale-while-revalidate=86400"
    }
  ]
},
{
  "source": "/images/optimized/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, stale-while-revalidate=86400"
    }
  ]
}
```

### 2. Configuración en Apache (.htaccess)

#### Antes:

```apache
# Imágenes
ExpiresByType image/webp "access plus 1 month"
ExpiresByType image/jpeg "access plus 1 month"
ExpiresByType image/png "access plus 1 month"
ExpiresByType image/svg+xml "access plus 1 month"
ExpiresByType image/x-icon "access plus 1 year"

# Caché para imágenes
<FilesMatch "\.(webp|jpg|jpeg|png|gif|svg|ico)$">
  Header set Cache-Control "public, max-age=2592000, stale-while-revalidate=86400"
</FilesMatch>
```

#### Después:

```apache
# Imágenes
ExpiresByType image/webp "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType image/svg+xml "access plus 1 year"
ExpiresByType image/x-icon "access plus 1 year"

# Caché para imágenes
<FilesMatch "\.(webp|jpg|jpeg|png|gif|svg|ico)$">
  Header set Cache-Control "public, max-age=31536000, stale-while-revalidate=86400"
</FilesMatch>
```

### 3. Configuración en Nginx (nginx.conf)

#### Antes:

```nginx
# Configuración para imágenes
location ~* \.(webp|jpg|jpeg|png|gif|svg|ico)$ {
    expires 30d;
    add_header Cache-Control "public, max-age=2592000, stale-while-revalidate=86400";
    access_log off;
}
```

#### Después:

```nginx
# Configuración para imágenes
location ~* \.(webp|jpg|jpeg|png|gif|svg|ico)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, stale-while-revalidate=86400";
    access_log off;
}
```

## Recursos Afectados

Los siguientes recursos ahora tienen un tiempo de caché más largo (1 año en lugar de 7 días o 30 días):

| Recurso | Tamaño |
|---------|--------|
| fa-solid-900.woff2 | 125 KiB |
| fa-brands-400.woff2 | 103 KiB |
| arcane-main-visual.webp | 85 KiB |
| mystic-image-2.webp | 73 KiB |
| mystic-image-1.webp | 37 KiB |
| cinzel-v23-latin-700.woff2 | 9 KiB |
| cinzel-v23-latin-400.woff2 | 8 KiB |
| arcane-emblem.webp | 6 KiB |
| non-critical.min.css | 4 KiB |
| main.min.js | 4 KiB |
| critical.min.css | 2 KiB |
| gtm-loader.js | 2 KiB |

## Beneficios

1. **Reducción de Solicitudes de Red**: Los recursos se almacenan en caché durante más tiempo, reduciendo la necesidad de descargarlos en visitas repetidas.

2. **Mejora del Tiempo de Carga**: Las páginas se cargan más rápido para usuarios recurrentes, ya que los recursos se cargan desde la caché local.

3. **Ahorro de Ancho de Banda**: Tanto para el usuario como para el servidor, al reducir la transferencia de datos repetidos.

4. **Mejora de Métricas Core Web Vitals**: Especialmente LCP (Largest Contentful Paint) y FCP (First Contentful Paint) para visitas repetidas.

## Consideraciones

- Se ha utilizado la directiva `immutable` para recursos que no cambian (fuentes, CSS y JS minificados).
- Se ha utilizado `stale-while-revalidate` para imágenes, permitiendo mostrar contenido en caché mientras se actualiza en segundo plano.
- La configuración se ha aplicado en los tres sistemas principales (Vercel, Apache y Nginx) para asegurar compatibilidad en diferentes entornos de despliegue.