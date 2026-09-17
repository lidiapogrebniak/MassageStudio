import { handleContact } from "../../src/api/contact/contactService.js";
import {
  ApiServerError,
  ApiValidationError,
  ApiRateLimitError,
} from "../../src/api/apiErrors.js";

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

    const result = await handleContact(data, {
      FORMINIT_URL: env.FORMINIT_URL,
      FORMINIT_API_KEY: env.FORMINIT_API_KEY,
      TURNSTILE_SECRET: env.TURNSTILE_SECRET,
      IS_PRODUCTION: env.IS_PRODUCTION === "true",
      CONTACT_COOLDOWN_KV: env.CONTACT_COOLDOWN_KV,
    });

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof ApiValidationError) {
      return new Response(JSON.stringify({ fieldErrors: error.fieldErrors }), {
        status: error.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (error instanceof ApiServerError || error instanceof ApiRateLimitError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("Contact request failed:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
