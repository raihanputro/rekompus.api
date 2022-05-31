import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Length, IsNotEmpty } from "class-validator"
import bcrypt from 'bcryptjs'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Length(4, 25)
    @IsNotEmpty()
    username: string

    @Column()
    @Length(3, 100)
    @IsNotEmpty()
    name: string

    @Column()
    @IsNotEmpty()
    password: string

    @CreateDateColumn()
    createdAt : String
    
    @UpdateDateColumn()
    updatedAt : String 
    
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfPasswordMatch(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
