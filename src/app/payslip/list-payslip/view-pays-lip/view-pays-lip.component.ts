import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from "../../../employee/employee-model";
import {LabelsRubric} from "../../PaysLipToolsShared/labelsRubric";
import {PayslipService} from "../../payslip.service";
import {EmployeeService} from "../../../employee/employee.service";
import {PaysLip} from "../../PaysLipToolsShared/pays-lip";
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
    console.log(document.querySelector('#HTMLPaysLip'));
    html2canvas(document.querySelector('#HTMLPaysLip')).then(
      canvas => {
        //console.log(canvas.toDataURL('image/png'));
        const jspdf = new jsPDF();
        jspdf.addImage(canvas.toDataURL('image/png'), 4, 10);
        jspdf.save(this.employee.nom + ' ' + this.employee.prenom + ' ' + this.paysLipToshow.period[0].getMonth() + '/' + this.paysLipToshow.period[0].getFullYear());
      }
    );
  }

}
