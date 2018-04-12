import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from "../../../employee/employee-model";
import {LabelsRubric} from "../../PaysLipToolsShared/labelsRubric";
import {PayslipService} from "../../payslip.service";
import {EmployeeService} from "../../../employee/employee.service";

@Component({
  selector: 'app-view-pays-lip',
  templateUrl: './view-pays-lip.component.html',
  styleUrls: ['./view-pays-lip.component.css']
})
export class ViewPaysLipComponent implements OnInit {

  labelRubrics: LabelsRubric[];
  @Input() employee: EmployeeModel = null;
  labels = this.payslipService.labels;

  netAPaye: number;
  totalGains: number = 0;
  totalRetenues: number = 0;
  AMO = 2;
  CNSS = 4.48;
  IGR = 1;
  indem = 0;


  constructor(private payslipService: PayslipService, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.labelRubrics = this.payslipService.listRubrique;
  }

}
