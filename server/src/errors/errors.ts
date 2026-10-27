export class CustomError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class BadRequest extends CustomError {
  constructor(message = "Invalid request") {
    super(message, 400);
  }
}

export class Unauthorized extends CustomError {
  constructor(message = "Authentication required") {
    super(message, 401);
  }
}

export class Forbidden extends CustomError {
  constructor(message = "You do not have permission to do this") {
    super(message, 403);
  }
}

export class NotFound extends CustomError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class Conflict extends CustomError {
  constructor(message = "Resource already exists") {
    super(message, 409);
  }
}

export class TooManyRequests extends CustomError {
  constructor(message = "Too many requests, try again later") {
    super(message, 429);
  }
}
