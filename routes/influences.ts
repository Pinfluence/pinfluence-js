import express from "express";
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source"
import { Influence } from "../entities/Influence";
import { isAfter, parseISO } from "date-fns";

const router = express.Router()

router.post("/influences", async function (req: Request, res: Response) {
  let { start_date, address, person } = req.body

  const influenceRepository = AppDataSource.getRepository(Influence)
  let influences = await influenceRepository.find({
      relations: {
        person: true,
      },
        where: {
          person: person
        }    
    })

    let lastInsertedDates = []
    for (let i = 0; i < influences.length; i++){
      let personId = influences[i].person.id
      if(personId === person) {
        lastInsertedDates.push(influences[i].start_date)
      }
    }

    let dateToCompare;
    let startDate = parseISO(start_date)

    for(let i = 0; i < lastInsertedDates.length; i++){
      let compareDate = parseISO(lastInsertedDates[i])
      
      if (compareDate !== startDate){
        let dateResult = isAfter((startDate), (compareDate))
        if(dateResult === true){
        dateToCompare = dateResult
        }
      }
    }
    
  if(lastInsertedDates === start_date || dateToCompare === true){
    res.sendStatus(400)
  } else if(address === "" || address === undefined){
      res.sendStatus(400)
  } else {
    const influenceRepository = AppDataSource.getRepository(Influence)
    .create(req.body)
    const results = await AppDataSource.getRepository(Influence).save(influenceRepository)
      return res.send(results)
  }
})

module.exports = router