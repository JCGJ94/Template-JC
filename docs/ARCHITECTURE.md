# Arquitectura de la plantilla

Esta plantilla mantiene la estructura original del proyecto pero añade
algunos componentes para facilitar su escalabilidad y personalización.

## Backend

- **`src/app_factory.py`**: contiene la función `create_app` que crea la
  instancia de Flask. Desde aquí se registran extensiones, blueprints y
  manejadores de errores.
- **`src/app.py`** y **`src/wsgi.py`**: puntos de entrada mínimos que
  reutilizan la `create_app`.
- **`src/config/`**: define clases de configuración para distintos
  entornos (desarrollo, producción y tests) y una utilidad para resolver
  la cadena de conexión a la base de datos.
- **`src/api/extensions.py`**: centraliza las extensiones de Flask
  (SQLAlchemy, Migrate, CORS) para poder reutilizarlas en factories y
  pruebas.
- **`src/api/routes.py`**: incluye rutas de ejemplo (`/health`, `/hello`,
  `/users`) que muestran buenas prácticas para expandir la API.
- **`tests/`**: pruebas unitarias con Pytest que validan la inicialización
  de la app y los endpoints básicos.

## Frontend

- **`src/front/config/env.js`**: normaliza las variables de entorno de
  Vite y valida que `VITE_BACKEND_URL` esté configurada.
- **`src/front/services/`**: capa de servicios reutilizables que se
  encargan de comunicarse con el backend.
- **`src/front/store/`**: ahora se divide en `index.js` (reducer),
  `types.js` (tipos y creadores de acciones) para mejorar la escalabilidad
  del estado global.
- Los componentes existentes (`pages`, `components`, `hooks`) se mantienen
  pero se actualizan para consumir la nueva capa de servicios y acciones.
- **`src/front/styles/`**: resuelve el framework de estilos (Bootstrap,
  Tailwind o ambos) según la variable `VITE_UI_LIBRARY` y define estilos
  compartidos para mantener la coherencia visual.

## Cómo extenderla

1. Crea nuevos blueprints o módulos en `src/api` y regístralos dentro de
   `app_factory.create_app`.
2. Añade servicios frontend en `src/front/services` para encapsular las
   llamadas al backend.
3. Ajusta la configuración por entorno mediante variables en `.env` o
   extendiendo las clases de `src/config`.
4. Crea pruebas adicionales en la carpeta `tests/` para garantizar la
   estabilidad de tu proyecto base.

## Flujo de desarrollo

- `pipenv run dev`: inicia el backend con recarga automática y modo debug.
- `npm run dev:front`: levanta el servidor de Vite para trabajar solo el frontend.
- `npm run dev:full`: ejecuta ambos comandos anteriores mediante `scripts/dev-full.mjs`
  para que el backend y el frontend arranquen con un solo comando.

Con esta estructura puedes evolucionar gradualmente la plantilla sin
perder compatibilidad con proyectos existentes.
