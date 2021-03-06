import { Length, IsNotEmpty } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'actor' })
export default class Actor {
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
