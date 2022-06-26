import { Entity,
         PrimaryGeneratedColumn,
         Column,
         ManyToOne,
         CreateDateColumn,
         UpdateDateColumn,
         Tree,
         TreeChildren,
         TreeParent,
         BaseEntity
       } from "typeorm"
import { IsNotEmpty } from "class-validator"
import { Kampus } from "./Kampus"
import { User } from "./User"

@Entity()
@Tree("nested-set")
export class Review extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    comment: String

    @ManyToOne(() => Kampus, (kampus) => kampus.review, { onDelete: 'CASCADE' })
    kampus: Kampus

    @ManyToOne(() => User, (user) => user.review)
    user: User

    @CreateDateColumn()
    createdAt : String
    
    @UpdateDateColumn()
    updatedAt : String

    @TreeChildren()
    children: Review[]

    @TreeParent()
    parent: Review    
}
