import express from "express";
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source"
import { Person } from "../entity/Person";

const router = express.Router()

router.post("/", async function (req: Request, res: Response) {
  let person = req.body.name
  
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

