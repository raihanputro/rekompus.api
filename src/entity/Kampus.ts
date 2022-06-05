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

    @Column({ nullable: true })
    description: String

    @Column({ nullable: true })
    pictureId?: String

    @Column()
    city: String

    @Column('double')
    rating: number

    @Column()
    akreditasiKampus?: String

    @Column({ nullable: true })
    statusPmb?: String

    @Column("simple-array", { nullable: true })
    kelasTersedia?: string[]

    @OneToMany(() => Jurusan, (jurusan) => jurusan.kampus, { cascade: true })
    jurusan: Jurusan[]    

    @CreateDateColumn()
    createdAt : String
    
    @UpdateDateColumn()
    updatedAt : String 
}
