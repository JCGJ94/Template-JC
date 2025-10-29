"""Application factory for the Flask backend.

The factory keeps the original entry-point (``src/app.py``) extremely
small while enabling custom initialization hooks for future projects.
"""

from __future__ import annotations

import logging
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, jsonify, send_from_directory
from werkzeug.middleware.proxy_fix import ProxyFix

from api.admin import setup_admin
from api.commands import setup_commands
from api.routes import api
from api.utils import APIException, generate_sitemap
from api.extensions import cors, db, migrate
from config import BaseConfig, get_config, get_database_uri


def create_app(config_name: str | None = None, *, configure_static_routes: bool = True) -> Flask:
    """Create and configure a Flask application instance."""

    load_dotenv()
    config: BaseConfig = get_config(config_name)

    app = Flask(
        __name__,
        static_folder=config.STATIC_FOLDER,
        static_url_path=config.STATIC_URL_PATH,
    )
    app.config.from_object(config)
    app.config.setdefault("SQLALCHEMY_DATABASE_URI", get_database_uri())
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)  # type: ignore[assignment]

    _configure_logging(app)
    _register_extensions(app)
    _register_blueprints(app)
    _register_error_handlers(app)
    setup_admin(app)
    setup_commands(app)

    if configure_static_routes:
        _register_static_routes(app)

    return app


def _configure_logging(app: Flask) -> None:
    log_level = app.config.get("LOG_LEVEL", "INFO")
    logging.basicConfig(level=getattr(logging, str(log_level).upper(), logging.INFO))


def _register_extensions(app: Flask) -> None:
    database_uri = app.config.get("SQLALCHEMY_DATABASE_URI")
    if not database_uri:
        raise RuntimeError("SQLALCHEMY_DATABASE_URI is not configured")

    db.init_app(app)
    migrate.init_app(app, db, compare_type=True)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})


def _register_blueprints(app: Flask) -> None:
    app.register_blueprint(api, url_prefix="/api")


def _register_error_handlers(app: Flask) -> None:
    @app.errorhandler(APIException)
    def handle_api_exception(error: APIException):  # type: ignore[override]
        return jsonify(error.to_dict()), error.status_code


def _register_static_routes(app: Flask) -> None:
    static_dir = Path(app.static_folder or "")

    @app.route("/")
    def sitemap():
        if app.config.get("ENV") == "development":
            return generate_sitemap(app)
        return send_from_directory(static_dir, "index.html")

    @app.route("/<path:path>", methods=["GET"])
    def serve_any_other_file(path: str):
        candidate = static_dir / path
        if not candidate.exists():
            path = "index.html"
        response = send_from_directory(static_dir, path)
        response.cache_control.max_age = 0
        return response


__all__ = ["create_app"]
