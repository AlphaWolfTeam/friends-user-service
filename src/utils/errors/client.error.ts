import { ClientError } from './application.error';

export class ResourceNotFoundError extends ClientError {
  constructor(message?: string) {
    super(message || 'resource not found', 404);
  }
}

export class InvalidArgument extends ClientError {
  constructor(message?: string) {
    super(message || 'One of the arguments is invalid', 400);
  }
}

export class UserNotFoundError extends ClientError {
  constructor(message?: string) {
    super(message || 'The requested user was not found', 404);
  }
}
