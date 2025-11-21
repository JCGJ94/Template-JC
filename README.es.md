# Plantilla Fullstack JC-Code

![Logo JC-Code](public/logo.svg)

> 🧩 Este repositorio es el punto de partida.
> Haz clic en **“Use this template”** para crear tu propio proyecto.

¿Buscas la documentación en inglés? [Da clic aquí.](README.md)

## ¿Qué incluye?

- ⚛️ **Frontend:** React sobre Vite con configuraciones listas y una capa visual que cambia entre Bootstrap y Tailwind usando `VITE_UI_LIBRARY`.
- 🐍 **Backend:** Flask + SQLAlchemy configurado mediante la fábrica de aplicaciones (`src/app_factory.py`) para escalar sin tocar el punto de entrada.
- 🧱 **Estructura:** Carpeta compartida `src/` con blueprints en `src/api`, configuraciones reutilizables en `src/config` y la app de React en `src/front`.
- ⚙️ **Experiencia de desarrollo:** Bootstrap en un solo comando (`npm run bootstrap`), servidores sincronizados (`npm run dev:full`) y pruebas con Pytest en `tests/`.

## Requisitos

- Python 3.11
- [Pipenv](https://pipenv.pypa.io/) para las dependencias del backend
- Node.js 20 o superior

## Inicio rápido

1. Copia el archivo de variables: `cp .env.example .env`.
2. Instala las dependencias de una vez: `npm run bootstrap` *(o ejecuta `pipenv install` y `npm install` por separado).* 
3. Levanta ambos servidores juntos: `npm run dev:full`.
4. (Opcional) Aplica las migraciones: `pipenv run migrate` y luego `pipenv run upgrade`.

¿Prefieres controlar cada servicio? Usa `pipenv run dev` para la API o `npm run dev:front` para el frontend.

La [guía de inicio rápido](docs/INICIO_RAPIDO.md) detalla flujos alternos (SQLite, terminales separadas, etc.).

## Scripts útiles

| Comando | Descripción |
| --- | --- |
| `npm run dev:full` | Lanza Flask (`pipenv run dev`) y Vite al mismo tiempo. |
| `npm run dev:front` | Solo frontend con recarga en caliente. |
| `pipenv run dev` | Solo backend con recarga automática. |
| `pipenv run migrate` / `pipenv run upgrade` | Gestiona las migraciones. |
| `pipenv run pytest` | Ejecuta las pruebas del backend en `tests/`. |
| `npm run lint` | Aplica las reglas de lint al proyecto React. |

## Estructura del proyecto

```
.
├── docs/                  # Guías y notas de arquitectura
├── public/                # Recursos estáticos servidos por Vite
├── scripts/               # Scripts auxiliares (bootstrap, orquestación)
├── src/
│   ├── api/               # Blueprints, modelos y rutas de Flask
│   ├── config/            # Configuraciones por entorno
│   ├── front/             # Aplicación de React (componentes, páginas, store)
│   ├── app.py             # Punto de entrada de Flask
│   └── app_factory.py     # Fábrica de aplicaciones para todos los entornos
├── tests/                 # Pruebas de Pytest para la API
├── Pipfile / Pipfile.lock # Dependencias del backend
└── package.json           # Dependencias del frontend y scripts compartidos
```

## Variables de entorno

- `DATABASE_URL`: cadena de conexión utilizada por SQLAlchemy (PostgreSQL por defecto; SQLite también funciona).
- `FLASK_APP_KEY`: clave secreta para las sesiones de Flask.
- `VITE_UI_LIBRARY`: elige `bootstrap`, `tailwind` o `both` para cargar el estilo deseado en React.
- `VITE_BASENAME` y `VITE_BACKEND_URL`: ajustan el enrutamiento y la URL de la API en el frontend.

Actualiza `.env` según tus necesidades y reinicia los servidores para aplicar los cambios.

## Pruebas y calidad

- Backend: `pipenv run pytest`
- Lint del frontend: `npm run lint`
- Previsualizar el build: `npm run build` seguido de `npm run preview`

## Notas de despliegue

- El repositorio incluye configuraciones para Render (`render.yaml` + `Dockerfile.render`).
- `render.yaml` viene listo para el plan gratuito y permite pasar a premium cambiando `plan: free` por `starter` o `pro`.
- `render_build.sh` instala ambos stacks y ejecuta las migraciones para que backend y frontend lleguen alineados al despliegue.
- `npm run build` genera un frontend listo para producción en `dist/`.
- Usa `.env.production` (frontend) y variables de entorno en tu plataforma para mantener los secretos fuera del código.

### Render: despliegue gratis o premium en minutos

1. Confirma tus cambios y sube tu repositorio a GitHub o GitLab.
2. En Render, selecciona **Blueprint > New Blueprint Instance** y apunta al repositorio.
3. (Opcional) Ajusta el campo `plan` en `render.yaml` si necesitas más recursos; déjalo en `free` para permanecer en el nivel gratuito.
4. Revisa las variables de entorno preconfiguradas (por ejemplo, `FLASK_APP_KEY`, `DATABASE_URL`, `VITE_BASENAME`) y actualiza los valores en el panel de Render si lo necesitas.
5. Pulsa **Apply**: Render aprovisionará el servicio, ejecutará `render_build.sh` (instala, construye y migra) y arrancará Gunicorn con la entrada del `Procfile` ya incluida.

¿Necesitas una base de datos rápida? El blueprint crea PostgreSQL automáticamente; puedes cambiar `DATABASE_URL` por SQLite en `.env` si prefieres un archivo local.

## Licencia

Distribuido bajo la licencia MIT. Consulta [`LICENSE`](LICENSE) para más detalles.

Creado con ambición por **JCGJ94** — ¡sigue construyendo y aprendiendo!
