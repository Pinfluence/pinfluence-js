import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from "./Person";
import {
  IsDate,
  IsEmpty
} from "class-validator";

@Entity()
export class Influence {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'date'})
  @IsDate()
  start_date: Date;

  @Column({type: 'date'})
  @IsDate()
  end_date?: Date;

  @Column()
  @IsEmpty()
  address: string;

  @ManyToOne(() => Person, (person) => person.influences)
  @JoinColumn()
  person: Person

}