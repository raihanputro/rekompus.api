import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { IsNotEmpty } from "class-validator"
import { Jurusan } from './Jurusan'

@Entity()
export class Kampus extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    name: String

    @Column()
    description: String

    @Column()
    pictureId?: String

    @Column()
    city: String

    @Column('double')
    rating: number

    @Column()
    akreditasiKampus?: String

    @Column()
    statusPmb?: String

    @Column("simple-array", { nullable: true })
    kelasTersedia?: string[]

    @OneToMany(() => Jurusan, (jurusan) => jurusan.kampus)
    jurusan: Jurusan[]    

    @CreateDateColumn()
    createdAt : String
    
    @UpdateDateColumn()
    updatedAt : String 
}
