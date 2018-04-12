import {EventEmitter, Injectable} from '@angular/core';
import {EmployeeModel} from "./employee-model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class EmployeeService {

  constructor() { }

  employeeSelected= new  Subject <EmployeeModel>();
  employeeToShow= new  Subject <EmployeeModel>();
  onKewWordChanged = new EventEmitter<string>();

  private _listEmployee: EmployeeModel[]=[
      new EmployeeModel(1,"ait benaissa","omar",new Date('1991-04-12'),new Date('2015-04-12'),'Directeur','5 Rue Maurice Couderchet','0664941132','omar.benaissa@outlook.com','123456','ic60793','Homme','M',2,1500),
      new EmployeeModel(2," benaissa","omar",   new Date('1991-04-12'),new Date('2010-04-12'),'Directeur','5 Rue Maurice Couderchet','0664941132','omar.benaissa@outlook.com','123456','ic60793','Homme','M',2,3500),
      new EmployeeModel(3,"lamnini","ilias",    new Date('1991-04-12'),new Date('2016-04-12'),'Directeur','5 Rue Maurice Couderchet','0664941132','omar.benaissa@outlook.com','123456','ic60793','Homme','M',2,2000),
      new EmployeeModel(4,"Rhallab","Chaimae",  new Date('1991-04-12'),new Date('2009-04-12'),'Directeur','5 Rue Maurice Couderchet','0664941132','omar.benaissa@outlook.com','123456','ic60793','Homme','M',2,1650),
      new EmployeeModel(5,"Nouhi","Mohammed",   new Date('1991-04-12'),new Date('1991-05-05'),'Directeur','5 Rue Maurice Couderchet','0664941132','omar.benaissa@outlook.com','123456','ic60793','Homme','M',2,4500)
    ];
  getListEmployee(): EmployeeModel[] {
    return this._listEmployee;
  }

  setListEmployee(value: EmployeeModel[]) {
    this._listEmployee = value;
  }

   checkEmployeeByMatricule(matricule) {
    return (employee)=> {
      return employee.matricule.toString() === matricule;
    }
  }

  getEmployeebyMatricule(index: string){

    const employee= this.getListEmployee().find(this.checkEmployeeByMatricule(index) );
// console.log(employee);
 return employee;
  }
}


