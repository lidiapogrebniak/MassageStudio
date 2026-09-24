import { handleContact } from "../../src/api/contact/contactService.js";
import { toErrorResponse } from "../../src/api/apiErrorResponse.js";
import { REQUIRED_CONTACT_CONFIG_KEYS, getMissingContactConfigKeys } from "../../src/api/contact/contactConfig.js";

export async function onRequestPost(context) {
  const { request, env } = context;

  // Without these, the pipeline silently misbehaves or fails downstream, so in production this is a config error
  const missingKeys = getMissingContactConfigKeys(env, [...REQUIRED_CONTACT_CONFIG_KEYS, "CONTACT_COOLDOWN_KV"]);
  if (missingKeys.length > 0) {
    console.error(`Missing required contact API config: ${missingKeys.join(", ")}`);
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
      SEND_EMAIL: env.SEND_EMAIL,
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
