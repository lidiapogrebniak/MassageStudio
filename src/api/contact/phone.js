import { parsePhoneNumberFromString } from "libphonenumber-js";

export function normalizePhoneE164(phone) {
  const digitsOnly = phone.replace(/\D/g, "");
  const parsed = parsePhoneNumberFromString("+" + digitsOnly, "UA");
  return parsed?.isValid() ? parsed.number : null;
}
