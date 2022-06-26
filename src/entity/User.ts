import { Index, Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToMany, JoinTable } from "typeorm"
import { Length, IsNotEmpty, IsEmail } from "class-validator"
import bcrypt from 'bcryptjs'
import { Kampus } from "./Kampus"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

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

    @Column({ nullable: true })
    role: String
    
    @ManyToMany(() => Kampus)
    @JoinTable()
    kampus: Kampus[]

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
