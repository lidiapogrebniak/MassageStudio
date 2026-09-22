import { handleContact } from "../../src/api/contact/contactService.js";
import { toErrorResponse } from "../../src/api/apiErrorResponse.js";

export async function onRequestPost(context) {
  const { request, env } = context;

  // Without KV cooldown silently disables, so in production this is a config error
  if (!env.CONTACT_COOLDOWN_KV) {
    console.error("CONTACT_COOLDOWN_KV binding is missing");
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const data = await request.json();

    const result = await handleContact(data, {
      FORMINIT_URL: env.FORMINIT_URL,
      FORMINIT_API_KEY: env.FORMINIT_API_KEY,
      TURNSTILE_SECRET: env.TURNSTILE_SECRET,
      SKIP_EMAIL: env.SKIP_EMAIL,
      CONTACT_COOLDOWN_KV: env.CONTACT_COOLDOWN_KV,
    });

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
