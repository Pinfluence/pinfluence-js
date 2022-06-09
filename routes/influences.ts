import express from "express";
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source"
import { Influence } from "../entities/Influence";
import { isAfter, parseISO } from "date-fns";

const router = express.Router()

router.post("/", async function (req: Request, res: Response) {
  let { start_date, end_date, address, person_id } = req.body
  console.log("req body", req.body)

  const influenceRepository = AppDataSource.getRepository(Influence)
  let influences = await influenceRepository.find({
      relations: {
        person: true,
      },
        where: {
          person: person_id
        }    
    })

    let lastInsertedDates = []
    for (let i = 0; i < influences.length; i++){
      let requestedPersonId = influences[i].person.id
      if(requestedPersonId === person_id) {
        lastInsertedDates.push(influences[i].start_date)
      }
    }

    let dateToCompare;
    let startDate = parseISO(start_date)
    let requestedDate;
    for(let i = 0; i < lastInsertedDates.length; i++){
      let compareDate = parseISO(lastInsertedDates[i])
      requestedDate = compareDate
      if (requestedDate !== startDate){
        let dateResult = isAfter((requestedDate), (startDate))
          if(dateResult === true){
          dateToCompare = dateResult
      }
    }
  }   

      if (requestedDate === startDate || dateToCompare === true){
        console.log("bateu?")
        res.sendStatus(400)
      } else if (address === "" || address === undefined){
          res.sendStatus(400)
      } else {
        const influenceRepository = AppDataSource.getRepository(Influence)
        .create({
          start_date: start_date, 
          end_date: end_date,
          address: address,
          person: person_id
        })
        const results = await AppDataSource.getRepository(Influence).save(influenceRepository)
          return res.send(results)
    }
  
})

module.exports = router