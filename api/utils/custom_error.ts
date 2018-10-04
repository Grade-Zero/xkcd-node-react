
export class ApplicationError extends Error {
    meta: any;
    status: number;
  constructor(message?: string, status?: number, meta?: any) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || 'Something went wrong. Please try again.';

    this.status = status || 500;

    this.meta = meta || {}
  }
}

export class InvalidRequest extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Not all the required fields were provided', 400);
  }
}

export class NotAuthenticated extends ApplicationError {
  constructor(message?: string) {
    super(message || 'This request did not have the valid authentication. Please log back in.', 401);
  }
}

export class NotAuthorized extends ApplicationError {
  constructor(message?: string) {
    super(message || 'This user does not have access to this data.', 403);
  }
}
