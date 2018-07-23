import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from '../../employee/employee-model';
import {PayslipService} from '../payslip.service';
import {PaysLip} from '../PaysLipToolsShared/PaysLip';
import {Rubric} from '../PaysLipToolsShared/rubric';

export class Month {
  label: string;
  month: number;

  constructor(label: string, month: number) {
    this.label = label;
    this.month = month;
  }
}


@Component({
  selector: 'app-list-payslip',
  templateUrl: './list-payslip.component.html',
  styleUrls: ['./list-payslip.component.css']
})


export class ListPayslipComponent implements OnInit {
  @Input() employee: EmployeeModel = null;
  paysLipToshow: PaysLip;
  paysLipDate: Date;

  constructor(private paysLipsService: PayslipService) {
  }

  paysLips: PaysLip[];
  months: Month[]=[
    new Month('Janvier',1),
    new Month('Fervrier',2),
    new Month('Mars',3),
    new Month('Avril',4),
    new Month('Mai',5),
    new Month('Juin',6),
    new Month('Juillet',7),
    new Month('Aout',8),
    new Month('Septembre',9),
    new Month('Octobre',10),
    new Month('Novembre',11),
    new Month('Decembre',12),

    ];

  ngOnInit() {

    this.paysLipsService.getPaysLipByEmployee(this.employee.matricule).subscribe(
      (paysLips: PaysLip[]) => {
        this.paysLips = paysLips;
        console.log(paysLips);
      }
    );
    // this.paysLips = this.paysLipsService.paysLips;

  }

  showPaysLip(paysLip: PaysLip) {
    //console.log(paysLip);
    this.cleanUpRubrics(paysLip.rubrics);
    //console.log(paysLip);
    this.paysLipToshow = paysLip;
  }

  cleanUpRubrics(rubrics: Rubric[]) {

    let i = 0;
    while (i < rubrics.length) {
      // console.log(rubrics[i].label + "   " + rubrics[i].value + "  " + isNaN(rubrics[i].value));
      if (isNaN(rubrics[i].value)) {
        rubrics.splice(i, 1);
        i--;
      }
      i++;
    }

  }


}
