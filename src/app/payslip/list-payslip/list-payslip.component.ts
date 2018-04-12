import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from '../../employee/employee-model';
import {PayslipService} from "../payslip.service";
import {PaysLip} from "../PaysLipToolsShared/pays-lip";

@Component({
  selector: 'app-list-payslip',
  templateUrl: './list-payslip.component.html',
  styleUrls: ['./list-payslip.component.css']
})
export class ListPayslipComponent implements OnInit {
  @Input() employee: EmployeeModel = null;
  constructor(private paysLipsService: PayslipService) {
  }

  paysLips: PaysLip[];

  ngOnInit() {
    this.paysLipsService.onAddPaysLip.subscribe(
      (paysLip: PaysLip) =>{
        this.paysLips = this.paysLipsService.paysLips;
        console.log(this.paysLips);
      }
    );
    // this.paysLips = this.paysLipsService.paysLips;

  }

}
