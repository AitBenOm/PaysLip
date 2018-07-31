import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from '../../../employee/employee-model';
import {LabelsRubric} from '../../PaysLipToolsShared/labelsRubric';
import {PayslipService} from '../../payslip.service';
import {EmployeeService} from '../../../employee/employee.service';
import {PaysLip} from '../../PaysLipToolsShared/PaysLip';
import * as FileSaver from 'file-saver';
import {Rubric} from '../../PaysLipToolsShared/rubric';
import {HttpClient} from '@angular/common/http';

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


  constructor(private payslipService: PayslipService, private employeeService: EmployeeService, private http: HttpClient) {
  }

  ngOnInit() {
    //console.log(this.paysLipToshow);
    this.payslipService.getRubricsByPaysLip(this.paysLipToshow.idPyasLip).subscribe(
      (rubrics: Rubric[]) => {
        //console.log(rubrics);
        if (rubrics[0].label !== 'SDB') {
          rubrics.reverse();
        }
        this.paysLipToshow.rubrics = rubrics;
      }
    );
    this.labelRubrics = this.payslipService.listRubrique;
    this.rubricLabels = this.payslipService.rubricsTitles;
  }

  generatePaysLip(idPaysLip: number, matricule: number) {
    this.payslipService.printPaysLip(idPaysLip, matricule).subscribe(
      (data:Blob)=>{
        const pdfUrl = (window.URL).createObjectURL(new Blob([data], {type: 'application/pdf'}));
        console.log(pdfUrl);
        const anchor = document.createElement('a');
        anchor.download = `test.pdf`;
        anchor.href = pdfUrl;
        anchor.click();
      }
    );
  }

}
