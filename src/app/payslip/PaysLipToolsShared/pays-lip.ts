import {Rubric} from "./rubric";

export class PaysLip {

  public idPyasLip: string;
  public period: Date[];
  public  rubrics : Rubric[];

  constructor(idPyasLip: string, period: Date[], rubrics: Rubric[]) {
    this.idPyasLip = idPyasLip;
    this.period = period;
    this.rubrics = rubrics;
  }
}
