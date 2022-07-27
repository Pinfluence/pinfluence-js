import express from "express";
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source"
import { Person } from "../entities/Person";

const router = express.Router()

router.post("/", async function (req: Request, res: Response) {
  let { name, id } = req.body
  let person = req.body.name
  
  if(person === "" || person === undefined || typeof person !== "string"){
    res.sendStatus(400)
  } else {
    const personRepository = AppDataSource.getRepository(Person)
    .create({
      id: id,
      name: name
    })
    const results = await AppDataSource.getRepository(Person).save(personRepository)
      return res.send(results)
  }
    
})

module.exports = router

