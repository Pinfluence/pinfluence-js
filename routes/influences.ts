import express from "express";
import { Request, Response, NextFunction } from 'express';
import { CreateInfluence } from '../commands/CreateInfluence'
import { CheckDateRangeIsValid } from '../commands/CheckDateRangeIsValid'
import { parseISO } from "date-fns";
import { NewInfluencePresenter } from "../presenters/NewInfluencePresenter"


const router = express.Router()

router.post("/", async function (req: Request, res: Response) {
  let { start_date, end_date, address, person_id } = req.body
  const startDate = parseISO(start_date)
  const endDate = parseISO(end_date)

  const checkDateRangeIsValid = new CheckDateRangeIsValid(startDate, endDate, person_id)
  const validation = await checkDateRangeIsValid.execute()

  if (validation.subject === false) {
    res.sendStatus(400);
  } else {
    
    const createInfluence = new CreateInfluence(startDate, endDate, address, person_id)
    const result = await createInfluence.execute()

    if (result.errors.length > 0) {
      res.sendStatus(400);
    } else {
      const influencePresenter = new NewInfluencePresenter(result.subject)

      return res.send(influencePresenter.present())
    }

  }
})

module.exports = router

