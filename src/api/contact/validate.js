import { contactSchema } from "./contactScheme.js";
import { ApiValidationError } from "../apiErrors.js";

export function validateContact(data) {

  const result = contactSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors = {};
    result.error.issues.forEach((err) => {
      fieldErrors[err.path[0]] = err.message;
    });
    throw new ApiValidationError(fieldErrors);
  }

  return true
}