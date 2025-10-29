# Quick start

This guide summarizes the minimum steps to get the template running in development. It uses the same
Flask + SQLAlchemy backend and React frontend that ship with the repository.

## Requirements

- Python 3.10
- [Pipenv](https://pipenv.pypa.io/) for backend dependency management
- Node.js 20+
- A database engine (SQLite works out of the box, PostgreSQL is recommended)

## 1. Configure your environment

```bash
cp .env.example .env
```

Adjust the values if you need a different database or want to point the frontend to a remote API. The
`VITE_UI_LIBRARY` variable lets you choose between Bootstrap, Tailwind CSS or both at the same time.

## 2. Install dependencies

```bash
npm run bootstrap
```

> Prefer a shell script? Run `bash scripts/bootstrap.sh`. On Windows without a POSIX shell you can execute the commands separately: `pipenv install` followed by `npm install`.

If you do not have PostgreSQL handy you can update `DATABASE_URL` to use SQLite while developing:

```
DATABASE_URL=sqlite:///development.db
```

## 3. Run the stack

Use the new orchestration script to launch the Flask API and Vite dev server with a single command:

```bash
npm run dev:full
```

The command internally spawns `pipenv run dev` for the backend and `npm run dev:front` for the React
application. Both services stream their logs to the terminal, and stopping the command will shut down
both processes gracefully.

You can still run either side independently when needed:

```bash
pipenv run dev      # Backend only (debug + auto reload)
npm run dev:front   # Frontend only
```

## 4. Database migrations

```bash
pipenv run migrate
pipenv run upgrade
```

Use `pipenv run downgrade` to undo the last migration if you need to roll back a change.

## 5. Tests and linting

```bash
pipenv run pytest   # Backend API smoke tests
npm run lint        # React lint rules
```

---

For a full overview of the project structure and extension points, check
[`docs/ARCHITECTURE.md`](./ARCHITECTURE.md).
