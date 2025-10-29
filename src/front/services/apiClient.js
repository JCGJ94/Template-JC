import { requireApiBaseUrl } from "../config/env";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

function withApiPrefix(path) {
  if (!path.startsWith("/")) {
    return `/api/${path}`;
  }

  return path.startsWith("/api") ? path : `/api${path}`;
}

async function request(path, options = {}) {
  const baseUrl = requireApiBaseUrl();
  const target = `${baseUrl}${withApiPrefix(path)}`;

  const response = await fetch(target, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers ?? {}),
    },
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(payload?.message ?? response.statusText);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) =>
    request(path, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
};
