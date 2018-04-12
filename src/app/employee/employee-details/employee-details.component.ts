import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeModel} from "../employee-model";
import {Subject} from "rxjs/Subject";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HeaderService} from "../../header/header.service";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {


  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private headerService: HeaderService, private router: Router) {
  }

  employee: EmployeeModel = null;

  ngOnInit() {


    console.log("details componnent");

    this.route.params.subscribe(
      (params: Params) => {
        this.employee = this.employeeService.getEmployeebyMatricule(params['id']);
        console.log("routes changed");
        this.employeeService.onKewWordChanged.next(this.employee.matricule.toString());
        this.employeeService.employeeToShow.next(this.employee);
      }
    );

    // console.log(this.employee);
  }

//employee = new EmployeeModel(1,"ait benaissa","omar",new Date('13/04/199'),new Date('13/04/199'),'Directeur','5 Rue Maurice Couderchet','0664941132','omar.benaissa@outlook.com','123456','ic60793','H','M',2);
  ngOnDestroy(): void {
    console.log("componnent details leaved");
  }
}
