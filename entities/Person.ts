import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Influence } from "./Influence"
import { Length } from "class-validator";

@Entity()
export class Person {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    @Length(1, 100)
    name: string;

    @OneToMany(() => Influence, (influence) => influence.person)
    influences: Influence[]

}