import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import CustomError from '../errors/CustomError';

const errorHandler = (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    const { status, message } = err as CustomError;
    return res.status(status).json({ message });
  }

  if (err instanceof ZodError) { 
    return res.status(400).json({ message: err.issues });
  }

  console.error(err);
  return res.status(500).json({ message: err.message });
};

export default errorHandler;