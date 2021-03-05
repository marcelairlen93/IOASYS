import {
  Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column,
} from 'typeorm';

import Actor from '@models/Actor';
import Film from '@models/Film';

@Entity({ name: 'film_actor' })
export default class FilmActor {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Film, (film) => film.id)
    film: Film;

    @ManyToOne(() => Actor, (actor) => actor.id)
    @Column({ name: 'actor_id' })
    actor: Actor;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
