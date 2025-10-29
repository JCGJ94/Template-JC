from __future__ import annotations


def test_health_endpoint(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json == {"status": "ok"}


def test_hello_get(client):
    response = client.get("/api/hello")
    assert response.status_code == 200
    assert "message" in response.json


def test_hello_post(client):
    payload = {"message": "Hola"}
    response = client.post("/api/hello", json=payload)
    assert response.status_code == 201
    assert response.json == payload
