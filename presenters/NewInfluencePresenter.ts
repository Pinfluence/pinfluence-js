import { Influence } from "../entities/Influence";
import { parseISO } from "date-fns";

export class NewInfluencePresenter {
  influence: Influence;
  constructor(influence: Influence){
    this.influence = influence
  }

  present(){
    const myObj =
    {
      id: this.influence.id,
      start_date: this._formatDate(this.influence.start_date),
      end_date: this._formatDate(this.influence.end_date),
      address: this.influence.address,
      person: {id: this.influence.person.id.toString()}
    }
    return myObj
  }

  _formatDate(date: Date){
    let startDate = date.toISOString().slice(0, 10)
    return startDate
  }
}




