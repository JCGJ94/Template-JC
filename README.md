# JC-Code Fullstack Starter Template

![JC-Code logo](public/jc-code-logo.svg)

> 🧩 Este repositorio es una plantilla base.  
> Para iniciar un nuevo proyecto, usa **“Use this template”** arriba ↑

- Documentation can be found here: https://4geeks.com/docs/start/react-flask-template
- Here is a video on [how to use this template](https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b)
- Integrated with Pipenv for package managing.
- Fast deployment to Render [in just a few steps here](https://4geeks.com/docs/start/deploy-to-render-com).
- Use of .env file.
- SQLAlchemy integration for database abstraction.
- Ready-to-extend architecture described in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) with an application factory, reusable
  extensions and a services layer for the frontend.
- Configurable UI layer that lets you switch between Bootstrap and Tailwind through the `VITE_UI_LIBRARY` environment variable.
- One-command development loop via `npm run dev:full`, which starts the Flask API and the Vite dev server together.

## Quick start (TL;DR)

1. Copy the environment template: `cp .env.example .env`.
2. Install all dependencies in one go: `npm run bootstrap` (or run `bash scripts/bootstrap.sh`, `pipenv install` and `npm install`).
3. Launch everything at once: `npm run dev:full`.

If you prefer running shell scripts directly, `bash scripts/bootstrap.sh` performs the same setup as `npm run bootstrap`.

The [Quick start guide](docs/QUICKSTART.md) covers optional tweaks (SQLite URL, running services separately, etc.).

### Highlights of this fork

- Centralized configuration through `src/config` with first-class support for development, production and testing environments.
- Application factory (`src/app_factory.py`) that makes it trivial to customize the backend while keeping the entry point compact.
- New `/api/health` endpoint for monitoring and a service layer on the frontend (`src/front/services`) that wraps API calls.
- Basic test suite powered by Pytest (`tests/`) to ensure the template stays stable as you extend it.

> ¿Buscas la versión en español? [Haz clic aquí](README.es.md).

## Highlights

- ⚛️ **Frontend:** React (Vite-ready) with sensible defaults for fast iteration.
- 🐍 **Backend:** Flask with a modular structure and REST-friendly blueprints.
- 🔗 **API bridge:** Ready-to-use communication layer between client and server.
- ⚙️ **Environment presets:** Base configuration for development and production.
- 🧱 **Folder layout:** Clean, scalable structure that grows with your project.
- 🧩 **Deployment ready:** Works with Render, Vercel, Docker, and similar platforms.

1. Install the python packages: `$ pipenv install` *(or run `npm run bootstrap` to install Python and Node dependencies together)*
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the valudes with your database information:

```
mi-plantilla-base/
│
├── client/                # React frontend (Vite or CRA)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                # Flask backend
│   ├── app/
│   ├── requirements.txt
│   └── run.py
│
├── .gitignore
├── README.md
└── LICENSE
```

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application in debug mode: `$ pipenv run dev`
7. (Optional) Run backend tests: `$ pipenv run pytest`

## Getting started

### 1. Create your repo from the template

1. Click **Use this template → Create a new repository**.
2. Clone the freshly created repository:
   ```bash
   git clone https://github.com/tuusuario/tu-nuevo-proyecto.git
   cd tu-nuevo-proyecto
   ```

### 2. Configure your local environment

Work with both environments independently so each toolchain remains focused on its job.

#### Backend (Flask + Pipenv)

```bash
cd server
pipenv install
cp .env.example .env  # configure secrets, URLs, etc.
pipenv run start      # launches the Flask development server
```

- Use `pipenv run migrate` / `pipenv run upgrade` to manage database migrations.
- Create custom commands inside `app/commands.py` and execute them with `pipenv run <command>`.
- Keep development-only settings (e.g., debug flags) inside `.env` and production settings in `.env.production`.

#### Frontend (React + npm)

```bash
cd client
npm install
npm run start   # vite dev server with instant HMR
```

- Add extra scripts (tests, linting, builds) to `client/package.json` and run them with `npm run <script>`.
- Configure environment variables with `.env.development` / `.env.production` and expose them with the `VITE_` prefix.
- When working locally, set `VITE_API_URL=http://localhost:3001` (or your backend port) to point the client to Flask.

### 3. Use the template inside GitHub

You can keep a consistent workflow by automating checks in GitHub. The following GitHub Actions snippet installs both
environments, caches dependencies, and runs the key scripts defined above:

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

- Store secrets (such as `DATABASE_URL`, `FLASK_SECRET_KEY`, or `VITE_API_URL`) in **Settings → Secrets and variables → Actions**.
- For preview builds, add a second job that runs `npm run build` and uploads the `client/dist/` folder as an artifact.
- Pair the workflow with branch protection rules so every pull request must pass the pipeline before merging.

## Development workflow tips

| Task                                | Command                             |
|-------------------------------------|-------------------------------------|
| Run backend tests                   | `pipenv run pytest`                 |
| Format backend code (example)       | `pipenv run black app`              |
| Run frontend unit tests             | `npm run test`                      |
| Create production frontend build    | `npm run build`                     |
| Serve the compiled frontend preview | `npm run preview`                   |

Feel free to replace or extend these commands according to your stack.

## Deployment notes

1. Install the packages: `$ npm install` *(already covered if you ran `npm run bootstrap`)*
2. Start coding with the full stack: `$ npm run dev:full` (or run `$ npm run dev:front` if you only need React)

### Choosing your UI library

The React application ships with Bootstrap and Tailwind CSS so you can pick the toolkit that best fits each project:

1. Copy the environment file template if you have not already done so: `cp .env.example .env`.
2. Set the `VITE_UI_LIBRARY` variable to `bootstrap`, `tailwind` or `both`.
3. Restart the Vite dev server so the new styles are applied.

The default value is `bootstrap`, which keeps backwards compatibility with previous versions of the template.

## Ideal for

- 🚀 Rapid prototypes
- 💼 Production-ready commercial apps
- 🧠 Personal or portfolio projects
- ⚙️ MVPs and proof of concept iterations

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

Crafted with ambition by **JCGJ94** — keep building, keep learning!
