import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/product.model';

const productModel = new ProductModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await productModel.create(req.body);
    res.json({
      status: 'success',
      data: { product },
      message: 'Product Created Successfully',
    });
  } catch (error) {
    next(error);
  }
};
