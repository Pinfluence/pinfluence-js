import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Person {

    @PrimaryColumn()
    id!: number;
    
    @Column()
    name!: string;

}