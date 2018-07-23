import {Component, OnInit} from '@angular/core';
import {PayslipService} from './payslip/payslip.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from './employee/employee.service';
import {HeaderService} from './header/header.service';
import {EmployeeModel} from './employee/employee-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      (employees: EmployeeModel[]) => {
        console.log(employees);
        this.employeeService.setListEmployee(employees);
      }
    );
  }
}
