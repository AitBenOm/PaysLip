import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {EmployeeModel} from "../employee-model";
import {Fonction} from "../fonction";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: EmployeeModel;
  listFonction: Fonction[];

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.listFonction = this.employeeService.getListFunction();
  }

  addEmployee() {
    console.log(this.employee);
    this.employee.matricule = this.employeeService.getListEmployee().length+1;
    this.employeeService.onAddEmployee(this.employee);
    this.employeeService.onEmployeeAdded.next(this.employee);
    this.router.navigate(['employee-list']);
  }

}
