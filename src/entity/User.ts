import { Index,
         Entity,
         PrimaryGeneratedColumn,
         Column,
         BaseEntity,
         CreateDateColumn,
         UpdateDateColumn,
         BeforeInsert,
         ManyToMany,
         JoinTable, 
         OneToMany
       } from "typeorm"
import { Length, IsNotEmpty, IsEmail } from "class-validator"
import bcrypt from 'bcryptjs'
import { Kampus } from "./Kampus"
import { Review } from "./Review"

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

    @Column({ nullable: true, default: 'USER' })
    role: String
    
    @ManyToMany(() => Kampus)
    @JoinTable()
    kampus: Kampus[]

    @OneToMany(() => Review, (review) => review.user)
    review: Review[]

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
