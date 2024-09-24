import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import configEnv from '../configEnv';
import User from '../types/user.type';

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: 'success',
      data: { user },
      message: 'User Created Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userModel.getUsers();
    res.json({
      status: 'success',
      data: { users },
      message: 'Users Retrieved Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const findUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userModel.findUser(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: { user },
      message: 'Users Retrieved Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as unknown as string;
    const user: User = {
      id: id,
      ...req.body,
    };
    const updateUser = await userModel.update(user);
    res.json({
      status: 'success',
      data: { updateUser },
      message: 'User Update Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userModel.deleteUser(req.params.id as unknown as string);
    res.json({
      status: 'success',
      message: 'User Delete Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const token = jwt.sign(
      { user },
      configEnv.TOKEN_SECRET as unknown as string,
    );

    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'Username or password do not match',
      });
    }
    res.json({
      status: 'success',
      data: { ...user, token },
      message: 'Login successfully',
    });
  } catch (error) {
    next(error);
  }
};
