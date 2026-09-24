export const REQUIRED_CONTACT_CONFIG_KEYS = ["FORMINIT_URL", "FORMINIT_API_KEY", "TURNSTILE_SECRET", "SEND_EMAIL"];

export function getMissingContactConfigKeys(config, requiredKeys = REQUIRED_CONTACT_CONFIG_KEYS) {
  return requiredKeys.filter((key) => !config[key]);
}
