import { Router } from 'express';
import * as controller from '../../controllers/orders.controller';
import authenticationMiddleware from '../../middleware/authenticate.middleware';

const routes = Router();

routes
  .route('/')
  .get(authenticationMiddleware, controller.getOrders)
  .post(authenticationMiddleware, controller.create);

routes
  .route('/:id')
  .get(authenticationMiddleware, controller.getOrder)
  .patch(authenticationMiddleware, controller.update)
  .delete(authenticationMiddleware, controller.deleteOrder);

export default routes;
