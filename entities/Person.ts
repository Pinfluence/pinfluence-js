import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Influence } from "./Influence"

@Entity()
export class Person {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    name: string;

    @OneToMany(() => Influence, (influence) => influence.person)
    influences: Influence[]

}