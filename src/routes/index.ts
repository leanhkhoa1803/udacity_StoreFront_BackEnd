import { Router } from 'express';
import userRouter from './api/users.routes';
import productsRouter from './api/products.routes';
import ordersRouter from './api/orders.routes';
const routes = Router();

routes.use('/users', userRouter);
routes.use('/products', productsRouter);
routes.use('/orders', ordersRouter);

export default routes;
