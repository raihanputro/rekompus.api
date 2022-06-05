import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from './entity/User'
import { Jurusan } from './entity/Jurusan'
import { Kampus } from './entity/Kampus'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "adminZ",
    database: "rekompus",
    synchronize: true,
    logging: false,
    entities: [User, Jurusan, Kampus],
    migrations: [],
    subscribers: []
})
