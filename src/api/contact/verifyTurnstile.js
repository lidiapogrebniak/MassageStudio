import { ContactErrorCodes } from "./contactErrorCodes.js";
import { ApiValidationError, ApiExternalServiceError } from "../apiErrors.js";

const TURNSTILE_TIMEOUT_MS = 8000;

export async function verifyTurnstile(token, secret) {
  const throwCaptchaError = (message) => {
    throw new ApiValidationError({ captcha: message });
  };

  if (!token) {
    throwCaptchaError(ContactErrorCodes.CAPTCHA_REQUIRED);
  }

  let response;
  try {
    response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secret}&response=${token}`,
        signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS),
      },
    );
  } catch (error) {
    if (error.name === "TimeoutError") {
      throw new ApiExternalServiceError("Captcha verification timed out", 504);
    }
    throw error;
  }

  if (!response.ok) {
    throw new ApiExternalServiceError(
      "Captcha verification service unavailable",
    );
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new ApiExternalServiceError(
      "Captcha verification service unavailable",
    );
  }

  if (!data.success) {
    throwCaptchaError(ContactErrorCodes.INVALID_CAPTCHA);
  }

  return true;
}
