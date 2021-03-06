import { Router } from 'express';

import RatingController from '@controllers/RatingController';
import Authenticator from '@services/Authenticator';
import Permissioner from '@services/Permissioner';

const router = Router();

// Create a new rating
router.route('/').post(
  Authenticator,
  Permissioner(['USER']),
  RatingController.create,
);

export default router;
