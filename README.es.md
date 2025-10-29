# Plantilla Fullstack JC-Code

![Logo JC-Code](public/jc-code-logo.svg)

- La documentación se puede encontrar aquí: https://4geeks.com/docs/start/react-flask-template
- Aquí hay un video sobre [cómo usar esta plantilla](https://www.youtube.com/watch?v=qBz6Ddd2m38)
- Integrado con Pipenv para la gestión de paquetes.
- Despliegue rápido a Render [en solo unos pocos pasos aquí](https://4geeks.com/es/docs/start/despliega-con-render-com).
- Uso del archivo .env.
- Integración de SQLAlchemy para la abstracción de bases de datos.
- Arquitectura lista para escalar documentada en [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) con `app_factory`, extensiones
  reutilizables y capa de servicios en el frontend.
- Capa visual configurable que te permite alternar entre Bootstrap y Tailwind mediante la variable de entorno `VITE_UI_LIBRARY`.
- Bucle de desarrollo con un solo comando: `npm run dev:full` inicia la API en Flask y el servidor de Vite al mismo tiempo.

## Inicio rápido (TL;DR)

1. Copia el archivo de variables: `cp .env.example .env`.
2. Instala todas las dependencias con un solo comando: `npm run bootstrap` (o ejecuta `bash scripts/bootstrap.sh`, `pipenv install` y `npm install`).
3. Ejecuta toda la pila: `npm run dev:full`.

Si prefieres usar scripts de shell directamente, `bash scripts/bootstrap.sh` realiza la misma configuración que `npm run bootstrap`.

La guía de [Inicio rápido](docs/INICIO_RAPIDO.md) explica ajustes opcionales (URL de SQLite, ejecutar servicios por separado, etc.).

### Novedades principales

- Configuración centralizada en `src/config` con soporte para entornos de desarrollo, producción y pruebas.
- Fábrica de aplicaciones (`src/app_factory.py`) que permite personalizar el backend sin tocar los puntos de entrada.
- Nuevo endpoint `/api/health` para monitoreo y servicios frontend (`src/front/services`) que encapsulan las llamadas a la API.
- Suite de pruebas básica con Pytest (`tests/`) para garantizar la estabilidad de la plantilla.

> Looking for the English version? [Click here](README.md).

## Destacados

- ⚛️ **Frontend:** React (lista para Vite) con configuraciones pensadas para iterar rápido.
- 🐍 **Backend:** Flask con estructura modular y blueprints orientados a REST.
- 🔗 **Puente API:** Comunicación lista entre cliente y servidor.
- ⚙️ **Entornos:** Configuración base para desarrollo y producción.
- 🧱 **Estructura clara:** Carpetas limpias y escalables para crecer sin caos.
- 🧩 **Listo para deploy:** Compatible con Render, Vercel, Docker y más.

1. Instala los paquetes de python: `$ pipenv install` *(o ejecuta `npm run bootstrap` para instalar Python y Node al mismo tiempo)*
2. Crea un archivo .env basado en el .env.example: `$ cp .env.example .env`
3. Instala tu motor de base de datos y crea tu base de datos, dependiendo de tu base de datos, debes crear una variable DATABASE_URL con uno de los valores posibles, asegúrate de reemplazar los valores con la información de tu base de datos:

```
mi-plantilla-base/
│
├── client/                # Frontend React (Vite o CRA)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                # Backend Flask
│   ├── app/
│   ├── requirements.txt
│   └── run.py
│
├── .gitignore
├── README.md
└── LICENSE
```

4. Migra las migraciones: `$ pipenv run migrate` (omite si no has hecho cambios en los modelos en `./src/api/models.py`)
5. Ejecuta las migraciones: `$ pipenv run upgrade`
6. Ejecuta la aplicación en modo debug: `$ pipenv run dev`
7. (Opcional) Ejecuta las pruebas del backend: `$ pipenv run pytest`

## Primeros pasos

### 1. Crea tu repositorio desde la plantilla

1. Haz clic en **Use this template → Create a new repository**.
2. Clona tu nuevo repositorio:
   ```bash
   git clone https://github.com/tuusuario/tu-nuevo-proyecto.git
   cd tu-nuevo-proyecto
   ```

### 2. Configura tu entorno local

Trabaja cada entorno por separado para mantener cada herramienta enfocada en su responsabilidad.

#### Backend (Flask + Pipenv)

```bash
cd server
pipenv install
cp .env.example .env  # configura secretos, URLs, etc.
pipenv run start      # inicia el servidor de desarrollo de Flask
```

- Usa `pipenv run migrate` / `pipenv run upgrade` para manejar migraciones.
- Define comandos personalizados en `app/commands.py` y ejecútalos con `pipenv run <comando>`.
- Guarda parámetros solo de desarrollo (por ejemplo, `FLASK_DEBUG=1`) en `.env` y usa `.env.production` para despliegues.

#### Frontend (React + npm)

```bash
cd client
npm install
npm run start   # servidor de Vite con recarga instantánea
```

- Agrega scripts extra (tests, lint, builds) en `client/package.json` y ejecútalos con `npm run <script>`.
- Configura variables de entorno con `.env.development` / `.env.production` y publícalas con el prefijo `VITE_`.
- En local, define `VITE_API_URL=http://localhost:3001` (o el puerto de tu backend) para conectar el cliente con Flask.

### 3. Usa la plantilla dentro de GitHub

Mantén un flujo consistente automatizando las verificaciones en GitHub. El siguiente ejemplo de GitHub Actions instala ambos
entornos, cachea dependencias y ejecuta los comandos clave mencionados arriba:

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: client/package-lock.json
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pipenv'
      - run: pip install pipenv
      - run: pipenv install --dev
        working-directory: server
      - run: npm install
        working-directory: client
      - run: pipenv run pytest
        working-directory: server
      - run: npm run test -- --watch=false
        working-directory: client
```

- Guarda secretos (como `DATABASE_URL`, `FLASK_SECRET_KEY` o `VITE_API_URL`) en **Settings → Secrets and variables → Actions**.
- Para builds de previsualización, crea un segundo job que ejecute `npm run build` y cargue `client/dist/` como artefacto.
- Combina el workflow con reglas de protección de rama para que cada pull request pase la tubería antes de hacer merge.

## Tips para tu flujo de desarrollo

| Tarea                               | Comando                              |
|-------------------------------------|--------------------------------------|
| Ejecutar pruebas del backend        | `pipenv run pytest`                  |
| Formatear código del backend        | `pipenv run black app`               |
| Ejecutar pruebas del frontend       | `npm run test`                       |
| Crear build de producción frontend  | `npm run build`                      |
| Previsualizar el build compilado    | `npm run preview`                    |

Adapta o amplía estos comandos según tus necesidades.

## Notas de despliegue

1. Instala los paquetes: `$ npm install` *(ya cubierto si ejecutaste `npm run bootstrap`)*
2. ¡Empieza a codificar con toda la pila! `$ npm run dev:full` (o ejecuta `$ npm run dev:front` si solo necesitas React)

### Elegir tu librería de UI

La aplicación de React incluye Bootstrap y Tailwind CSS para que selecciones el toolkit que mejor se adapte a cada proyecto:

1. Copia el archivo de entorno si todavía no lo has hecho: `cp .env.example .env`.
2. Define `VITE_UI_LIBRARY` con los valores `bootstrap`, `tailwind` o `both`.
3. Reinicia el servidor de desarrollo de Vite para aplicar los estilos nuevos.

El valor por defecto es `bootstrap`, manteniendo la compatibilidad con versiones anteriores de la plantilla.

## Ideal para

- 🚀 Prototipos rápidos
- 💼 Aplicaciones comerciales listas
- 🧠 Proyectos personales o de portafolio
- ⚙️ MVPs y pruebas de concepto

## Licencia

Distribuido bajo la licencia MIT. Consulta [`LICENSE`](LICENSE) para más detalles.

Hecho con ambición por **JCGJ94** — sigue construyendo, sigue aprendiendo.
