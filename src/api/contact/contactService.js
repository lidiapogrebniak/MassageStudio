import { validateContact } from "./validate.js";
import { verifyTurnstile } from "./verifyTurnstile.js";
import { ApiServerError } from "../apiErrors.js";

const FORMINIT_TIMEOUT_MS = 8000;

export async function handleContact(formData, config) {
  const { name, phone, message, captchaToken } = formData;

  const { FORMINIT_URL, FORMINIT_API_KEY, TURNSTILE_SECRET, IS_PRODUCTION } =
    config;

  // 1. Валидация
  validateContact({ name, phone, message });

  // 2. Проверка капчи
  await verifyTurnstile(captchaToken, TURNSTILE_SECRET);

  if (IS_PRODUCTION) {
    // 3. Отправка в ForminIt
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
                phone: phone,
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
  }

  return { success: true };
}
