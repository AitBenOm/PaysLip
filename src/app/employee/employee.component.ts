import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from "./employee-model";
import {EmployeeService} from "./employee.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
employeeSelected: boolean=false;

  ngOnInit() {
this.employeeService.employeeSelected.subscribe(
  (data:EmployeeModel) => {
    this.employeeSelected=true;
  }
);
    console.log("Employee ");
    console.log(new Date());
  }

}
