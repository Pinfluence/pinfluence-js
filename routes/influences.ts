import express from "express";
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source"
import { Influence } from "../entities/Influence";
import { isAfter, parseISO } from "date-fns";
import {validate} from "class-validator";

const router = express.Router()

router.post("/", async function (req: Request, res: Response) {
  let { start_date, end_date, address, person_id } = req.body

  const influenceRepository = AppDataSource.getRepository(Influence)
  const influence = influenceRepository.create({
    start_date: start_date, 
    end_date: end_date,
    address: address,
    person: {id: person_id}
  })

  const influences = await influenceRepository.find({
    relations: {
      person: true,
    }, 
    where: {
      person: {id: person_id}
    }
  })


  let lastInsertedDates = [];

  for (let i = 0; i < influences.length; i++){
    if(influences[i].person.id === person_id){
      lastInsertedDates.push(influences[i].start_date)
    }
  }

  for(let i = 0; i < lastInsertedDates.length; i++){
    let dateResult = isAfter((start_date), (lastInsertedDates[i]))
    if(dateResult === true || lastInsertedDates[i] === start_date) {
      if (address === "" || address === undefined) {
        res.sendStatus(400)
      }
    }
  }
  
  const errors = await validate(influence);
  if (errors.length > 0) {
    res.sendStatus(400); 
  } else {
    await AppDataSource.getRepository(Influence).save(influence)
    return res.send(influence)
  }
})

module.exports = router

function sendStatus(arg0: number) {
  throw new Error("Function not implemented.");
}
