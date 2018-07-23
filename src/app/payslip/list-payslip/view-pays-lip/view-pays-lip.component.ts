import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from "../../../employee/employee-model";
import {LabelsRubric} from "../../PaysLipToolsShared/labelsRubric";
import {PayslipService} from "../../payslip.service";
import {EmployeeService} from "../../../employee/employee.service";
import {PaysLip} from "../../PaysLipToolsShared/PaysLip";
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-view-pays-lip',
  templateUrl: './view-pays-lip.component.html',
  styleUrls: ['./view-pays-lip.component.css']
})
export class ViewPaysLipComponent implements OnInit {

  labelRubrics: LabelsRubric[];
  rubricLabels: any;
  @Input() employee: EmployeeModel = null;
  @Input() paysLipToshow: PaysLip;
  labels: any;

  AMO = 2;
  CNSS = 4.48;
  IGR = 1;


  constructor(private payslipService: PayslipService, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    console.log(this.paysLipToshow);
    this.labelRubrics = this.payslipService.listRubrique;
    this.rubricLabels = this.payslipService.rubricsTitles;
  }

  generatePaysLip() {
    let index = 0;
    let id = '#HTMLPaysLip_' + index;
    console.log(document.querySelector(id.toString()));
    html2canvas(document.querySelector(id)).then(
      canvas => {
        console.log(canvas.toDataURL('image/png'));
        console.log("Canvas " + canvas);
        const jspdf = new jsPDF();
        jspdf.addImage(canvas.toDataURL('image/png'), 4, 10);
        jspdf.save(this.employee.nom + ' ' + this.employee.prenom + ' ' + this.paysLipToshow.startPeriod.getMonth() + '/' + this.paysLipToshow.startPeriod.getFullYear());
      }
    );
  }

}
