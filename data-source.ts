require("reflect-metadata")
import { DataSource } from "typeorm";
import { Person } from "./entity/Person";

require('dotenv').config()

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGPASSWORD,
    port: 5000,
    username: process.env.PGUSER,
    password: process.env.PGPASSOWRD,
    database: process.env.PGDATABASE,
    entities: [Person],
    synchronize: true,
    logging: false,
})

module.exports = { AppDataSource }

