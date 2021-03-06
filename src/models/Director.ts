import { IsNotEmpty, Length } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'director' })
export default class Director {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Length(4, 20)
    @IsNotEmpty()
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
