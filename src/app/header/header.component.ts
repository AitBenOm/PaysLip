import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee/employee.service";
import {HeaderService} from "./header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  keyWord: string;

  constructor(private employeeService: EmployeeService, private headerService: HeaderService
  ) { }

  ngOnInit() {
  }
  onSearch(){
this.employeeService.onKewWordChanged.emit(this.keyWord);
  }
  showList(){
    this.headerService.onShowList.next(true);
  }
}
