import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmployeeModel} from "../employee-model";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-employee-infos',
  templateUrl: './employee-infos.component.html',
  styleUrls: ['./employee-infos.component.css']
})
export class EmployeeInfosComponent implements OnInit, OnDestroy {

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }
 @Input() employee:EmployeeModel=null;
  ngOnInit() {


  }
//  employee = new EmployeeModel(1,"ait benaissa","omar",new Date('13/04/199'),new Date('13/04/199'),'Directeur','5 Rue Maurice Couderchet','0664941132','omar.benaissa@outlook.com','123456','ic60793','H','M',2);


  ngOnDestroy(): void {

  }
}
