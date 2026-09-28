// The public Turnstile site key is injected into index.html at request time
// (Vite dev server locally, functions/_middleware.js on Cloudflare Pages)
export const TURNSTILE_SITE_KEY_META = "turnstile-site-key";

export function getTurnstileSiteKey() {
  return (
    document.querySelector(`meta[name="${TURNSTILE_SITE_KEY_META}"]`)
      ?.content || undefined
  );
}
