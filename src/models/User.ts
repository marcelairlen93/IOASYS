import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

import Role from '@models/Role';

@Entity({ name: 'user' })
export default class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Length(4, 20)
    @IsNotEmpty()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(8, 20)
    @IsNotEmpty()
    password: string;

    @OneToOne(() => Role)
    @JoinColumn()
    role: Role;

    @Column({ name: 'is_enabled' })
    enabled: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    hashPassword():void {
      this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string):boolean {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
