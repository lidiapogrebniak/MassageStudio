import { getClientConfig } from "../../src/api/clientConfig/clientConfigService.js";

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.TURNSTILE_API_KEY) {
    console.error("Missing required client config: TURNSTILE_API_KEY");
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(getClientConfig(env)), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
