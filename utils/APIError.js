/**
 * Created by Joseph Utulu April 5th, 2021.
 *
 * A custom error response format.
 *
 * @extends Error
 */
 class ErrorResponse extends Error {
  constructor ({
    message, errors, status, isPublic, stack
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.stack = stack;
  }
}

class APIError extends ErrorResponse {
  constructor ({
    message, errors, stack, status = 500, isPublic = false
  }) {
    super({
      message, errors, status, isPublic, stack
    });
  }
}

module.exports = APIError;
