import { AppDataSource } from "../data-source"
import { Influence } from "../entities/Influence";
import { validate } from "class-validator";

export class CreateInfluence {
  startDate : Date
  endDate : Date
  address : string
  personId : number

  constructor(startDate : Date, endDate : Date, address : string, personId : string){
    this.startDate = startDate
    this.endDate = endDate
    this.address = address
    this.personId = parseInt(personId)
  }

  async execute(){
    const influenceRepository = AppDataSource.getRepository(Influence)
    const influence = influenceRepository.create({
      start_date: this.startDate, 
      end_date: this.endDate,
      address: this.address,
      person: {id: this.personId}
    })

    const errors = await validate(influence);

    if (errors.length <= 0) {
      await influenceRepository.save(influence)
    }

    return {
      errors: errors,
      subject: influence
    }
  }
}