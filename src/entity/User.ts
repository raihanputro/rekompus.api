import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    name: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt : String
    
    @UpdateDateColumn()
    updatedAt : String    
}
