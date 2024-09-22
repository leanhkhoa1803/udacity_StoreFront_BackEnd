import { Request, Response, Router } from 'express';
import * as controller from '../../controllers/users.controller';
import authenticationMiddleware from '../../middleware/authenticate.middleware';
const routes = Router();

routes
  .route('/')
  .get(authenticationMiddleware, controller.getUsers)
  .post(controller.create);
routes
  .route('/:id')
  .get(authenticationMiddleware, controller.findUser)
  .patch(authenticationMiddleware, controller.update)
  .delete(authenticationMiddleware, controller.deleteUser);

routes.route('/authenticate').post(controller.authenticate);

export default routes;
