import express from "express";
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source"
import { Person } from "../entity/Person";

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const router = express.Router()

router.post("/", async function (req: Request, res: Response) {
  let person = req.body.name
  console.log("person", person)
  if(person === "" || person === undefined || typeof person !== "string"){
    res.sendStatus(400)
  } else {
    const personRepository = AppDataSource.getRepository(Person)
    .create(req.body)
    const results = await AppDataSource.getRepository(Person).save(personRepository)
      return res.send(results)
  }
    
})

module.exports = router

