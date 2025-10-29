#!/usr/bin/env bash
set -euo pipefail

if ! command -v pipenv >/dev/null 2>&1; then
  echo "[bootstrap] pipenv is not installed or not on PATH." >&2
  echo "Install pipenv (https://pipenv.pypa.io/en/latest/#install-pipenv-today) and re-run this script." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[bootstrap] npm is not installed or not on PATH." >&2
  echo "Install Node.js (https://nodejs.org/) which ships with npm and re-run this script." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

echo "[bootstrap] Installing Python dependencies with pipenv..."
pipenv install

echo "[bootstrap] Installing frontend dependencies with npm..."
npm install

echo "[bootstrap] All dependencies installed."
