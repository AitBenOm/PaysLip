import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from '../../employee/employee-model';
import {PayslipService} from "../payslip.service";
import {PaysLip} from "../PaysLipToolsShared/pays-lip";
import {Rubric} from "../PaysLipToolsShared/rubric";

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

  ngOnInit() {

    this.paysLipsService.onAddPaysLip.subscribe(
      (paysLip: PaysLip) => {
        this.paysLips = this.paysLipsService.paysLips;
        console.log(this.paysLips);
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
