# Optimización de Imágenes

## Resumen de Optimizaciones

Se han optimizado las imágenes del sitio web para mejorar el tiempo de carga percibido de la página y el LCP (Largest Contentful Paint). Las optimizaciones realizadas han permitido un ahorro potencial de aproximadamente 222 KiB.

## Imágenes Optimizadas

| Imagen | Tamaño Original | Tamaño Optimizado | Ahorro |
|--------|----------------|-------------------|--------|
| mystic-image-1.webp | 191.276 KiB | 36.876 KiB | 154.400 KiB |
| arcane-main-visual.webp | 86.690 KiB | 56.046 KiB | 30.644 KiB |
| mystic-image-2.webp | 89.366 KiB | 73.678 KiB | 15.688 KiB |
| testimonial-1.webp | 12.910 KiB | 0.996 KiB | 11.914 KiB |
| testimonial-2.webp | 6.500 KiB | 0.874 KiB | 5.626 KiB |
| testimonial-3.webp | 7.796 KiB | 0.872 KiB | 6.924 KiB |
| **Total** | **394.538 KiB** | **169.342 KiB** | **225.196 KiB** |

## Técnicas de Optimización Aplicadas

### 1. Redimensionamiento de Imágenes

Se han redimensionado las imágenes para que coincidan con las dimensiones en las que se muestran en la página:

- **mystic-image-1.webp**: Redimensionada de 1920x1280 a 800x533
- **arcane-main-visual.webp**: Redimensionada de 800x1200 a 550x825
- **testimonial-1.webp**: Redimensionada de 400x400 a 60x60
- **testimonial-2.webp**: Redimensionada de 280x280 a 60x60
- **testimonial-3.webp**: Redimensionada de 280x280 a 60x60

### 2. Compresión Optimizada

Se ha aplicado una compresión optimizada a las imágenes WebP para reducir su tamaño sin comprometer significativamente la calidad visual:

- Se utilizó un factor de calidad de 80% para la mayoría de las imágenes
- Para mystic-image-2.webp se utilizó un factor de calidad de 75% para lograr una mayor compresión

### 3. Implementación de Imágenes Responsivas

Se han implementado técnicas de imágenes responsivas utilizando los atributos `srcset` y `sizes` para cargar la versión más adecuada según el tamaño de la pantalla:

```html
<img alt="image" class="mystic-image" 
     src="images/optimized/mystic-image-1.webp" 
     srcset="images/optimized/mystic-image-1.webp 800w, images/mystic-image-1.webp 1920w" 
     sizes="(max-width: 800px) 100vw, 800px" 
     loading="lazy" 
     width="800" 
     height="533">
```

### 4. Atributos de Dimensiones Explícitas

Se han añadido los atributos `width` y `height` a todas las imágenes para evitar el desplazamiento de contenido durante la carga (CLS - Cumulative Layout Shift).

## Beneficios

1. **Reducción del Tiempo de Carga**: Ahorro de aproximadamente 225 KiB en la transferencia de datos.
2. **Mejora del LCP (Largest Contentful Paint)**: Las imágenes más pequeñas se cargan más rápido, mejorando esta métrica crucial de Core Web Vitals.
3. **Experiencia de Usuario Mejorada**: Carga más rápida de la página, especialmente en conexiones móviles o lentas.
4. **Reducción del CLS (Cumulative Layout Shift)**: Al especificar las dimensiones de las imágenes, se evita el desplazamiento del contenido durante la carga.
5. **Optimización para Diferentes Dispositivos**: Las imágenes responsivas aseguran que se cargue la versión más adecuada según el dispositivo del usuario.

## Herramientas Utilizadas

- **cwebp**: Para la conversión y optimización de imágenes WebP
- **Atributos HTML modernos**: srcset, sizes, loading="lazy", width, height