import { Router } from 'express';
import * as controller from '../../controllers/products.controller';
import authenticationMiddleware from '../../middleware/authenticate.middleware';

const routes = Router();

routes.route('/').post(authenticationMiddleware, controller.create);

export default routes;
