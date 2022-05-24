import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    name: string;

}