import {Rubric} from "./rubric";
import {EmployeeModel} from "../../employee/employee-model";

export class PaysLip {

  public idPyasLip: number;
  public  employee: EmployeeModel
  public startPeriod: Date;
  public endPeriod: Date;
  public  rubrics : Rubric[];


  constructor(employee: EmployeeModel, startPeriod: Date, endPeriod: Date ) {
    this.employee = employee;
    this.startPeriod = startPeriod;
    this.endPeriod = endPeriod;

  }
}
