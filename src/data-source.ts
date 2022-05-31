import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "adminZ",
    database: "rekompus",
    synchronize: true,
    logging: false,
    entities: ["./entity/**/*.ts" ], 
    migrations: [ "./migration/**/*.ts"],
    subscribers: [],
})
