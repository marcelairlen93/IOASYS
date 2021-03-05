import { IsNotEmpty, Length } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';

import FilmActor from '@models/FilmActor';
import FilmDirector from '@models/FilmDirector';
import FilmGenre from '@models/FilmGenre';
import Rating from '@models/Rating';

@Entity({ name: 'film' })
export default class Film {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Length(4, 20)
    @IsNotEmpty()
    title: string;

    @Column()
    @Length(4, 20)
    @IsNotEmpty()
    synopsis: string;

    @Column({ name: 'is_enabled' })
    enabled: boolean;

    @OneToMany(() => Rating, (rating) => rating.film, {
      eager: true,
    })
    ratings: Rating[];

    @OneToMany(() => FilmDirector, (directors) => directors.director, {
      eager: true,
    })
    directors: FilmDirector[];

    @OneToMany(() => FilmActor, (actors) => actors.actor, {
      eager: true,
    })
    actors: FilmActor[];

    @OneToMany(() => FilmGenre, (genres) => genres.genre, {
      eager: true,
    })
    genres: FilmGenre[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
