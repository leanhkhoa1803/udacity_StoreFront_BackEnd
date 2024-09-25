import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/product.model';
import Product from '../types/products.type';

const productModel = new ProductModel();

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await productModel.getProduct(
      req.params.id as unknown as string,
    );
    res.json({
      status: 'success',
      data: { product },
      message: 'Products Retrieved Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await productModel.getProducts();
    res.json({
      status: 'success',
      data: { products },
      message: 'Products Retrieved Successfully',
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

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as unknown as string;
    const product: Product = {
      id: id,
      ...req.body,
    };
    const updateProduct = await productModel.update(product);
    res.json({
      status: 'success',
      data: { updateProduct },
      message: 'Product Update Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await productModel.deleteProduct(
      req.params.id as unknown as string,
    );
    res.json({
      status: 'success',
      message: 'Product Delete Successfully',
    });
  } catch (error) {
    next(error);
  }
};
