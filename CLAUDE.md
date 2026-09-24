# MassageStudio

## Project Overview

MassageStudio is a marketing site for a massage studio: a React SPA (Home/About/Services/Contacts) with one backend endpoint that handles the contact form.

Server logic runs in two environments — **local:** Express on Node.js; **production:** Cloudflare Pages Functions. Production is the source of truth for deployment behavior. Express exists locally only because Wrangler can't run on the dev Mac — don't migrate local dev to Wrangler unless explicitly requested.

## Tech Stack

Vite 7 + React 19 (JS, no TS), `react-router-dom` v7, `react-bootstrap`, `zod`, `libphonenumber-js`. Local API: Express 5. Tooling: ESLint 9 (flat config) + Prettier 3, `concurrently`. No test framework yet. No database — the only persistence is a Cloudflare KV namespace used solely for contact-form rate limiting.

## Directory Structure

```
src/
  api/                  # companyApi.js, servicesApi.js (fetch public/data/*.json)
    apiErrors.js         # ApiValidationError / ApiRateLimitError / ApiServerError
    contact/              # shared contact-form logic (used by both server adapters)
  components/ui|feature, pages/, layouts/, hooks/, utils/
  router/               # router.jsx, lazyPages.js, loaders/ (per-route data loading)
  data/texts.uk.js       # all UI copy (Ukrainian, hardcoded, no i18n lib)
  styles/index.css       # global styles (rest is CSS Modules per component)

server/server.js          # Express adapter, local dev only
functions/api/contact.js  # Cloudflare Pages Function adapter, production
public/data/*.json         # static company/services data
```

## Server Architecture

One API route today: `POST /api/contact`, shared logic in `src/api/contact/contactService.js#handleContact()`, called by two thin adapters — `server/server.js` (Express) and `functions/api/contact.js` (Cloudflare). Never duplicate business logic between them.

Pipeline: validate (Zod) → verify Turnstile captcha → check KV-based 24h per-phone cooldown (no-op without a KV binding, so always skipped locally) → POST to third-party service **ForminIt**, which sends the actual email → start cooldown. If `SEND_EMAIL !== "true"`, cooldown+ForminIt are skipped and `{success:true}` returns immediately.

Env vars: `FORMINIT_URL`, `FORMINIT_API_KEY`, `TURNSTILE_SECRET`, `SEND_EMAIL` (both adapters, loaded from `.env` locally via Node's `loadEnvFile()`, all required — both adapters fail closed if any is missing); `CONTACT_COOLDOWN_KV` (Cloudflare-only KV binding — production hard-fails without it, no local equivalent).

Compatibility note: shared logic only uses `fetch`/`AbortSignal.timeout`/`zod`/`libphonenumber-js` (Workers-safe). The only Node-specific API, `loadEnvFile()`, is correctly isolated in `server/server.js` — don't let Node-only APIs leak into shared logic, and don't assume Express-working code works under Cloudflare Functions.

## Frontend

Static `company.json`/`services.json` are fetched client-side (no server route) via `companyApi.js`/`servicesApi.js` (cached in-memory). Routing is `createBrowserRouter` (`src/router/router.jsx`) with lazy-loaded pages and per-route loaders in `src/router/loaders/` that just call the API layer. No global state library — data flows through loaders + local state (plus one `useContacts` hook).

## Scripts

`dev` (Vite), `build`, `server` (Express on :3001), `dev:full` (both, via `concurrently`, gated by lint+format check), `lint`/`lint:fix`, `format`/`format:check`. `vite.config.js` proxies `/api/*` to `localhost:3001` in dev.

## Testing

No automated test framework/files exist yet. When changing server-side behavior: test shared logic in `src/api/contact/` independently, test the Express path, and explicitly consider Cloudflare Workers compatibility rather than assuming Express behavior carries over.
