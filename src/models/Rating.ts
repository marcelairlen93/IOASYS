import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Film from '@models/Film';
import User from '@models/User';

@Entity({ name: 'rating' })
export default class Rating {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Film, (film) => film.ratings)
    film: Film;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
