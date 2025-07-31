# Guía de Despliegue con Múltiples Subdominios en Vercel

Esta guía explica cómo desplegar el proyecto en Vercel utilizando subdominios para cargar diferentes configuraciones automáticamente.

## Preparación del Repositorio

1. Asegúrate de tener todo el código en un repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Preparación para despliegue en Vercel"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/MaestroBrujoOnline.git
   git push -u origin main
   ```

## Despliegue en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com) si aún no tienes una.
2. Desde el dashboard de Vercel, haz clic en "New Project".
3. Importa tu repositorio de GitHub.
4. Configura el proyecto con los siguientes ajustes:
   - **Framework Preset**: Other
   - **Build Command**: Dejar en blanco
   - **Output Directory**: Dejar en blanco
5. Haz clic en "Deploy".

## Configuración de Subdominios

### Opción 1: Subdominios en un Dominio Personalizado

Si tienes un dominio personalizado (por ejemplo, `tudominio.com`):

1. Ve a la sección "Domains" en la configuración del proyecto en Vercel.
2. Agrega tu dominio personalizado y verifica la propiedad según las instrucciones.
3. Una vez verificado, agrega los siguientes subdominios (uno por cada configuración):
   - `config3.tudominio.com`
   - `config5.tudominio.com`
   - `config6.tudominio.com`
   - `config7.tudominio.com`
   - `config8.tudominio.com`
   - `config9.tudominio.com`
   - `config11.tudominio.com`
   - `config15.tudominio.com`
   - `config16.tudominio.com`
   - `config17.tudominio.com`
   - `config18.tudominio.com`
   - `config20.tudominio.com`
   - `config21.tudominio.com`

4. Para cada subdominio, configura los registros DNS en tu proveedor de dominio:
   - Tipo: `CNAME`
   - Nombre: el subdominio (por ejemplo, `config3`)
   - Valor: el dominio de Vercel de tu proyecto (por ejemplo, `proyecto.vercel.app`)

### Opción 2: Subdominios en el Dominio de Vercel

Si no tienes un dominio personalizado, puedes usar subdominios en el dominio `.vercel.app`:

1. Ve a la sección "Domains" en la configuración del proyecto en Vercel.
2. Para cada configuración, agrega un nuevo dominio con el formato:
   - `config3-tuproyecto.vercel.app`
   - `config5-tuproyecto.vercel.app`
   - etc.

## Cómo Funciona

El sistema está configurado para detectar automáticamente el subdominio y cargar la configuración correspondiente:

1. Cuando un usuario visita `config3.tudominio.com` (o `config3-tuproyecto.vercel.app`), el middleware detecta "config3" en el subdominio.
2. El middleware carga dinámicamente el archivo `js/configs/config-3.js` en lugar del archivo `config.js` predeterminado.
3. Esto permite tener 13 versiones diferentes del sitio con diferentes números de teléfono y WhatsApp, todo desde un solo repositorio y despliegue.

## Prueba de las Configuraciones

Para verificar que cada configuración funciona correctamente:

1. Visita cada subdominio en tu navegador.
2. Comprueba que los números de teléfono y WhatsApp son los correctos para cada configuración.
3. Verifica que los botones de contacto funcionan correctamente.

## Solución de Problemas

Si encuentras problemas con el despliegue o la carga de configuraciones:

1. Verifica los logs de despliegue en Vercel para identificar errores.
2. Asegúrate de que todos los archivos de configuración (`config-X.js`) están correctamente formateados.
3. Comprueba que los subdominios están correctamente configurados en Vercel y en tu proveedor de DNS (si usas un dominio personalizado).

## Actualización del Sitio

Para actualizar el sitio después de hacer cambios:

1. Realiza los cambios en tu repositorio local.
2. Haz commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push
   ```
3. Vercel detectará automáticamente los cambios y desplegará la nueva versión.