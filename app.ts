import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

app.use(express.json());

const personRouter = require("./routes/persons");
app.use("/persons", personRouter)

if (process.env.NODE_ENV !== "test") {
  const port = '3000'

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

module.exports = app