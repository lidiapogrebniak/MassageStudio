import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TURNSTILE_SITE_KEY_META } from "./src/utils/turnstileSiteKey.js";

// Dev-only counterpart of functions/_middleware.js: fills the site key meta tag from .env
function injectTurnstileSiteKey(siteKey) {
  return {
    name: "inject-turnstile-site-key",
    apply: "serve",
    transformIndexHtml(html) {
      return html.replace(
        `<meta name="${TURNSTILE_SITE_KEY_META}" content="" />`,
        `<meta name="${TURNSTILE_SITE_KEY_META}" content="${siteKey ?? ""}" />`,
      );
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    injectTurnstileSiteKey(loadEnv(mode, process.cwd(), "").TURNSTILE_API_KEY),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
