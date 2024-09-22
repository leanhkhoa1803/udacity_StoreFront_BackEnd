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
  try {
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];

      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, configEnv.BCRYPT as unknown as string);
        if (decode) {
          next();
        } else {
          handleUnauthorizedError(next);
        }
      } else {
        handleUnauthorizedError(next);
      }
    } else {
      handleUnauthorizedError(next);
    }
  } catch (error) {
    handleUnauthorizedError(next);
  }
};

export default validateTokenMiddleware;
