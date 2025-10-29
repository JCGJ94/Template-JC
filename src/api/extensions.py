"""Centralized Flask extension instances.

Having a single module that exposes the extensions (database, migration
manager, CORS, etc.) keeps the application factory light and makes it
easy to reuse the same objects during testing.
"""

from __future__ import annotations

from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

#: SQLAlchemy database instance shared across the project.
db: SQLAlchemy = SQLAlchemy()

#: Database migration helper used by Alembic.
migrate: Migrate = Migrate()

#: Configurable Cross-Origin Resource Sharing handler.
cors: CORS = CORS()

__all__ = ["cors", "db", "migrate"]
