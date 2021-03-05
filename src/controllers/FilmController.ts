import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import Actor from '@models/Actor';
import Director from '@models/Director';
import Film from '@models/Film';
import FilmActor from '@models/FilmActor';
import FilmDirector from '@models/FilmDirector';
import FilmGenre from '@models/FilmGenre';
import Genre from '@models/Genre';
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
  res.send(films);
};

static getOneById = async (req: Request, res: Response):Promise<any> => {
  // Get the ID from the url
  const { id } = req.params;

  // Get the film from database
  const filmRepository = getRepository(Film);
  try {
    const film = await filmRepository.findOneOrFail(id);

    res.send(film);
  } catch (error) {
    res.status(404).send('film not found');
  }
};

static create = async (req: Request, res: Response): Promise<any> => {
  // Get parameters from the body
  const {
    title, actors, directors, genres, synopsis,
  }: Film = req.body;

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

  const actorArr = actors.map((actor: Actor) => {
    const newActor = new Actor();
    newActor.name = actor.name;

    return newActor;
  });
  film.title = title;
  film.synopsis = synopsis;

  film.actors = actors;
  film.directors = directors;
  film.genres = genres;

  // Validade if the parameters are ok
  const errors = await validate(film);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  try {
    await filmRepository.save(film);
  } catch (e) {
    res.status(409).send('film already exists');
    return;
  }

  // If all ok, send 201 response
  res.status(201).send('film created');
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
