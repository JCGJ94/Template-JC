const rawBackendUrl = import.meta.env.VITE_BACKEND_URL ?? "";

const normalizedBackendUrl = rawBackendUrl.endsWith("/")
  ? rawBackendUrl.slice(0, -1)
  : rawBackendUrl;

export const appConfig = {
  apiBaseUrl: normalizedBackendUrl,
  isBackendConfigured: Boolean(normalizedBackendUrl),
};

export function requireApiBaseUrl() {
  if (!appConfig.isBackendConfigured) {
    throw new Error(
      "VITE_BACKEND_URL is not defined. Update your .env file to point to the Flask backend.",
    );
  }

  return appConfig.apiBaseUrl;
}
