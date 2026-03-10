import { contactSchema } from "./contactScheme.js";
export function validateContact(data) {

  const result = contactSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors = {};
    result.error.issues.forEach((err) => {
      fieldErrors[err.path[0]] = err.message;
    });
    throw new Error(JSON.stringify(
      { fieldErrors: fieldErrors }
    ));

  }

  return true
}