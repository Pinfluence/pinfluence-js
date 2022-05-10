require("reflect-metadata")
import { DataSource } from "typeorm";
import { Person } from "./entity/Person";

require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: 5432,
    username: process.env.PGUSER,
    password: process.env.PGPASSOWRD,
    database: process.env.PGDATABASE,
    entities: ["entity/*.ts"],
    migrations: ["db/*.ts"],
    synchronize: (process.env.TYPEORM_SYNC === 'true'),
    logging: true
})
