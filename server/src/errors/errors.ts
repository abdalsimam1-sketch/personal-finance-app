export class CustomError extends Error{
    statusCode:number
    isOperational :boolean

    constructor(message:string,statusCode:number,isOperational=true){
        super(message)
        this.statusCode=statusCode
        this.isOperational=isOperational
        this.name=this.constructor.name
        Error.captureStackTrace(this,CustomError)
    }
}

export class BadRequestError extends CustomError
{
    constructor(message="Bad request"){
            super(message, 400)
           
    }
}

export class NotFoundError extends CustomError
{
    constructor(message="Resource not found"){
            super(message, 404)
           
    }
}

export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class ConflictError extends CustomError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

export class ValidationError extends CustomError {
  constructor(message = "Validation failed") {
    super(message, 422);
  }
}

export class RateLimitError extends CustomError {
  constructor(message = "Too many requests, please try again later") {
    super(message, 429);
  }
}

export class InternalServerError extends CustomError {
  constructor(message = "Internal server error") {
    super(message, 500, false); // ← not operational, since this signals a real bug
  }
}

