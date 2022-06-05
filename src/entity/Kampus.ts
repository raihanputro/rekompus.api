import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { IsNotEmpty } from "class-validator"
import { Jurusan } from './Jurusan'

@Entity()
export class Kampus extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @IsNotEmpty()
    name: String

    @Column()
    description: String

    @Column({ nullable: true })
    pictureId: String

    @Column()
    city: String

    @Column()
    alamat: String

    @Column({ nullable: true })
    telepon: String

    @Column({ nullable: true })
    email: String

    @Column({ nullable: true })
    tahunBerdiri: String

    @Column({ nullable: true })
    linkPendaftaran: String

    @Column()
    jenisKampus: String

    @Column()
    akreditasiKampus: String

    @Column({ nullable: true })
    statusPmb: String

    @Column("simple-array", { nullable: true })
    kelasTersedia: string[]

    @Column()
    linkFb: String

    @Column()
    linkIg: String

    @Column()
    linkTwitter: String

    @OneToMany(() => Jurusan, (jurusan) => jurusan.kampus, { cascade: true })
    jurusan: Jurusan[]    

    @CreateDateColumn()
    createdAt : String
    
    @UpdateDateColumn()
    updatedAt : String 
}
