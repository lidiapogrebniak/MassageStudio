import { TURNSTILE_SITE_KEY_META } from "../src/utils/turnstileSiteKey.js";

// Puts the public Turnstile site key into every HTML page so it can change without a rebuild
export async function onRequest(context) {
  const { env, next } = context;
  const response = await next();

  const contentType = response.headers.get("Content-Type") ?? "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  if (!env.TURNSTILE_API_KEY) {
    console.error("Missing TURNSTILE_API_KEY, captcha will not render");
    return response;
  }

  return new HTMLRewriter()
    .on(`meta[name="${TURNSTILE_SITE_KEY_META}"]`, {
      element(element) {
        element.setAttribute("content", env.TURNSTILE_API_KEY);
      },
    })
    .transform(response);
}
