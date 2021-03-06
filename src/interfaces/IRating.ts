import Film from '@models/Film';
import User from '@models/User';

interface IRating {
  user: User,
  film: Film,
  rating: ['0', '1', '2', '3', '4'],
}

export default IRating;
