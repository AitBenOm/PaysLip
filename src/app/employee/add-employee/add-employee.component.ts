import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {EmployeeModel} from "../employee-model";
import {Fonction} from "../fonction";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: EmployeeModel;
  listFonction: Fonction[];

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.listFonction = this.employeeService.getListFunction();
  }

}
