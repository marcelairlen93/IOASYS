import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getConnection, getCustomRepository, getRepository } from 'typeorm';

import Actor from '@models/Actor';
import Director from '@models/Director';
import Film from '@models/Film';
import FilmActor from '@models/FilmActor';
import FilmDirector from '@models/FilmDirector';
import FilmGenre from '@models/FilmGenre';
import Genre from '@models/Genre';
import Rating from '@models/Rating';
import FilmRepository from '@repositories/FilmRepository';

class FilmController {
static list = async (req: Request, res: Response):Promise<any> => {
  let { search } = req.query;

  // Get films from database
  const filmRepository = getCustomRepository(FilmRepository);

  let films: Film[];
  if (req.query && search) {
    search = (search as string);
    films = await filmRepository.findBySearch(search);
  } else {
    films = await filmRepository.find();
  }

  // Send the films object
  return res.send(films);
};

static getOneById = async (req: Request, res: Response):Promise<any> => {
  // Get the ID from the url
  const { id } = req.params;

  // Get the film from database
  const filmRepository = getRepository(Film);

  try {
    const film = await filmRepository.findOneOrFail(id);

    // Get the ratings
    const ratingRepo = getRepository(Rating);
    const ratings = await ratingRepo.find({
      where: {
        film: id,
      },
      select: ['rating'],
    });

    let avgRatings = 0;
    if (ratings.length) {
      avgRatings = (ratings.reduce((acc, el) => acc + (+el.rating), 0) / ratings.length);
    }

    res.status(200).send({
      ...film,
      ratings: avgRatings,
    });
  } catch (error) {
    res.status(404).send('film not found');
  }
};

static create = async (req: Request, res: Response): Promise<Response> => {
  // Get parameters from the body
  const {
    title, actors, directors, genres, synopsis,
  } = req.body;

  const filmRepository = getRepository(Film);
  const actorRepository = getRepository(Actor);
  const directorRepository = getRepository(Director);
  const genreRepository = getRepository(Genre);
  const filmActorRepository = getRepository(FilmActor);
  const filmGenreRepository = getRepository(FilmGenre);
  const filmDirectorRepository = getRepository(FilmDirector);

  const filmAlreadyExists = await filmRepository.findOne({ title });

  if (filmAlreadyExists) {
    res.status(409).send('film already exists');
  }

  const film = new Film();

  film.title = title;
  film.synopsis = synopsis;

  const actorsArr = actors.map((actor: Actor) => {
    const newActor = new Actor();
    newActor.name = actor.name;

    return newActor;
  });

  const directorsArr = directors.map((director: Director) => {
    const newDirector = new Director();
    newDirector.name = director.name;

    return newDirector;
  });

  const genresArr = genres.map((genre: Genre) => {
    const newGenre = new Genre();
    newGenre.name = genre.name;

    return newGenre;
  });

  // Starting transactions
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const directorsPromises = directorsArr.map(async (newDirector: Director) => {
      // Validade if the parameters are ok
      const errors = await validate(newDirector);
      if (errors.length > 0) {
        return res.status(400).send(errors);
      }

      const directorExists = await directorRepository.findOne({ name: newDirector.name });

      if (!directorExists) {
        return queryRunner.manager.save(Director, newDirector);
      }
      return directorExists;
    });

    const actorsPromises = actorsArr.map(async (newActor: Actor) => {
      // Validade if the parameters are ok
      const errors = await validate(newActor);
      if (errors.length > 0) {
        return res.status(400).send(errors);
      }

      const actorExists = await actorRepository.findOne({ name: newActor.name });

      if (!actorExists) {
        return queryRunner.manager.save(Director, newActor);
      }
      return actorExists;
    });

    const genresPromises = genresArr.map(async (newGenre: Genre) => {
      // Validade if the parameters are ok
      const errors = await validate(newGenre);
      if (errors.length > 0) {
        return res.status(400).send(errors);
      }

      const genreExists = await genreRepository.findOne({ name: newGenre.name });

      if (!genreExists) {
        return queryRunner.manager.save(Director, newGenre);
      }
      return genreExists;
    });

    const newDirectors = await Promise.all(directorsPromises);
    const newActors = await Promise.all(actorsPromises);
    const newGenres = await Promise.all(genresPromises);

    const newFilmDirectors = [];
    const newFilmActors = [];
    const newFilmGenres = [];

    for (const newFilmDirector of newFilmDirectors) {
      const item = await queryRunner.manager.save(FilmDirector, newFilmDirector);
    }

    // TODO CREATE ACTORS IF THEY DON'T EXISTS
    // TODO CREATE GENRES IF THEY DON'T EXISTS
    // TODO CREATE RELATION ENTITY BETWEEN ACTORS AND FILMS
    // TODO CREATE RELATION ENTITY BETWEEN DIRECTORS AND FILMS
    // TODO CREATE RELATION ENTITY BETWEEN GENRES AND FILMS
    // TODO UPDATE FILM OBJECT TO REFLECT NEW DATA RELATIONS

    // Validade if the parameters are ok
    const errors = await validate(film);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    // Finishing transaction
    await queryRunner.commitTransaction();
    return res.status(200).json({
      success: true,
      data: film,
      message: null,
    });
  } catch (error) {
    console.log(error);
    // Undo everything inside transaction
    await queryRunner.rollbackTransaction();

    return response.status(500).json({
      success: false,
      message: error.message || 'Erro inesperado',
      data: null,
    });
  } finally {
    // Releasing transaction
    await queryRunner.release();
  }
};

static update = async (req: Request, res: Response): Promise<any> => {
  // Get the ID from the url
  const { id } = req.params;

  // Get values from the body
  const { email, role, enabled } = req.body;

  // Try to find film on database
  const filmRepository = getRepository(Film);
  let film;
  try {
    film = await filmRepository.findOneOrFail(id);
  } catch (error) {
    // If not found, send a 404 response
    res.status(404).send('film not found');
    return;
  }

  // Validate the new values on model
  film.email = email;
  film.role = role;
  film.enabled = enabled;
  const errors = await validate(film);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  // Try to save, if fails, that means email already in use
  try {
    await filmRepository.save(film);
  } catch (error) {
    res.status(409).send('email already in use');
    return;
  }
  // After all send a 204 (no content, but accepted) response
  res.status(204).send();
};

static delete = async (req: Request, res: Response): Promise<Response> => {
  // Get the ID from the url
  const { id } = req.params;

  const filmRepository = getRepository(Film);
  let film: Film;
  try {
    film = await filmRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send('film not found');
    return;
  }

  // Validate the new values on model
  film.enabled = false;
  const errors = await validate(film);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  try {
    await filmRepository.save(film);
  } catch (error) {
    res.status(409).send("film couldn't be deleted");
    return;
  }

  // After all send a 204 (no content, but accepted) response
  res.status(204).send();
};
}

export default FilmController;
