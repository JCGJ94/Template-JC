"""WSGI entry point for production servers."""

from __future__ import annotations

from app_factory import create_app

application = create_app()


if __name__ == "__main__":  # pragma: no cover - manual execution helper
    application.run()
