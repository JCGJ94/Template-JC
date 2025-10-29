"""Application configuration helpers.

The template keeps the original project structure but introduces a small
configuration layer so that future projects can extend it without
modifying the application entry-point.  Each environment derives from
``BaseConfig`` and the :func:`get_config` helper resolves the best option
based on environment variables.
"""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Type

BASE_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = BASE_DIR / "dist"
INSTANCE_DIR = BASE_DIR / "instance"
INSTANCE_DIR.mkdir(exist_ok=True)


def _normalize_database_url(url: str) -> str:
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql://", 1)
    return url


def build_default_sqlite_uri() -> str:
    """Return the default SQLite URI used when ``DATABASE_URL`` is missing."""

    return f"sqlite:///{INSTANCE_DIR / 'app.db'}"


def get_database_uri(default: str | None = None) -> str:
    """Resolve the SQLAlchemy database URI for the current environment."""

    fallback = default or build_default_sqlite_uri()
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        return fallback
    return _normalize_database_url(database_url)


@dataclass(slots=True)
class BaseConfig:
    """Base configuration shared between environments."""

    ENV: str = "production"
    DEBUG: bool = False
    TESTING: bool = False
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me")
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False
    JSON_SORT_KEYS: bool = False
    SQLALCHEMY_DATABASE_URI: str = ""
    STATIC_FOLDER: str = str(DIST_DIR)
    STATIC_URL_PATH: str = ""
    API_TITLE: str = os.getenv("API_TITLE", "JCGJ94 Starter API")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    def init_app(self, app) -> None:  # pragma: no cover - hook for overrides
        """Hook that child classes can extend for custom initialization."""


@dataclass(slots=True)
class DevelopmentConfig(BaseConfig):
    ENV: str = "development"
    DEBUG: bool = True


@dataclass(slots=True)
class ProductionConfig(BaseConfig):
    ENV: str = "production"
    DEBUG: bool = False


@dataclass(slots=True)
class TestingConfig(BaseConfig):
    ENV: str = "testing"
    DEBUG: bool = True
    TESTING: bool = True
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///:memory:"


CONFIG_MAP: Dict[str, Type[BaseConfig]] = {
    "development": DevelopmentConfig,
    "dev": DevelopmentConfig,
    "production": ProductionConfig,
    "prod": ProductionConfig,
    "testing": TestingConfig,
    "test": TestingConfig,
}


def get_config(config_name: str | None = None) -> BaseConfig:
    """Return an instantiated configuration object for the given name."""

    env_name = (config_name or os.getenv("FLASK_ENV") or os.getenv("ENV") or "development").lower()
    config_cls = CONFIG_MAP.get(env_name, DevelopmentConfig)
    config = config_cls()
    if not getattr(config, "SQLALCHEMY_DATABASE_URI", None):
        config.SQLALCHEMY_DATABASE_URI = get_database_uri()
    return config


__all__ = [
    "BaseConfig",
    "DevelopmentConfig",
    "ProductionConfig",
    "TestingConfig",
    "get_config",
    "get_database_uri",
]
