import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from './entity/User'
import { Jurusan } from './entity/Jurusan'
import { JurusanKelas } from './entity/JurusanKelas'
import { Kampus } from './entity/Kampus'
import { Review } from './entity/Review'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "adminZ",
    database: "rekompus",
    synchronize: false,
    logging: false,
    entities: [User, Jurusan, Kampus, JurusanKelas, Review],
    migrations: [],
    subscribers: []
})
