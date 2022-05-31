require("reflect-metadata")
import { DataSource } from "typeorm";

require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: 5432,
    username: process.env.PGUSER,
    password: process.env.PGPASSOWRD,
    database: process.env.PGDATABASE,
    entities: ["entities/*.ts"],
    migrations: ["db/*.ts"],
    synchronize: (process.env.TYPEORM_SYNC === 'true'),
    logging: true
})
