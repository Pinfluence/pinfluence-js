import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from "./Person";

@Entity()
export class Influence {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'date'})
  start_date: string ;

  @Column({type: 'date'})
  end_date?: string;

  @Column()
  adress: string[];

  @Column()
  person_id: string;

  @ManyToOne(() => Person, (person) => person.influences)
  person: Person

}