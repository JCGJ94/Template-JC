"""API routes.

The blueprint remains in the same location to respect the original
structure while providing a cleaner set of sample endpoints that can be
expanded in future projects.
"""

from __future__ import annotations

from http import HTTPStatus
from typing import Dict, List

from flask import Blueprint, jsonify, request

from .models import User

api = Blueprint("api", __name__)


@api.get("/health")
def healthcheck() -> Dict[str, str]:
    """Minimal health-check endpoint useful for monitoring."""

    return {"status": "ok"}


@api.route("/hello", methods=["GET", "POST"])
def handle_hello():
    """Echo the payload or return a greeting message."""

    if request.method == "POST":
        payload = request.get_json(silent=True) or {}
        message = payload.get("message", "Hello from the backend!")
        return jsonify({"message": message}), HTTPStatus.CREATED

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the inspector to see the GET request.",
    }
    return jsonify(response_body), HTTPStatus.OK


@api.get("/users")
def list_users() -> Dict[str, List[dict]]:
    """Return a serialized list of users to illustrate a REST pattern."""

    users = [user.serialize() for user in User.query.order_by(User.id.asc())]
    return {"results": users}
