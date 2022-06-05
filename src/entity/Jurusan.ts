import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { IsNotEmpty } from "class-validator"
import { Kampus } from "./Kampus"
import { JurusanKelas } from "./JurusanKelas"

@Entity()
export class Jurusan extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @IsNotEmpty()
    namaJurusan: String

    @Column()
    @IsNotEmpty()
    jenjang: String

    @Column()
    @IsNotEmpty()
    akreditasi: String

    @Column("text", { nullable: true })
    mataKuliah: String

    @Column("text", { nullable: true })
    prospekKarir: String

    @OneToMany(() => JurusanKelas, (kelas) => kelas.jurusan, { cascade: true })
    kelas: JurusanKelas[]

    @ManyToOne(() => Kampus, (kampus) => kampus.jurusan)
    kampus: Kampus

    @CreateDateColumn()
    createdAt : String
    
    @UpdateDateColumn()
    updatedAt : String 
}
