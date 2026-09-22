import {
  ApiValidationError,
  ApiServerError,
  ApiRateLimitError,
} from "./apiErrors.js";

export function toErrorResponse(error) {
  if (error instanceof ApiValidationError) {
    return { status: error.status, body: { fieldErrors: error.fieldErrors } };
  }

  if (error instanceof ApiServerError || error instanceof ApiRateLimitError) {
    return { status: error.status, body: { error: error.message } };
  }

  console.error("Unhandled API error:", error);
  return { status: 500, body: { error: "Internal server error" } };
}
