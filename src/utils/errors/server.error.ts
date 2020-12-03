import { ServerError } from './application.error';

export class SpikeError extends ServerError {
  constructor(message?: string) {
    super(message || 'Error contacting spike');
  }
}

export class KartoffelError extends ServerError {
  constructor(message?: string) {
    super(message || 'Error contacting kartoffel');
  }
}

export class ApprovalError extends ServerError {
  constructor(message?: string) {
    super(message || 'Error contacting approval service');
  }
}
