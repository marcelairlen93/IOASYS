import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Film from '@models/Film';
import Rating from '@models/Rating';
import User from '@models/User';

class RatingController {
  static create = async (req: Request, res: Response): Promise<any> => {
    const { filmId, rating } = req.body;

    const { userId } = res.locals.jwtPayload;

    const userRepo = getRepository(User);

    const user = await userRepo.findOne({ id: userId });

    const filmRepo = getRepository(Film);

    let film: Film;
    try {
      film = await filmRepo.findOneOrFail({ id: filmId });
    } catch (err) {
      console.log(err);
      return res.status(404).send('film not found');
    }

    const newRating = new Rating();
    newRating.film = film;
    newRating.rating = rating;
    newRating.user = user;

    // Validade if the parameters are ok
    const errors = await validate(newRating);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    // Try to save. If fails, the email is already in use
    const ratingRepo = getRepository(Rating);
    try {
      await ratingRepo.save(user);
    } catch (e) {
      return res.status(500).send('an error ocurred while trying to save your comment');
    }

    // If all ok, send 201 response
    res.status(201).send('Rating created');
  };
}

export default RatingController;
