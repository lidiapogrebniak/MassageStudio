import { validateContact } from "./serverValidateContact.js";
import { verifyTurnstile } from "./verifyTurnstile.js";
import { checkCooldown, startCooldown } from "./contactCooldown.js";
import { ApiServerError } from "../apiErrors.js";

const FORMINIT_TIMEOUT_MS = 8000;

export async function handleContact(formData, config) {
  const { name: rawName, message, captchaToken } = formData;

  const {
    FORMINIT_URL,
    FORMINIT_API_KEY,
    TURNSTILE_SECRET,
    SKIP_EMAIL,
    CONTACT_COOLDOWN_KV,
  } = config;

  // 1. Validation
  const { name, phone } = validateContact({
    name: rawName,
    phone: formData.phone,
    message,
  });

  // 2. Captcha verification
  await verifyTurnstile(captchaToken, TURNSTILE_SECRET);

  // if SKIP_EMAIL set to 'true' email sending and cooldown are skipped
  if (SKIP_EMAIL === "true") {
    console.info("[skip-email] contact form, email not sent", { name, phone });
    return { success: true };
  }

  await checkCooldown(CONTACT_COOLDOWN_KV, phone);

  // 3. Send to ForminIt
  let response;
  try {
    response = await fetch(FORMINIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": FORMINIT_API_KEY,
      },
      body: JSON.stringify({
        blocks: [
          {
            type: "sender",
            properties: {
              fullName: name,
              phone,
            },
          },
          {
            type: "text",
            name: "message",
            value: message,
          },
        ],
      }),
      signal: AbortSignal.timeout(FORMINIT_TIMEOUT_MS),
    });
  } catch (error) {
    if (error.name === "TimeoutError") {
      throw new ApiServerError("Email service timed out", 504);
    }
    throw error;
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error("ForminIt error response:", errorText); // Log the error response
    throw new ApiServerError("Email service error");
  }

  await startCooldown(CONTACT_COOLDOWN_KV, phone);

  return { success: true };
}
