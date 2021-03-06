import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from '../../employee/employee-model';
import {PayslipService} from '../payslip.service';
import {PaysLip} from '../PaysLipToolsShared/PaysLip';
import {Rubric} from '../PaysLipToolsShared/rubric';
import {isNull} from 'util';

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
  paysLipYear = 0;
  paysLipMonth = 0;
  years: number[] = [];

  // rubrics: Rubric[];

  constructor(private paysLipsService: PayslipService) {
    let toDay = new Date().getFullYear();
    for (let i = 0; i < 15; i++) {
      // this.years.push(toDay--);
      //console.log(toDay - i);
      this.years.push(toDay - i);
    }
    // //console.log(toDay--);

  }

  onSetYear(year: number) {
    //console.log(year);
    this.paysLipYear = (year);
  }

  onSetMonth(month: number) {
    //console.log(month);
    this.paysLipMonth = (month);
  }

  paysLips: PaysLip[];
  months: Month[] = [
    new Month('Janvier', 1),
    new Month('Fervrier', 2),
    new Month('Mars', 3),
    new Month('Avril', 4),
    new Month('Mai', 5),
    new Month('Juin', 6),
    new Month('Juillet', 7),
    new Month('Aout', 8),
    new Month('Septembre', 9),
    new Month('Octobre', 10),
    new Month('Novembre', 11),
    new Month('Decembre', 12),

  ];


  ngOnInit() {

    this.paysLipsService.getPaysLipByEmployee(this.employee.matricule).subscribe(
      (paysLips: PaysLip[]) => {
        this.paysLips = paysLips;
        //console.log(paysLips);
      }
    );
    // this.paysLips = this.paysLipsService.paysLips;

  }

  showPaysLip(paysLip: PaysLip) {

    this.paysLipsService.getRubricsByPaysLip(paysLip.idPyasLip).subscribe(
      (rubrics: Rubric[]) => {
        // //console.log(rubrics);
       // //console.log(this.cleanUpRubrics(rubrics));
        this.paysLipToshow = paysLip;
        this.paysLipToshow.rubrics = this.cleanUpRubrics(rubrics);
        //console.log(this.paysLipToshow);
      }
    );


  }

  cleanUpRubrics(rubrics: Rubric[]) {


    let i = 0;
    while (i < rubrics.length) {
      if (isNull(rubrics[i].value) || String(rubrics[i].value) === '0') {
        rubrics.splice(i, 1);
        i--;
      }
      i++;
    }
    return rubrics;
  }


}
