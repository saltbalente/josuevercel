# Solución para Subdominios en Vercel

## Problema Identificado

Los subdominios como `https://amarres-de-amor-efectivos.esoterico.app/` no estaban funcionando correctamente, mostrando errores 500 `FUNCTION_INVOCATION_FAILED` o timeouts.

## Causa Raíz

Según la documentación de Vercel, para usar **dominios wildcard** (como `*.esoterico.app`) se requiere:

1. **Configuración de Nameservers**: Los dominios wildcard deben usar el método de nameservers de Vercel
2. **Verificación DNS-01**: Vercel necesita control total del DNS para generar certificados wildcard
3. **Configuración en Dashboard**: El dominio wildcard debe estar correctamente configurado en el proyecto

## Solución Implementada

### 1. Edge Function Robusto

Se implementó un Edge Function en `api/server.js` que:

- **Mapea subdominios a configuraciones específicas**:
  ```javascript
  const configMap = {
    'amarres-de-amor-efectivos': 5,
    'brujeria-consulta-gratis': 3,
    'brujos-expertos-online': 6,
    // ... más subdominios
  };
  ```

- **Detecta automáticamente el subdominio**:
  ```javascript
  const parts = host.split('.');
  const subdomain = parts.length >= 3 ? parts[0] : '';
  const configNum = configMap[subdomain] || null;
  ```

- **Carga dinámicamente la configuración correcta**:
  ```javascript
  const configScript = configNum ? 
    `<script src="./js/configs/config-${configNum}.js"></script>` : 
    '<script src="./js/config.js"></script>';
  ```

### 2. Página de Debug

Se incluye una página de debug accesible en `/debug` que muestra:
- Host actual
- Subdominio detectado
- Número de configuración asignado
- Archivo de configuración que se carga
- Timestamp y User-Agent

### 3. Configuración de Vercel

Para que los subdominios funcionen correctamente, se debe:

1. **Agregar dominio wildcard en Vercel**:
   - Ir a Settings > Domains en el proyecto
   - Agregar `*.esoterico.app`
   - Seleccionar método "Nameservers"

2. **Configurar nameservers en el registrador**:
   - Cambiar los nameservers del dominio a los proporcionados por Vercel
   - Ejemplo: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`

3. **Verificar configuración DNS**:
   - Vercel manejará automáticamente los registros DNS
   - Los certificados SSL se generarán automáticamente

## Verificación

Para verificar que la solución funciona:

1. **Probar el debug**:
   ```bash
   curl https://amarres-de-amor-efectivos.esoterico.app/debug
   ```

2. **Verificar la página principal**:
   ```bash
   curl https://amarres-de-amor-efectivos.esoterico.app/
   ```

3. **Comprobar que se carga config-5.js**:
   - La página debe mostrar "Configuración: Especializada (5)"
   - El script debe cargar `./js/configs/config-5.js`

## Subdominios Configurados

| Subdominio | Config | Archivo |
|------------|--------|---------|
| amarres-de-amor-efectivos | 5 | config-5.js |
| brujeria-consulta-gratis | 3 | config-3.js |
| brujos-expertos-online | 6 | config-6.js |
| hechizos-de-amor-poderosos | 7 | config-7.js |
| brujeria-blanca-consulta | 8 | config-8.js |
| amarres-rapidos-efectivos | 9 | config-9.js |
| brujos-consulta-gratis | 11 | config-11.js |
| magia-blanca-amarres | 15 | config-15.js |
| hechizos-efectivos-amor | 16 | config-16.js |
| brujeria-poderosa-online | 17 | config-17.js |
| amarres-de-pareja-gratis | 18 | config-18.js |
| brujos-especialistas-amor | 20 | config-20.js |
| consulta-esoterica-gratis | 21 | config-21.js |

## Notas Importantes

- **Propagación DNS**: Los cambios de nameservers pueden tardar hasta 48 horas en propagarse
- **Certificados SSL**: Vercel genera automáticamente certificados wildcard
- **Cache**: El Edge Function incluye headers de cache apropiados
- **Fallback**: Si no se detecta subdominio, se carga la configuración por defecto

## Troubleshooting

Si los subdominios siguen sin funcionar:

1. Verificar que el dominio wildcard esté configurado en Vercel
2. Confirmar que los nameservers estén correctamente configurados
3. Esperar la propagación DNS completa
4. Revisar los logs de Vercel en `/_logs`
5. Usar la página `/debug` para diagnosticar problemas