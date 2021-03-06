import {
  Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column,
} from 'typeorm';

import Director from '@models/Director';
import Film from '@models/Film';

@Entity({ name: 'film_director' })
export default class FilmDirector {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Film, (film) => film.id)
    film: Film;

    @ManyToOne(() => Director, (director) => director.id, {
      eager: true,
    })
    @Column({ name: 'director_id' })
    director: Director;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
