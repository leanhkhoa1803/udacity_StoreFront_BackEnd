import { Router } from 'express';
import userRouter from './api/users.routes';
import productsRouter from './api/products.routes';
const routes = Router();

routes.use('/users', userRouter);
routes.use('/products', productsRouter);

export default routes;
