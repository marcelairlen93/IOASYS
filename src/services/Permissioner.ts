import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import User from '@models/User';

const Permissioner = (
  roles: string[],
) => async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  // Get the user ID from previous midleware
  const id = res.locals.jwtPayload.userId;

  // Get user role from the database
  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (err) {
    res.status(401).send();
  }

  // Check if array of authorized roles includes the user's role
  if (roles.includes(user.role.name)) {
    next();
  } else res.status(401).send();
};

export default Permissioner;
