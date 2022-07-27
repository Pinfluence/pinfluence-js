import { AppDataSource } from "../data-source"
import { Influence } from "../entities/Influence";
import { areIntervalsOverlapping } from "date-fns";

export class CheckDateRangeIsValid {
  startDate : Date
  endDate : Date
  personId : number

  constructor (startDate : Date, endDate: Date, personId : string){
    this.startDate = startDate
    this.endDate = endDate
    this.personId = parseInt(personId)
  }

  async execute(){
    let rangeIsValid = true;
    const influences = await this._getInfluences()

    for(let i = 0; i < influences.length; i++){
      let existingStartDate = influences[i].start_date
      let existingEndDate = influences[i].end_date
      let areDatesOverllaping = areIntervalsOverlapping(
        {start: this.startDate, end: this.endDate}, 
        {start: existingStartDate, end: existingEndDate},
        { inclusive: true })

      if (areDatesOverllaping === true) {
        rangeIsValid = false
        break
      } 
    }
  
    return {
      errors: [],
      subject: rangeIsValid
    }
  }
  
  async _getInfluences(){
    const influenceRepository = AppDataSource.getRepository(Influence)

    const influences = await influenceRepository.find({
      relations: {
        person: true,
      }, 
      where: {
        person: {id: this.personId}
      }
    })
    return influences
  }
}