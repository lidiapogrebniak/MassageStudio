import { fi, th } from "zod/locales";
import { ContactErrorCodes } from "./contactErrorCodes.js";

export async function verifyTurnstile(token, secret) {
  const fieldErrors = {};
  const throwCaptchaError = (message) => {
    fieldErrors.captcha = message;
    throw new Error(JSON.stringify({ fieldErrors: fieldErrors }));
  }

  if (!token) {
    throwCaptchaError(ContactErrorCodes.CAPTCHA_REQUIRED);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secret}&response=${token}`,
   }
  )

  const data = await response.json()

  if (!data.success) {
    throwCaptchaError(ContactErrorCodes.INVALID_CAPTCHA);
  }

  return true
}