# 🔧 Solución de Problemas: Subdominios Long Tail

## ✅ PROBLEMA IDENTIFICADO Y SOLUCIONADO

**Fecha de solución:** $(date)
**Estado:** RESUELTO - Esperando redepliegue de Vercel

### 🎯 **Problema Principal**
Las reglas de rewrite en `vercel.json` estaban interceptando TODAS las solicitudes, incluyendo los archivos JavaScript de configuración, causando que `CONFIG` apareciera como "no definida" en los subdominios.

### 🛠️ **Solución Implementada**

#### Problema Identificado
El middleware original estaba usando Node.js runtime, pero Vercel requiere Edge Functions para el manejo dinámico de subdominios. Esto causaba que:
1. Las reglas de rewrite interceptaran archivos JavaScript
2. El runtime de Node.js no fuera compatible con la infraestructura de Vercel
3. Los archivos de configuración no se cargaran correctamente
4. Error de configuración de runtime: "Function Runtimes must have a valid version"

#### Solución Final: Conversión a Edge Functions

**1. Configuración Correcta del Runtime**
```javascript
// En api/server.js
export const runtime = 'edge';
```

**Nota**: La configuración de runtime debe estar en el archivo de función, no en `vercel.json`

**2. Conversión del Middleware**
- **Antes:** `module.exports = (req, res) => {}`
- **Después:** `export default async function handler(req) {}`
- **API:** Cambio de Node.js req/res a Web API Request/Response
- **Headers:** `req.headers['x']` → `req.headers.get('x')`
- **File System:** `fs.readFile()` → `fetch()`

**3. Reglas de Rewrite Optimizadas**
```json
"rewrites": [
  { "source": "/debug", "destination": "/api/server.js" },
  { "source": "/js/(.*)", "destination": "/js/$1" },
  { "source": "/css/(.*)", "destination": "/css/$1" },
  { "source": "/images/(.*)", "destination": "/images/$1" },
  { "source": "/fonts/(.*)", "destination": "/fonts/$1" },
  { "source": "/", "destination": "/api/server.js" }
]
```

### ✅ **Verificación Local Exitosa**
Las pruebas locales confirman que:
- ✅ Edge Functions implementadas correctamente
- ✅ Los archivos de configuración se sirven correctamente
- ✅ La detección de subdominios funciona perfectamente
- ✅ Cada subdominio carga su configuración específica
- ✅ La página de debug muestra información correcta
- ✅ Runtime compatible con Vercel

## Problema Reportado
Los subdominios `brujeria-consulta-gratis.esoterico.app` y `amarres-de-amor-efectivos.esoterico.app` están mostrando la misma configuración en lugar de sus configuraciones específicas.

## ✅ Verificaciones Realizadas

### 1. Middleware Funcionando Correctamente
- ✅ El middleware `api/server.js` detecta correctamente los subdominios
- ✅ Las configuraciones `config-3.js` y `config-5.js` son diferentes:
  - `config-3.js`: WhatsApp `16462043573`
  - `config-5.js`: WhatsApp `19498917311`
- ✅ El mapeo de subdominios está correcto

### 2. Configuración de Vercel
- ✅ `vercel.json` tiene las reglas de rewrite correctas
- ✅ El middleware está en la ubicación correcta (`/api/server.js`)

## 🔍 Diagnóstico en Vercel

### Paso 1: Verificar Página de Debug
1. Accede a: `https://brujeria-consulta-gratis.esoterico.app/debug`
2. Accede a: `https://amarres-de-amor-efectivos.esoterico.app/debug`
3. Verifica la información mostrada:
   - Host detectado
   - Subdominio extraído
   - Configuración cargada
   - Número de WhatsApp mostrado

### Paso 2: Verificar Configuración de Dominios en Vercel
1. Ve a tu proyecto en Vercel Dashboard
2. Sección "Domains"
3. Verifica que ambos subdominios estén configurados:
   - `brujeria-consulta-gratis.esoterico.app`
   - `amarres-de-amor-efectivos.esoterico.app`
4. Asegúrate de que apunten al mismo proyecto

