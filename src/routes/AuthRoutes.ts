import { Router } from 'express';

import AuthController from '@controllers/AuthController';
import Authenticator from '@services/Authenticator';

const routes = Router();
// Login route
routes.route('/login').post(
  AuthController.login,
);

// Change my password
routes.route('/change-password').post(
  Authenticator,
  AuthController.changePassword,
);

export default routes;
