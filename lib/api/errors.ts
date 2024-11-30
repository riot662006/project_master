export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized: User not authenticated") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(
    message: string = "Forbidden: Access to this resource is denied",
  ) {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request: Invalid data provided") {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found: Resource does not exist") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}
