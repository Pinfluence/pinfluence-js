import express from "express";
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source"
import { Influence } from "../entities/Influence";

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const router = express.Router()

router.post("/influences", async function (req: Request, res: Response) {
  let influence = req.body.name
  console.log("person", influence)
})

module.exports = router