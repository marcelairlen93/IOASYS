import Actor from '@models/Actor';
import Director from '@models/Director';
import Genre from '@models/Genre';

import IActor from './IActor';
import IDirector from './IDirector';
import IGenre from './IGenre';

interface IFilm {
  title: string;
  synopsys: string;
  directors: Director[],
  actors: Actor[],
  genres: Genre[],
}

export default IFilm;
