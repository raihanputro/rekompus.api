import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty } from "class-validator"
import { Jurusan } from "./Jurusan"

@Entity()
export class JurusanKelas extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @IsNotEmpty()
    name: String

    @Column('int')
    @IsNotEmpty()
    biayaSPP: number

    @ManyToOne(() => Jurusan, (jurusan) => jurusan.kelas, {onDelete: 'CASCADE'})
    jurusan: Jurusan

    @CreateDateColumn()
    createdAt : String
    
    @UpdateDateColumn()
    updatedAt : String 
}
