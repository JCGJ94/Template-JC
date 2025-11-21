# JC-Code Fullstack Starter Template

![JC-Code logo](public/jc-code-logo.svg)

> 🧩 This repository is a starting point.
> Click **“Use this template”** to kick off your own project.

Looking for the Spanish documentation? [Read it here.](README.es.md)

## What's inside?

- ⚛️ **Frontend:** React on top of Vite with sensible defaults and a UI layer that can switch between Bootstrap and Tailwind via `VITE_UI_LIBRARY`.
- 🐍 **Backend:** Flask + SQLAlchemy, configured through an application factory (`src/app_factory.py`) so you can scale features without changing the entry point.
- 🧱 **Structure:** Shared `src/` directory with API blueprints in `src/api`, reusable configuration under `src/config`, and the React app in `src/front`.
- ⚙️ **Developer experience:** Single command bootstrap (`npm run bootstrap`), synchronized dev servers (`npm run dev:full`), and Pytest smoke tests in `tests/`.

## Requirements

- Python 3.11
- [Pipenv](https://pipenv.pypa.io/) for backend dependencies
- Node.js 20+

## Quick start

1. Copy the environment template: `cp .env.example .env`.
2. Install dependencies once: `npm run bootstrap` *(or run `pipenv install` and `npm install` separately).* 
3. Start both servers together: `npm run dev:full`.
4. (Optional) Apply database migrations: `pipenv run migrate` followed by `pipenv run upgrade`.

Prefer manual control? Run `pipenv run dev` for the API or `npm run dev:front` for the React app.

The [Quick start guide](docs/QUICKSTART.md) explains alternative flows (SQLite, separate terminals, etc.).

## Useful scripts

| Command | Description |
| --- | --- |
| `npm run dev:full` | Launch Flask (`pipenv run dev`) and Vite together. |
| `npm run dev:front` | Frontend only with hot module replacement. |
| `pipenv run dev` | Backend only with debug reload. |
| `pipenv run migrate` / `pipenv run upgrade` | Manage database migrations. |
| `pipenv run pytest` | Execute backend smoke tests in `tests/`. |
| `npm run lint` | Lint the React project. |

## Project structure

```
.
├── docs/                  # Guides and architecture notes
├── public/                # Static assets served by Vite
├── scripts/               # Helper scripts (bootstrap, dev orchestration)
├── src/
│   ├── api/               # Flask blueprints, models and routes
│   ├── config/            # Environment-specific settings
│   ├── front/             # React application (components, pages, store)
│   ├── app.py             # Flask entry point
│   └── app_factory.py     # Application factory used across environments
├── tests/                 # Pytest smoke tests for the API
├── Pipfile / Pipfile.lock # Backend dependencies
└── package.json           # Frontend dependencies and shared scripts
```

## Environment variables

- `DATABASE_URL`: connection string used by SQLAlchemy (defaults to PostgreSQL, SQLite works too).
- `FLASK_APP_KEY`: secret key for Flask sessions.
- `VITE_UI_LIBRARY`: choose `bootstrap`, `tailwind`, or `both` to load the desired styles in the React app.
- `VITE_BASENAME` and `VITE_BACKEND_URL`: configure routing and API target for the frontend.

Update `.env` as needed and restart the dev servers to apply the changes.

## Testing and quality

- Backend: `pipenv run pytest`
- Frontend linting: `npm run lint`
- Production build preview: `npm run build` followed by `npm run preview`

## Deployment tips

- Render deployment templates are included (`render.yaml` + `Dockerfile.render`).
- `render.yaml` is ready for the free tier and can be switched to premium by changing `plan: free` to `starter` or `pro`.
- `render_build.sh` installs both stacks and runs migrations so the backend and frontend stay in sync during deploys.
- `npm run build` generates a production-ready frontend in `dist/`.
- Use `.env.production` (frontend) and environment variables on your hosting platform to keep secrets out of source control.

### Render: free or premium setup in minutes

1. Commit any changes and push your repo to GitHub or GitLab.
2. In Render, choose **Blueprint > New Blueprint Instance** and point it to your repo.
3. (Optional) Adjust the `plan` field in `render.yaml` if you need premium resources; leave it as `free` for the no-cost tier.
4. Review the pre-wired environment variables (e.g., `FLASK_APP_KEY`, `DATABASE_URL`, `VITE_BASENAME`) and update values in the Render dashboard if needed.
5. Hit **Apply**—Render will provision the service, run `render_build.sh` (install + build + migrate), and start Gunicorn with the existing `Procfile` entry.

Need a quick DB? The blueprint provisions PostgreSQL automatically; you can swap `DATABASE_URL` for SQLite in `.env` if you prefer a file-based store.

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

Crafted with ambition by **JCGJ94** — keep building, keep learning!
