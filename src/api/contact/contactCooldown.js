import { ApiRateLimitError } from "../apiErrors.js";

const COOLDOWN_SECONDS = 60 * 60 * 24;

function cooldownKey(phone) {
  return `contact-cooldown:${phone}`;
}

export async function checkCooldown(kv, phone) {
  if (!kv) return;

  if (await kv.get(cooldownKey(phone))) {
    throw new ApiRateLimitError("Too many submissions from this phone number");
  }
}

export async function startCooldown(kv, phone) {
  if (!kv) return;

  await kv.put(cooldownKey(phone), "1", { expirationTtl: COOLDOWN_SECONDS });
}
