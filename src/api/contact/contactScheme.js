import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { ContactErrorCodes } from "./contactErrorCodes.js";

export const contactSchema = z.object({
  name: z
    .string({
      required_error: ContactErrorCodes.NAME_REQUIRED,
      invalid_type_error: ContactErrorCodes.NAME_INVALID_TYPE
    })
    .trim()
    .min(1, ContactErrorCodes.NAME_REQUIRED)
    .max(30, ContactErrorCodes.NAME_TOO_LONG),

  phone: z
    .string({
      required_error: ContactErrorCodes.PHONE_REQUIRED,
      invalid_type_error: ContactErrorCodes.PHONE_INVALID_TYPE
    })
    .trim()
    .min(1, ContactErrorCodes.PHONE_REQUIRED)
    .refine((value) => {
        if (value === "") return true;

        const digitsOnly = value.replace(/\D/g, "");
        return parsePhoneNumberFromString("+" + digitsOnly, "UA")?.isValid() || false;
    }, ContactErrorCodes.PHONE_INVALID),

  message: z
    .string()
    .max(500, ContactErrorCodes.MESSAGE_TOO_LONG)
    .optional()
});