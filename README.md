# Plantilla Full Stack (React + Flask)

Esta es una plantilla base optimizada para desarrollo Full Stack con React (Frontend) y Flask (Backend). Diseñada para ser ligera, rápida y fácil de usar.

## Características

- **Frontend**: React con Vite.
- **Backend**: Flask con SQLAlchemy.
- **Base de Datos**: PostgreSQL (fácilmente adaptable).
- **Estilos**: Soporte para Bootstrap y Tailwind CSS.
- **Gestión de Dependencias**: `npm` para frontend, `pipenv` para backend.

## Requisitos Previos

- Node.js (v20 o superior recomendado)
- Python (v3.10 o superior)
- Pipenv (`pip install pipenv`)
- PostgreSQL (opcional, si usas base de datos local)

## Instalación

1.  **Instalar dependencias del Frontend:**
    ```bash
    npm install
    ```

2.  **Instalar dependencias del Backend:**
    ```bash
    pipenv install
    ```

## Desarrollo

Para iniciar el entorno de desarrollo completo (Frontend + Backend) en una sola terminal:

```bash
npm run dev:full
```

- El **Frontend** estará disponible en `http://localhost:3000` (o el puerto que asigne Vite).
- El **Backend** estará disponible en `http://localhost:3001` (o puerto 5000 por defecto).

### Comandos Individuales

- Solo Frontend: `npm run dev:front`
- Solo Backend: `npm run dev:api`

## Estructura del Proyecto

- `src/front`: Código fuente de React.
- `src/api`: Código fuente de Flask (modelos, rutas).
- `migrations`: Archivos de migración de base de datos.

## Base de Datos

Para inicializar la base de datos:

```bash
pipenv run init
pipenv run migrate
pipenv run upgrade
```

## Despliegue

Esta plantilla está lista para ser desplegada en plataformas como Render, Heroku o Railway.
- **Render**: Usa el archivo `render.yaml` incluido.

---
Creado por Jose Carlos.
