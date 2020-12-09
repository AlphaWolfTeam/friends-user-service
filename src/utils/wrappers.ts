import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from './errors/application.error';

export const wrapAsync = (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error) => {
      // TODO: log error
      console.log(error);
      // convert any other error to application error (to hide the real error from the user)
      const err = error instanceof ApplicationError ? error : new ApplicationError('unknownError');
      // send response
      return res.status(err.status).json({
        message: err.message,
        name: err.name,
      });
    });
  };
};
