import {EventEmitter, Injectable} from '@angular/core';
import {EmployeeModel} from "./employee-model";
import {Subject} from "rxjs/Subject";
import {Fonction} from "./fonction";
import {FormControl} from "@angular/forms";
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient, private router: Router) {
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
  private _listEmployee: EmployeeModel[] = [];

  getEmployees(){
    return this.http.get('http://localhost:9080/Employee/List');
  }
  getListEmployee() {
    if(this._listEmployee.length===0){
      this.router.navigate(['/home']);
    }else{
      return this._listEmployee;
    }

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
    return this.http.post('http://localhost:9080/Employee/Add' , employee);

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


