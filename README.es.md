# Plantilla Fullstack JC-Code

![Logo JC-Code](public/logo.svg)

Una plantilla ligera pero profesional creada por **JCGJ94** para seguir creciendo como desarrollador joven en el mundo tech. Este repositorio conecta un frontend moderno en React con un backend modular en Flask para que avances rápido en proyectos personales, MVPs y productos listos para producción.

> Looking for the English version? [Click here](README.md).

## Destacados

- ⚛️ **Frontend:** React (lista para Vite) con configuraciones pensadas para iterar rápido.
- 🐍 **Backend:** Flask con estructura modular y blueprints orientados a REST.
- 🔗 **Puente API:** Comunicación lista entre cliente y servidor.
- ⚙️ **Entornos:** Configuración base para desarrollo y producción.
- 🧱 **Estructura clara:** Carpetas limpias y escalables para crecer sin caos.
- 🧩 **Listo para deploy:** Compatible con Render, Vercel, Docker y más.

## Estructura del proyecto

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

El repositorio ya separa el frontend en `src/front` y la API de Flask en `src/api`. Usa el árbol como guía si quieres expandirlo hacia carpetas dedicadas `client/` y `server/`.

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
          python-version: "3.11"
          cache: "pipenv"
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

| Tarea                              | Comando                |
| ---------------------------------- | ---------------------- |
| Ejecutar pruebas del backend       | `pipenv run pytest`    |
| Formatear código del backend       | `pipenv run black app` |
| Ejecutar pruebas del frontend      | `npm run test`         |
| Crear build de producción frontend | `npm run build`        |
| Previsualizar el build compilado   | `npm run preview`      |

Adapta o amplía estos comandos según tus necesidades.

## Notas de despliegue

- **Render**: Despliega el backend con `render.yaml` y sirve el frontend como sitio estático.
- **Vercel**: Apunta a `client/` con `npm run build` como comando de build.
- **Docker**: Une ambos servicios con un Dockerfile multi-stage o con Docker Compose.

## Ideal para

- 🚀 Prototipos rápidos
- 💼 Aplicaciones comerciales listas
- 🧠 Proyectos personales o de portafolio
- ⚙️ MVPs y pruebas de concepto

## Licencia

Distribuido bajo la licencia MIT. Consulta [`LICENSE`](LICENSE) para más detalles.

Hecho con ambición por **JCGJ94** — sigue construyendo, sigue aprendiendo.
