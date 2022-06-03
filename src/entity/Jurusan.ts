import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty } from "class-validator"
import { Kampus } from "./Kampus"

@Entity()
export class Jurusan extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    namaJurusan: String

    @Column()
    @IsNotEmpty()
    jenjang: String

    @Column('int')
    @IsNotEmpty()
    biayaSPP: number

    @Column()
    @IsNotEmpty()
    akreditasi: String

    @ManyToOne(() => Kampus, (kampus) => kampus.jurusan)
    kampus: Kampus

    @CreateDateColumn()
    createdAt : String
    
    @UpdateDateColumn()
    updatedAt : String 
}
