import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from "../employee/employee-model";
import {EmployeeService} from "../employee/employee.service";

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {

  showPaysLip: boolean;

  constructor(private employeeService: EmployeeService) {
  }

employee: EmployeeModel = null;

  ngOnInit() {
    this.employeeService.onKewWordChanged.subscribe(
      (data: string) => {
        this.showPaysLip=false;
      }

    );

    console.log('paysLip Componenet');

  }

  //employee = new EmployeeModel(1,"ait benaissa","omar",new Date('13/04/199'),new Date('13/04/199'),'Directeur','5 Rue Maurice Couderchet','0664941132','omar.benaissa@outlook.com','123456','ic60793','H','M',2);
  onEmployeeSelected(event: EmployeeModel) {
    this.employee = event;
    this.showPaysLip = true;
    console.log(event +" ----- "+ this.showPaysLip);
  }
  reset(test:boolean) {
    this.showPaysLip = test;
  }
}
