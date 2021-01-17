import * as apm from 'elastic-apm-node';
import { NextFunction, Request, Response } from 'express';
import { ApplicationError, ClientError } from './errors/application.error';

function extractTraceparent(req: Request): string | undefined {
  const traceparent = req.header('X-traceparent'); // add as config
  return traceparent;
}

function startApmTransaction(req: Request, functionName: string) {
  const traceparent = extractTraceparent(req);
  const transactionOptions = traceparent ? { childOf: traceparent } : {};
  return apm.startTransaction(functionName, transactionOptions);
}

/**
 * Wraps an asynchronous express request handler function with an error handler.
 * @param func - the asynchronous request handler function to wrap.
 */
export const wrapAsync = (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const transaction = startApmTransaction(req, func.name);

    func(req, res, next)
      .then(handleRequestSuccess(transaction))
      .catch(handleRequestError(transaction, res));
  };
};

/**
 * returns a function which updates the apm of a transaction success.
 * @param transaction the transaction which succeeded
 */
const handleRequestSuccess = (transaction: any) => {
  return () => {
    if (transaction) {
      transaction.result = 'success';
      transaction.end();
    }
  };
};

/**
 * create and returns a handler function that preforms the following steps:
 * - send error to client, while converting all errors that are not ClientError to  a generic 500 error.
 * - send the error to the apm.
 * @param transaction - The failed APM transaction.
 * @param res - Express Response.
 */
const handleRequestError = (transaction: any, res: Response) => {
  return (error: Error) => {

    console.log(error);

    // convert any other error to application error (to hide the real error from the user)
    const err = error instanceof ClientError ? error : new ApplicationError('unknownError');

    // send response
    res.status(err.status).json({
      message: err.message,
      name: err.name,
    });

    // send error to apm
    apm.captureError(error);
    if (transaction) {
      transaction.result = 'error';
      transaction.end();
    }

    return;
  };
};
