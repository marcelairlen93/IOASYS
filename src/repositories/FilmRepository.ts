import { EntityRepository, getRepository, Repository } from 'typeorm';

import Actor from '@models/Actor';
import Director from '@models/Director';
import Film from '@models/Film';
import FilmActor from '@models/FilmActor';
import FilmDirector from '@models/FilmDirector';
import FilmGenre from '@models/FilmGenre';
import Genre from '@models/Genre';

@EntityRepository(Film)
export default class FilmRepository extends Repository<Film> {
  async findBySearch(search: string): Promise<Film[]> {
    const filmDirectorRepo = getRepository(FilmDirector);
    const filmActorRepo = getRepository(FilmActor);
    const filmGenreRepo = getRepository(FilmGenre);

    const films = await this.find({
      where: [
        {
          title: search,
        },
        {
          directors: [
            {
              director: {
                name: search,
              },
            },
          ],
        },
        {
          actors: [
            {
              actor: {
                name: search,
              },
            },
          ],
        },
        {
          genres: [
            {
              genre: {
                name: search,
              },
            },
          ],
        },
      ],
      relations: [
        'directors',
        'directors.director',
        'actors',
        'actors.actor',
        'genres',
        'genres.genre',
      ],
    });

    return films;
  }

  async findUcByUfvId(ufvId: string): Promise<IFindUcsByUfvId[]> {
    const ucsUfv = await this.find({ where: { ufv: { id: ufvId } } });
    const ucs = ucsUfv
      .filter((ucUfv) => !ucUfv.endDate)
      .map((ucUfv) => ({ ...ucUfv.uc, rate: +ucUfv.rate }));
    return ucs;
  }
}
