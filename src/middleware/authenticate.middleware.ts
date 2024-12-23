import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import configEnv from '../configEnv';
import Error from '../interfaces/error.interface';

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error, Please login again');
  error.status = 401;
  next(error);
};

export const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return handleUnauthorizedError(next);
  }

  const [bearer, token] = authHeader.split(' ');

  if (!token || bearer.toLowerCase() !== 'bearer') {
    return handleUnauthorizedError(next);
  }

  try {
    const decoded = jwt.verify(token, configEnv.BCRYPT as string);
    if (!decoded) {
      return handleUnauthorizedError(next);
    }
    next();
  } catch (error) {
    handleUnauthorizedError(next);
  }
};

export default validateTokenMiddleware;
