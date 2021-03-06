import { Router } from 'express';

import UserController from '@controllers/UserController';
import Authenticator from '@services/Authenticator';
import Permissioner from '@services/Permissioner';

const router = Router();

// Get all users
router.route('/').get(
  Authenticator,
  Permissioner(['ADMIN']),
  UserController.list,
);

// Get one user
router.route('/:id').get(
  Authenticator,
  Permissioner(['ADMIN']),
  UserController.getOneById,
);

// Create a new user
router.route('/').post(
  UserController.create,
);

// Edit one user
router.route('/:id').patch(
  Authenticator,
  Permissioner(['USER', 'ADMIN']),
  UserController.update,
);

// Delete one user
router.route('/:id').delete(
  Authenticator,
  Permissioner(['USER', 'ADMIN']),
  UserController.delete,
);

export default router;
