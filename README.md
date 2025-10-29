# WebApp boilerplate with React JS and Flask API

Build web applications using React.js for the front end and python/flask for your backend API.

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

### 1) Installation:

> If you use Github Codespaces (recommended) or Gitpod this template will already come with Python, Node and the Posgres Database installed. If you are working locally make sure to install Python 3.10, Node 

It is recomended to install the backend first, make sure you have Python 3.10, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install` *(or run `npm run bootstrap` to install Python and Node dependencies together)*
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application in debug mode: `$ pipenv run dev`
7. (Optional) Run backend tests: `$ pipenv run pytest`

> Note: Codespaces users can connect to psql by typing: `psql -h localhost -U gitpod example`

### Undo a migration

You are also able to undo a migration by running

```sh
$ pipenv run downgrade
```

### Backend Populate Table Users

To insert test users in the database execute the following command:

```sh
$ flask insert-test-users 5
```

And you will see the following message:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

### **Important note for the database and the data inside it**

Every Github codespace environment will have **its own database**, so if you're working with more people eveyone will have a different database and different records inside it. This data **will be lost**, so don't spend too much time manually creating records for testing, instead, you can automate adding records to your database by editing ```commands.py``` file inside ```/src/api``` folder. Edit line 32 function ```insert_test_data``` to insert the data according to your model (use the function ```insert_test_users``` above as an example). Then, all you need to do is run ```pipenv run insert-test-data```.

### Front-End Manual Installation:

-   Make sure you are using node version 20 and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install` *(already covered if you ran `npm run bootstrap`)*
2. Start coding with the full stack: `$ npm run dev:full` (or run `$ npm run dev:front` if you only need React)

### Choosing your UI library

The React application ships with Bootstrap and Tailwind CSS so you can pick the toolkit that best fits each project:

1. Copy the environment file template if you have not already done so: `cp .env.example .env`.
2. Set the `VITE_UI_LIBRARY` variable to `bootstrap`, `tailwind` or `both`.
3. Restart the Vite dev server so the new styles are applied.

The default value is `bootstrap`, which keeps backwards compatibility with previous versions of the template.

## Publish your website!

This boilerplate it's 100% read to deploy with Render.com and Heroku in a matter of minutes. Please read the [official documentation about it](https://4geeks.com/docs/start/deploy-to-render-com).

### Contributors

This template was built as part of the 4Geeks Academy [Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [Alejandro Sanchez](https://twitter.com/alesanchezr) and many other contributors. Find out more about our [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), and [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

You can find other templates and resources like this at the [school github page](https://github.com/4geeksacademy/).