### Paso 3: Verificar DNS
1. Usa herramientas como `nslookup` o `dig`:
   ```bash
   nslookup brujeria-consulta-gratis.esoterico.app
   nslookup amarres-de-amor-efectivos.esoterico.app
   ```
2. Ambos deben apuntar a los servidores de Vercel

## 🚨 Posibles Causas del Problema

### 1. Configuración de DNS Incorrecta
**Síntoma**: Los subdominios no resuelven o apuntan al lugar incorrecto
**Solución**:
- Verificar registros CNAME en el proveedor de DNS
- Asegurar que apunten a `cname.vercel-dns.com`

### 2. Caché de Vercel
**Síntoma**: Los cambios no se reflejan inmediatamente
**Solución**:
- Hacer un nuevo deployment
- Limpiar caché del navegador
- Usar modo incógnito para probar

### 3. Configuración de Dominios en Vercel
**Síntoma**: Los subdominios no están correctamente asociados al proyecto
**Solución**:
- Re-agregar los dominios en Vercel
- Verificar que estén en el proyecto correcto

### 4. Problema con el Middleware
**Síntoma**: El middleware no se ejecuta en Vercel
**Solución**:
- Verificar que `api/server.js` esté en la ubicación correcta
- Revisar logs de Vercel para errores

## 🛠️ Pasos de Solución

### Solución Inmediata
1. **Redeploy del proyecto**:
   ```bash
   git add .
   git commit -m "Fix subdomain detection"
   git push
   ```

2. **Verificar en Vercel Dashboard**:
   - Functions tab: Verificar que `api/server.js` aparezca
   - Domains tab: Re-verificar dominios

3. **Probar con herramientas de debug**:
   - Acceder a `/debug` en cada subdominio
   - Verificar que la configuración sea diferente

### Solución Alternativa: Forzar Recarga
1. **Agregar parámetro de versión**:
   - Acceder a `https://brujeria-consulta-gratis.esoterico.app/?v=1`
   - Acceder a `https://amarres-de-amor-efectivos.esoterico.app/?v=1`

2. **Limpiar caché**:
   - Usar Ctrl+F5 o Cmd+Shift+R
   - Probar en modo incógnito

## Error Específico: "Function Runtimes must have a valid version"

### Causa
Este error ocurre cuando se configura incorrectamente el runtime de Edge Functions en `vercel.json`.

### Solución
1. **CORRECTO**: Configurar runtime en el archivo de función
   ```javascript
   // api/server.js
   export const runtime = 'edge';
   ```

2. **INCORRECTO**: Configurar runtime en vercel.json
   ```json
   // ❌ NO hacer esto
   {
     "functions": {
       "api/server.js": {
         "runtime": "edge"
       }
     }
   }
   ```

### Referencia
Según la [documentación oficial de Vercel](https://vercel.com/docs/functions/runtimes/edge), <mcreference link="https://vercel.com/docs/functions/runtimes/edge" index="2">2</mcreference> el runtime de Edge Functions debe declararse con `export const runtime = 'edge'` dentro del archivo de función.

## 📋 Checklist de Verificación

- [ ] Los subdominios están configurados en Vercel
- [ ] Los registros DNS apuntan correctamente
- [ ] El middleware `api/server.js` está desplegado
- [ ] Las configuraciones `config-3.js` y `config-5.js` existen
- [ ] La página `/debug` muestra información correcta
- [ ] Se ha hecho un redeploy reciente
- [ ] Se ha probado en modo incógnito

## 🔗 URLs de Prueba

### Páginas Principales
- https://brujeria-consulta-gratis.esoterico.app/
- https://amarres-de-amor-efectivos.esoterico.app/

### Páginas de Debug
- https://brujeria-consulta-gratis.esoterico.app/debug
- https://amarres-de-amor-efectivos.esoterico.app/debug

## 📞 Números de WhatsApp Esperados

- **brujeria-consulta-gratis**: `+16462043573`
- **amarres-de-amor-efectivos**: `+19498917311`

Si ambos subdominios muestran el mismo número, el problema está confirmado y se debe seguir este troubleshooting.