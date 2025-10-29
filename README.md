# JC-Code Fullstack Starter Template

![JC-Code logo](public/jc-code-logo.svg)

A lightweight yet professional starter template curated by **JCGJ94** for growing as a young developer in tech. This repository connects a modern React frontend with a modular Flask backend so you can move fast on personal projects, MVPs, and production-ready experiments.

> ¿Buscas la versión en español? [Haz clic aquí](README.es.md).

## Highlights

- ⚛️ **Frontend:** React (Vite-ready) with sensible defaults for fast iteration.
- 🐍 **Backend:** Flask with a modular structure and REST-friendly blueprints.
- 🔗 **API bridge:** Ready-to-use communication layer between client and server.
- ⚙️ **Environment presets:** Base configuration for development and production.
- 🧱 **Folder layout:** Clean, scalable structure that grows with your project.
- 🧩 **Deployment ready:** Works with Render, Vercel, Docker, and similar platforms.

## Project structure

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

This repository already separates the React app in `src/front` and the Flask API in `src/api`. Use the tree above as a blueprint if you decide to expand into dedicated `client/` and `server/` folders.

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

- **Render**: Deploy backend via the `render.yaml` configuration and connect the frontend using the static site workflow.
- **Vercel**: Point Vercel to the `client/` directory with `npm run build` as the build command.
- **Docker**: Combine both services using a multi-stage Dockerfile or Compose stack for consistent builds.

## Ideal for

- 🚀 Rapid prototypes
- 💼 Production-ready commercial apps
- 🧠 Personal or portfolio projects
- ⚙️ MVPs and proof of concept iterations

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

Crafted with ambition by **JCGJ94** — keep building, keep learning!
