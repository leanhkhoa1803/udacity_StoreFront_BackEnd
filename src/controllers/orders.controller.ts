import { NextFunction, Request, Response } from 'express';
import OrderModel from '../models/orders.model';
import Order from '../types/orders.type';

const orderProduct = new OrderModel();

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = await orderProduct.getOrder(
      req.params.id as unknown as string,
    );
    res.json({
      status: 'success',
      data: { order },
      message: 'Order Retrieved Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await orderProduct.getOrders();
    res.json({
      status: 'success',
      data: { orders },
      message: 'Orders Retrieved Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = await orderProduct.create(req.body);
    res.json({
      status: 'success',
      data: { order },
      message: 'Order Created Successfully',
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
    const order: Order = {
      id: id,
      ...req.body,
    };
    const updateOrder = await orderProduct.update(order);
    res.json({
      status: 'success',
      data: { updateOrder },
      message: 'Order Update Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = await orderProduct.deleteOrder(
      req.params.id as unknown as string,
    );
    res.json({
      status: 'success',
      message: 'Order Delete Successfully',
    });
  } catch (error) {
    next(error);
  }
};
