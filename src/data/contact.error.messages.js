import { ContactErrorCodes } from "../api/contact/contactErrorCodes";
export const contactErrorMessages = {
  [ContactErrorCodes.NAME_REQUIRED]: "Введіть ім'я",
  [ContactErrorCodes.NAME_TOO_LONG]: "Ім'я занадто довге",
  [ContactErrorCodes.PHONE_REQUIRED]: "Введіть номер телефону",
  [ContactErrorCodes.PHONE_INVALID]: "Некоректний номер телефону",
  [ContactErrorCodes.MESSAGE_TOO_LONG]: "Повідомлення занадто довге",
  [ContactErrorCodes.CAPTCHA_REQUIRED]: "Потрібно пройти капчу",
  [ContactErrorCodes.INVALID_CAPTCHA]: "Перевірку капчі не пройдено",
};