// Public, non-secret settings the frontend needs at runtime (served by GET /api/client-config)
export function getClientConfig(config) {
  return {
    turnstileSiteKey: config.TURNSTILE_API_KEY,
  };
}
