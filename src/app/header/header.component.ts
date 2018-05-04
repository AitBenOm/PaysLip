import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee/employee.service";
import {HeaderService} from "./header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  constructor(private employeeService: EmployeeService, private headerService: HeaderService
  ) { }
path="/assets/Logo.PNG";
  ngOnInit() {
  }

}
