import express, { Express } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from "./data-source"
dotenv.config();

const app: Express = express();

app.use(express.json());

const personRouter = require("./routes/persons");
const influencesRouter = require("./routes/influences");

app.use("/persons", personRouter)
app.use("/influences", influencesRouter)

if (process.env.NODE_ENV !== "test") {
  AppDataSource
      .initialize()
      .then(() => {
          console.log("Data Source has been initialized!")
      })
      .catch((err) => {
          console.error("Error during Data Source initialization:", err)
      })

  const port = '3000'

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

module.exports = app