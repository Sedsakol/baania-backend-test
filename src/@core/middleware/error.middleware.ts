import { NextFunction, Request, Response } from 'express';
 
function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const name = error.name;
  response
    .status(status)
    .send({
      status,
      message,
      name,
      reason: error.reason as any
    })
}
 
export default errorMiddleware;