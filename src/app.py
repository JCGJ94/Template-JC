"""Compatibility module that instantiates the Flask application."""

from __future__ import annotations

from app_factory import create_app

app = create_app()


if __name__ == "__main__":  # pragma: no cover - manual execution helper
    app.run(host="0.0.0.0", port=int(app.config.get("PORT", 3001)))
