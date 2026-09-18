export function getPhoneDigits(phone) {
  return phone ? phone.replace(/\D/g, "") : "";
}
