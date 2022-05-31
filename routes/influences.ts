import express from "express";
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source"
import { Influence } from "../entities/Influence";


const router = express.Router()

router.post("/influences", async function (req: Request, res: Response) {
  let { address } = req.body
  console.log(req.body)
  if(address === "" || address === undefined){
      res.sendStatus(400)
  } else {
    const influenceRepository = AppDataSource.getRepository(Influence)
    .create(req.body)
    const results = await AppDataSource.getRepository(Influence).save(influenceRepository)
      return res.send(results)
  }
})

module.exports = router