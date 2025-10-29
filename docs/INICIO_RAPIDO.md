# Inicio rápido

Esta guía resume los pasos mínimos para ejecutar la plantilla en modo desarrollo. Utiliza el mismo
backend Flask + SQLAlchemy y el frontend en React que vienen en el repositorio.

## Requisitos

- Python 3.10
- [Pipenv](https://pipenv.pypa.io/) para manejar las dependencias del backend
- Node.js 20 o superior
- Un motor de base de datos (SQLite funciona sin configuración extra; PostgreSQL es recomendado)

## 1. Configura tu entorno

```bash
cp .env.example .env
```

Ajusta los valores si necesitas otra base de datos o si quieres apuntar el frontend hacia una API remota.
La variable `VITE_UI_LIBRARY` te permite escoger entre Bootstrap, Tailwind CSS o ambas al mismo tiempo.

## 2. Instala las dependencias

```bash
npm run bootstrap
```

> ¿Prefieres un script de shell? Ejecuta `bash scripts/bootstrap.sh`. En Windows, si no cuentas con una terminal POSIX, corre los comandos por separado: `pipenv install` seguido de `npm install`.

Si no cuentas con PostgreSQL puedes cambiar `DATABASE_URL` para usar SQLite durante el desarrollo:

```
DATABASE_URL=sqlite:///development.db
```

## 3. Ejecuta toda la pila

Utiliza el nuevo script de orquestación para levantar la API en Flask y el servidor de Vite con un solo
comando:

```bash
npm run dev:full
```

El comando lanza internamente `pipenv run dev` para el backend y `npm run dev:front` para la aplicación
React. Ambos servicios envían sus logs a la terminal, y al detener el comando se finalizarán los dos
procesos de forma controlada.

También puedes ejecutar cada lado por separado cuando lo necesites:

```bash
pipenv run dev      # Solo backend (debug + recarga automática)
npm run dev:front   # Solo frontend
```

## 4. Migraciones de base de datos

```bash
pipenv run migrate
pipenv run upgrade
```

Usa `pipenv run downgrade` para revertir la última migración si necesitas deshacer un cambio.

## 5. Pruebas y linting

```bash
pipenv run pytest   # Pruebas rápidas del API
npm run lint        # Reglas de lint para React
```

---

Para una vista completa de la arquitectura y los puntos de extensión revisa
[`docs/ARCHITECTURE.md`](./ARCHITECTURE.md).
