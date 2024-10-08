import { Router } from 'express';
import * as controller from '../../controllers/products.controller';
import authenticationMiddleware from '../../middleware/authenticate.middleware';

const routes = Router();

routes
  .route('/')
  .get(authenticationMiddleware, controller.getProducts)
  .post(authenticationMiddleware, controller.create);

routes
  .route('/:id')
  .get(authenticationMiddleware, controller.getProduct)
  .patch(authenticationMiddleware, controller.update)
  .delete(authenticationMiddleware, controller.deleteProduct);

export default routes;
