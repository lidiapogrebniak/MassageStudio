import { z } from "zod";
import { ContactErrorCodes } from "./contactErrorCodes.js";
import { normalizePhoneE164 } from "./phone.js";

export const contactSchema = z.object({
  name: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return ContactErrorCodes.NAME_REQUIRED;
        }
        return ContactErrorCodes.NAME_INVALID_TYPE;
      },
    })
    .trim()
    .min(1, ContactErrorCodes.NAME_REQUIRED)
    .max(30, ContactErrorCodes.NAME_TOO_LONG),

  phone: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return ContactErrorCodes.PHONE_REQUIRED;
        }
        return ContactErrorCodes.PHONE_INVALID_TYPE;
      },
    })
    .trim()
    .min(1, ContactErrorCodes.PHONE_REQUIRED)
    .refine(
      (value) => value === "" || !!normalizePhoneE164(value),
      ContactErrorCodes.PHONE_INVALID,
    ),

  message: z.string().max(500, ContactErrorCodes.MESSAGE_TOO_LONG).optional(),
});
