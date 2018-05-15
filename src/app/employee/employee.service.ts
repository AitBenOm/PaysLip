import {EventEmitter, Injectable} from '@angular/core';
import {EmployeeModel} from "./employee-model";
import {Subject} from "rxjs/Subject";
import {Fonction} from "./fonction";
import {FormControl} from "@angular/forms";

@Injectable()
export class EmployeeService {

  constructor() {
  }

  employeeSelected = new Subject<EmployeeModel>();
  onEmployeeAdded = new Subject<EmployeeModel>();
  employeeToShow = new Subject<EmployeeModel>();
  onKewWordChanged = new EventEmitter<string>();

  private _listFunction: Fonction[] = [
    new Fonction(1, 'Directeur'),
    new Fonction(2, 'Enseignant'),
    new Fonction(3, 'Secretaire'),
    new Fonction(4, 'Surveillant Générale'),
    new Fonction(5, 'Accompagnateur'),
  ];
  private _listEmployee: EmployeeModel[] = [
    new EmployeeModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), new Date('2015-04-12'), 'Directeur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 0, 3182),
    new EmployeeModel(2, "Benaissa", "Omar", new Date('1991-04-12'), new Date('2010-04-12'), 'Surveillant Générale', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 2, 3500),
    new EmployeeModel(3, "Lamnini", "Ilias", new Date('1991-04-12'), new Date('2016-04-12'), 'Secretaire', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 1, 2000),
    new EmployeeModel(4, "Rhallab", "Chaimae", new Date('1991-04-12'), new Date('2009-04-12'), 'Accompagnateur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 3, 1650),
    new EmployeeModel(5, "Nouhi", "Mohammed", new Date('1991-04-12'), new Date('1991-05-05'), 'Directeur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 2, 4500),

    new EmployeeModel(6, "Ait benaissa", "Omar", new Date('1991-04-12'), new Date('2015-04-12'), 'Directeur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 0, 3182),
    new EmployeeModel(7, "Benaissa", "Omar", new Date('1991-04-12'), new Date('2010-04-12'), 'Surveillant Générale', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 2, 3500),
    new EmployeeModel(8, "Lamnini", "Ilias", new Date('1991-04-12'), new Date('2016-04-12'), 'Secretaire', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 1, 2000),
    new EmployeeModel(9, "Rhallab", "Chaimae", new Date('1991-04-12'), new Date('2009-04-12'), 'Accompagnateur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 3, 1650),
    new EmployeeModel(10, "Nouhi", "Mohammed", new Date('1991-04-12'), new Date('1991-05-05'), 'Directeur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 2, 4500),

    new EmployeeModel(11, "Ait benaissa", "Omar", new Date('1991-04-12'), new Date('2015-04-12'), 'Directeur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 0, 3182),
    new EmployeeModel(12, "Benaissa", "Omar", new Date('1991-04-12'), new Date('2010-04-12'), 'Surveillant Générale', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 2, 3500),
    new EmployeeModel(13, "Lamnini", "Ilias", new Date('1991-04-12'), new Date('2016-04-12'), 'Secretaire', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 1, 2000),
    new EmployeeModel(14, "Rhallab", "Chaimae", new Date('1991-04-12'), new Date('2009-04-12'), 'Accompagnateur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 3, 1650),
    new EmployeeModel(15, "Nouhi", "Mohammed", new Date('1991-04-12'), new Date('1991-05-05'), 'Directeur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 2, 4500),

    new EmployeeModel(16, "Ait benaissa", "Omar", new Date('1991-04-12'), new Date('2015-04-12'), 'Directeur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 0, 3182),
    new EmployeeModel(17, "Benaissa", "Omar", new Date('1991-04-12'), new Date('2010-04-12'), 'Surveillant Générale', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 2, 3500),
    new EmployeeModel(18, "Lamnini", "Ilias", new Date('1991-04-12'), new Date('2016-04-12'), 'Secretaire', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 1, 2000),
    new EmployeeModel(19, "Rhallab", "Chaimae", new Date('1991-04-12'), new Date('2009-04-12'), 'Accompagnateur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 3, 1650),
    new EmployeeModel(20, "Nouhi", "Mohammed", new Date('1991-04-12'), new Date('1991-05-05'), 'Directeur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 2, 4500),

    new EmployeeModel(21, "Ait benaissa", "Omar", new Date('1991-04-12'), new Date('2015-04-12'), 'Directeur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 0, 3182),
    new EmployeeModel(22, "Benaissa", "Omar", new Date('1991-04-12'), new Date('2010-04-12'), 'Surveillant Générale', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 2, 3500),
    new EmployeeModel(23, "Lamnini", "Ilias", new Date('1991-04-12'), new Date('2016-04-12'), 'Secretaire', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 1, 2000),
    new EmployeeModel(24, "Rhallab", "Chaimae", new Date('1991-04-12'), new Date('2009-04-12'), 'Accompagnateur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 3, 1650),
    new EmployeeModel(25, "Nouhi", "Mohammed", new Date('1991-04-12'), new Date('1991-05-05'), 'Directeur', '5 Rue Maurice Couderchet', '0664941132', 'omar.benaissa@outlook.com', '123456', 'ic60793', '5', 'M', 2, 4500),

  ];

  getListEmployee(): EmployeeModel[] {
    return this._listEmployee;
  }


  getListFunction(): Fonction[] {
    return this._listFunction;
  }

  setListEmployee(value: EmployeeModel[]) {
    this._listEmployee = value;
  }

  checkEmployeeByMatricule(matricule) {
    return (employee) => {
      return employee.matricule.toString() === matricule;
    };
  }

  getEmployeebyMatricule(index: string) {

    const employee = this.getListEmployee().find(this.checkEmployeeByMatricule(index));
// console.log(employee);
    return employee;
  }

  onUpdateEmployee(employee: EmployeeModel) {
    const index = this.getListEmployee().indexOf(this.getListEmployee().find(this.checkEmployeeByMatricule(employee.matricule)));
    console.log(index);
    this.getListEmployee().splice(index, 1);
    this.getListEmployee().push(employee);
  }

  onAddEmployee(employee: EmployeeModel) {
    this._listEmployee.push(employee);
  }

  dateValidator(date: FormControl) {
    const toDay = new Date();
    console.log(toDay);
    console.log(new Date(date.value));
    console.log(new Date(date.value).getTime() > toDay.getTime());
    if (new Date(date.value).getTime() > toDay.getTime() || new Date(date.value).getFullYear() < 1900) {

      return {'dateNoOk': true};
    }
    return null;
  }
}


