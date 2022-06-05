import { Index, Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm"
import { Length, IsNotEmpty, IsEmail } from "class-validator"
import bcrypt from 'bcryptjs'

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsEmail()
    @Index({ unique: true })
    @IsNotEmpty()
    email: string

    @Column()
    @Length(3, 100)
    @IsNotEmpty()
    name: String

    @Column()
    @IsNotEmpty()
    password: String

    @CreateDateColumn()
    createdAt : String
    
    @UpdateDateColumn()
    updatedAt : String 
    
    checkIfPasswordMatch(password: string) {
      return bcrypt.compareSync(password, this.password);
    }

    @BeforeInsert()
    async setPassword(password: string) {
      const salt = await bcrypt.genSalt()
      this.password = await bcrypt.hash(password || this.password, salt)
    }
}
