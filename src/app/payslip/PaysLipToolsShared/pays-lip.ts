import {Rubric} from "./rubric";
import {EmployeeModel} from "../../employee/employee-model";

export class PaysLip {

  public idPyasLip: string;
  public  employee: EmployeeModel
  public period: Date[];
  public  rubrics : Rubric[];

  constructor(idPyasLip: string, employee: EmployeeModel, period: Date[], rubrics: Rubric[]) {
    this.idPyasLip = idPyasLip;
    this.employee = employee;
    this.period = period;
    this.rubrics = rubrics;
  }
}
