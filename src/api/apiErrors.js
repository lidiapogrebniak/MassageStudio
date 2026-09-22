export class ApiError extends Error {
  constructor(message, status) {
    if (new.target === ApiError) {
      throw new TypeError(
        "ApiError is abstract and cannot be instantiated directly",
      );
    }
    super(message);
    this.name = new.target.name;
    this.status = status;
  }
}

export class ApiValidationError extends ApiError {
  constructor(fieldErrors) {
    super("Validation failed", 400);
    this.fieldErrors = fieldErrors;
  }
}

export class ApiServerError extends ApiError {
  constructor(message, status = 500) {
    super(message, status);
  }
}

export class ApiExternalServiceError extends ApiServerError {
  constructor(message, status = 502) {
    super(message, status);
  }
}

export class ApiRateLimitError extends ApiError {
  constructor(message = "Too many requests") {
    super(message, 429);
  }
}
