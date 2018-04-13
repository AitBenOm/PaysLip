import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from "../../../employee/employee-model";
import {LabelsRubric} from "../../PaysLipToolsShared/labelsRubric";
import {PayslipService} from "../../payslip.service";
import {EmployeeService} from "../../../employee/employee.service";
import {PaysLip} from "../../PaysLipToolsShared/pays-lip";
import {Rubric} from "../../PaysLipToolsShared/rubric";
import {isNumber} from "util";

@Component({
  selector: 'app-view-pays-lip',
  templateUrl: './view-pays-lip.component.html',
  styleUrls: ['./view-pays-lip.component.css']
})
export class ViewPaysLipComponent implements OnInit {

  labelRubrics: LabelsRubric[];
  @Input() employee: EmployeeModel = null;
  @Input() paysLipToshow: PaysLip;
  labels: any;
  rubricLabels: any;
  AMO = 2;
  CNSS = 4.48;
  IGR = 1;


  constructor(private payslipService: PayslipService, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    console.log(this.paysLipToshow);
    this.labelRubrics = this.payslipService.listRubrique;
    this.labels = this.payslipService.labels;
    this.rubricLabels = this.payslipService.rubricsLabels;
  }



}
