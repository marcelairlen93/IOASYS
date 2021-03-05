import {
  Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column,
} from 'typeorm';

import Film from '@models/Film';
import Genre from '@models/Genre';

@Entity({ name: 'film_genre' })
export default class FilmGenre {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Film, (film) => film.id)
    film: Film;

    @ManyToOne(() => Genre, (genre) => genre.id)
    @Column({ name: 'genre_id' })
    genre: Genre;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
