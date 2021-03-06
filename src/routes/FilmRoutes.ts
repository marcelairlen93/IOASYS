import { Router } from 'express';

import FilmController from '@controllers/FilmController';
import Authenticator from '@services/Authenticator';
import Permissioner from '@services/Permissioner';

const router = Router();

// Get all films
router.route('/').get(
  FilmController.list,
);

// Get one film
router.route('/:id').get(
  FilmController.getOneById,
);

// Create a new film
router.route('/').post(
  Authenticator,
  Permissioner(['ADMIN']),
  FilmController.create,
);

// Edit one film
router.route('/:id').patch(
  Authenticator,
  Permissioner(['ADMIN']),
  FilmController.update,
);

// Delete one film
router.route('/:id').delete(
  Authenticator,
  Permissioner(['ADMIN']),
  FilmController.delete,
);

export default router;
