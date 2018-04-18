import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EmployeeModel} from '../../employee/employee-model';
import {PayslipService} from '../payslip.service';
import {LabelsRubric} from '../PaysLipToolsShared/labelsRubric';
import {EmployeeService} from "../../employee/employee.service";
import {FormGroup} from "@angular/forms";
import {Rubric} from "../PaysLipToolsShared/rubric";

import {PaysLip} from "../PaysLipToolsShared/pays-lip";
import {isNumeric} from "rxjs/util/isNumeric";


@Component({
  selector: 'app-current-payslip',
  templateUrl: './current-payslip.component.html',
  styleUrls: ['./current-payslip.component.css']
})
export class CurrentPayslipComponent implements OnInit, OnChanges {

  labels = this.payslipService.labels;

  netAPaye: number;
  totalGains: number = 0;
  totalRetenues: number = 0;
  AMO = 2;
  CNSS = 4.48;
  IGR = 1;
  indem = 0;

  labelRubrics: LabelsRubric[];
  rubrics: Rubric[] = [];


  @Input() employee: EmployeeModel = null;

  ngOnChanges(employee: SimpleChanges): void {
    for (const emp in employee) {
      const currentEmp = employee[emp];
      // ////console.log(currentEmp.currentValue);
      this.employeeService.employeeToShow.next(currentEmp.currentValue);

    }
  }


  constructor(private payslipService: PayslipService, private employeeService: EmployeeService) {
  }


  ngOnInit() {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    ////console.log(firstDay+ '  '+ lastDay);
    ////console.log(this.employee.date_emb);
    this.labelRubrics = this.payslipService.listRubrique;
    this.initialisation(this.employee);
    this.employeeService.employeeToShow.subscribe(
      (employee: EmployeeModel) => {
        ////console.log(employee);
        this.initialisation(employee);
      }
    );

  }

  initialisation(employee: EmployeeModel) {
    ////console.log(this.employee);

    ////console.log(employee.salaireDeBase);
    this.labels['SDB']['B'] = employee.salaireDeBase;
    this.labels['SDB']['T'] = 1;
    this.labels['SDB']['G'] = this.labels['SDB']['B'] * this.labels['SDB']['T'];

    this.labels['ANT']['T'] = (new Date().getFullYear() - employee.date_emb.getFullYear()) * 2;
    this.labels['AMO']['T'] = this.AMO;
    this.labels['CNSS']['T'] = this.CNSS;


    for (const label in this.labels) {

      if (label === 'AMO' || label === 'CNSS') {

        this.labels[label]['B'] = this.labels['SDB']['G'] + this.labels['ANT']['G'];
        this.labels[label]['R'] = Number((this.labels[label]['B'] * this.labels[label]['T'])) / 100;
      } else if (label === 'ANT') {

        this.labels[label]['B'] = this.labels['SDB']['G'];
        this.labels[label]['G'] = Number((this.labels[label]['B'] * this.labels[label]['T'])) / 100;
      }

    }
  }

  claculate(rubLib: string) {
    ////console.log (rubLib);


    this.labels[rubLib]['G'] = this.labels[rubLib]['B'] * this.labels[rubLib]['T'];
    this.indem = this.indem + this.labels[rubLib]['G'];
    if (this.indem - 300 > 0) {
      this.labels['CNSS']['B'] = (this.labels['CNSS']['B'] + (this.indem - 300));
      this.labels['CNSS']['R'] = Number((this.labels['CNSS']['B'] * this.labels['CNSS']['T'])) / 100;
    }
    this.labels['AMO']['B'] = (this.labels['AMO']['B'] + (this.labels[rubLib]['G']));
    this.labels['AMO']['R'] = Number((this.labels['AMO']['B'] * this.labels['AMO']['T'])) / 100;

  }


  totalGain() {
    this.totalGains = 0;
    for (const label in this.labels) {
      if (!isNaN(this.labels[label]['G'])) {
        this.totalGains = this.totalGains + Number(this.labels[label]['G']);
      }


    }

    return this.totalGains;

  }

  totalRetenue() {
    this.totalRetenues = 0;
    for (const label in this.labels) {
      if (!isNaN(this.labels[label]['R'])) {
        this.totalRetenues = this.totalRetenues + Number(this.labels[label]['R']);
      }
    }

    return this.totalRetenues
  }

  validate() {
    this.netAPaye = 0;
    this.netAPaye = this.totalGain() - this.totalRetenue();
    ////console.log(this.netAPaye);
  }

  reset(form: FormGroup) {
    ////console.log(form);
    form.reset();
    this.initialisation(this.employee);

  }

  storRubrics() {
    const totalRet = new Rubric('totalRet', 0, true, this.totalRetenue(), 999);
    const totalGain = new Rubric('totalGain', 0, true, this.totalGain(), 999);
    const netApaye = new Rubric('netApaye', 0, true, this.netAPaye, 999);

    for (const label in this.labels) {
      let GainRet: boolean = true;
      let value: number = 0;
      if (isNumeric(this.labels[label]['R'])) {
        GainRet = false;
        value = this.labels[label]['R'];
      } else {
        GainRet = true;
        value = this.labels[label]['G'];
      }
      const rub = new Rubric(label, this.labels[label]['T'], GainRet, Number(value), this.labels[label]['B']);

      this.rubrics.push(rub);

    }
    this.rubrics.push(totalGain, totalRet, netApaye);
    return this.rubrics;
  }

  savePaysLip() {
    const periode1: Date[] = [];
    const periode2: Date[] = [];
    const periode3: Date[] = [];
    const periode4: Date[] = [];
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    periode1.push(new Date(y, 4, 1), new Date(y, 4 + 1, 0));
    //console.log(periode1);
    const paysLip1 = new PaysLip('1', periode1, this.storRubrics());
    //console.log(paysLip1);
    this.payslipService.paysLips.push(paysLip1);
    this.payslipService.onAddPaysLip.next(paysLip1);

    periode2.push(new Date(y, 5, 1), new Date(y, 5 + 1, 0));
    //console.log(periode2);
    const paysLip2 = new PaysLip('1', periode2, this.storRubrics());
    //console.log(paysLip2);
    this.payslipService.paysLips.push(paysLip2);
    this.payslipService.onAddPaysLip.next(paysLip2);

    periode3.push(new Date(y, 6, 1), new Date(y, 6 + 1, 0));
    //console.log(periode3);
    const paysLip3 = new PaysLip('1', periode3, this.storRubrics());
    //console.log(paysLip3);
    //console.log(paysLip3);
    this.payslipService.paysLips.push(paysLip3);
    this.payslipService.onAddPaysLip.next(paysLip3);

    periode4.push(new Date(y, 7, 1), new Date(y, 7 + 1, 0));

    const paysLip4 = new PaysLip('1', periode4, this.storRubrics());
    //console.log(paysLip4);
    this.payslipService.paysLips.push(paysLip4);

    this.payslipService.onAddPaysLip.next(paysLip4);

  }

}
