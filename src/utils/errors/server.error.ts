import { ServerError } from './application.error';

export class KartoffelError extends ServerError {
  constructor(message?: string) {
    super(message || 'Error contacting kartoffel');
  }
}
