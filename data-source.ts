require("reflect-metadata")
import { DataSource, DataSourceOptions } from "typeorm";

require('dotenv').config()

let DBConfig : DataSourceOptions;

if (process.env.NODE_ENV === "test") {
    DBConfig = {
        type: "postgres",
        host: process.env.PGHOST,
        port: 5432,
        username: process.env.PGUSER,
        password: process.env.PGPASSOWRD,
        database: "pinfluence_test",
        entities: ["entity/*.ts"],
        migrations: ["db/*.ts"],
        synchronize: true,
        migrationsRun: true,
        dropSchema: true,
        logging: false
    }
} else {
    DBConfig = {
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
    }
}

export const AppDataSource = new DataSource(DBConfig);