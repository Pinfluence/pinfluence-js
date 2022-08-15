import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, AfterLoad } from 'typeorm';
import { Person } from "./Person";
import {
  IsNotEmpty,
  IsDate
} from "class-validator";

@Entity()
export class Influence {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'timestamptz'})
  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @Column({type: 'timestamptz'})
  @IsDate()
  end_date: Date;

  @Column()
  @IsNotEmpty()
  address: string;

  @ManyToOne(() => Person, (person) => person.influences)
  @JoinColumn()
  person: Person

}