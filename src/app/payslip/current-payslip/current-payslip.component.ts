import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {EmployeeModel} from '../../employee/employee-model';
import {PayslipService} from '../payslip.service';
import {LabelsRubric} from '../PaysLipToolsShared/labelsRubric';
import {EmployeeService} from "../../employee/employee.service";
import {FormGroup} from "@angular/forms";
import {Rubric} from "../PaysLipToolsShared/rubric";

import {PaysLip} from "../PaysLipToolsShared/pays-lip";
import {isNumeric} from "rxjs/util/isNumeric";
import * as $ from 'jquery';


@Component({
  selector: 'app-current-payslip',
  templateUrl: './current-payslip.component.html',
  styleUrls: ['./current-payslip.component.css']
})
export class CurrentPayslipComponent implements OnInit, OnChanges, OnDestroy {

  labels = this.payslipService.labelsVariabls;

  netAPaye: number = 0;
  netImpo: number = 0;
  totalGains: number = 0;
  totalRetenues: number = 0;
  AMO = 2;
  CNSS = 4.29;
  IGR = 1;
  indem = 0;
  nbRet: number = 0;
  nbGain: number = 0;

  labelRubrics: LabelsRubric[];
  rubrics: Rubric[] = [];


  @Input() employee: EmployeeModel = null;
  @Output() Cancel = new EventEmitter<boolean>();

  ngOnChanges(employee: SimpleChanges): void {
    for (const emp in employee) {
      const currentEmp = employee[emp];
      // ////console.log(currentEmp.currentValue);

      for (const label in this.labels) {

        if (label === 'INDTR' || label === 'INDRE' || label === 'PRITR' || label === 'PRIPAN') {
          this.labels[label]['G'] = '';
          this.labels[label]['B'] = '';
          this.labels[label]['T'] = '';
        }
      }
      this.employeeService.employeeToShow.next(currentEmp.currentValue);

    }
  }


  constructor(private payslipService: PayslipService, private employeeService: EmployeeService) {
  }


  ngOnDestroy(): void {
    console.log("destroy");
  }

  ngOnInit() {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    ////console.log(firstDay+ '  '+ lastDay);
    ////console.log(this.employee.date_emb);
    this.labelRubrics = this.payslipService.listRubrique;
    if (this.employee.nbEnfant > 0 ) {
      this.labelRubrics.splice(10, 1);
    }

    this.initialisation(this.employee);
    this.employeeService.employeeToShow.subscribe(
      (employee: EmployeeModel) => {


        this.initialisation(employee);
      }
    );

  }

  initialisation(employee: EmployeeModel) {
    console.log(this.employee);

    console.log(employee.salaireDeBase);
    this.labels['SDB']['B'] = employee.salaireDeBase;
    this.labels['SDB']['T'] = 1;
    this.labels['SDB']['G'] = this.labels['SDB']['B'] * this.labels['SDB']['T'];


    this.labels['ANT']['T'] = this.anciente(employee.date_emb);
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
    if (this.employee.nbEnfant > 0) {
      this.labels['PRCHG']['B'] = 30;
      this.labels['PRCHG']['T'] = this.employee.nbEnfant;
      this.labels['PRCHG']['R'] = this.labels['PRCHG']['B'] * this.labels['PRCHG']['T'];
    }

    this.labels['TXPRO']['B'] = '';
    this.labels['TXPRO']['T'] = '';
    this.labels['TXPRO']['R'] = '';
  }

  resetInput(rubrique: string) {

  }

  calculate(rubLib: string, form: FormGroup) {
    var test = rubLib + '_B';
    this.labels[rubLib]['G'] = this.labels[rubLib]['B'] * this.labels[rubLib]['T'];
    this.indem = this.indem + this.labels[rubLib]['G'];
    if (this.indem - 300 > 0) {
      this.labels['CNSS']['B'] = (this.labels['CNSS']['B'] + (this.indem - 300));
      this.labels['CNSS']['R'] = Number((this.labels['CNSS']['B'] * this.labels['CNSS']['T'])) / 100;
    }
    this.labels['AMO']['B'] = (this.labels['AMO']['B'] + (this.labels[rubLib]['G']));
    this.labels['AMO']['R'] = Number((this.labels['AMO']['B'] * this.labels['AMO']['T'])) / 100;
    $(document).ready(function () {
      console.log(test);
      $("#" + rubLib + '_B').prop("disabled", true);
      $("#" + rubLib + '_T').prop("disabled", true);
    });
  }


  totalGain() {
    this.totalGains = 0;
    for (const label in this.labels) {
      if (!isNaN(this.labels[label]['G'])) {
        this.totalGains = this.totalGains + Number(this.labels[label]['G']);
      }


    }

    return Number(this.totalGains);

  }

  totalRetenue() {
    this.totalRetenues = 0;
    for (const label in this.labels) {
      if (!isNaN(this.labels[label]['R'])) {
        this.totalRetenues = this.totalRetenues + Number(this.labels[label]['R']);
      }
    }

    return Number(this.totalRetenues);
  }

  validate(form: FormGroup) {
    this.netAPaye = 0;
    this.netImpo = 0;
    const Brut = this.totalGain();
    const charges = this.totalRetenue();
    let igr;

    this.netImpo = Brut - charges - this.txPro(Brut);
    igr = this.igr(this.netImpo);
    this.totalRetenues = this.totalRetenues + this.txPro(Brut);

    this.netAPaye = Brut - igr - charges;

  }

  reset(form: FormGroup) {
    ////console.log(form);
    this.Cancel.emit(false);

  }

  storRubrics() {
    const totalRet = new Rubric('totalRet', 0, true, this.totalRetenue(), 999);
    const totalGain = new Rubric('totalGain', 0, true, this.totalGain(), 999);
    const netApaye = new Rubric('netApaye', 0, true, this.netAPaye, 999);
    const netImpo = new Rubric('netImpo', 0, true, this.netImpo, 999);

    for (const label in this.labels) {
      let GainRet: boolean;
      let value: number;
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
    this.rubrics.push(totalGain, totalRet, netApaye, netImpo);
    return this.rubrics;
  }

  savePaysLip() {
    const periode1: Date[] = [];
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    periode1.push(new Date(y, m, 1), new Date(y, m + 1, 0));
    //console.log(periode1);
    const paysLip1 = new PaysLip('1', periode1, this.storRubrics());
    //console.log(paysLip1);
    this.payslipService.paysLips.push(paysLip1);
    this.payslipService.onAddPaysLip.next(paysLip1);
  }

  anciente(dateEmb: Date) {
    if (new Date().getFullYear() - dateEmb.getFullYear() < 3) {
      return 5;
    } else if (new Date().getFullYear() - dateEmb.getFullYear() < 6) {
      return 10;
    } else if (new Date().getFullYear() - dateEmb.getFullYear() < 13) {
      return 15;
    } else if (new Date().getFullYear() - dateEmb.getFullYear() < 21) {
      return 20;
    } else if (new Date().getFullYear() - dateEmb.getFullYear() < 21) {
      return 25;
    }
  }

  igr(netImp: number) {

    if (netImp > 2500 && netImp < 4166.68) {
      this.labels['IGR']['B'] = netImp;
      this.labels['IGR']['T'] = 10;
      this.labels['IGR']['R'] = (Number((this.labels['IGR']['B'] * this.labels['IGR']['T'])) / 100) - 250;
      const test = (Number((this.labels['IGR']['B'] * this.labels['IGR']['T'])) / 100) - 250;
      console.log('IGR : ' + netImp);
      console.log('IGR : ' + test);
    } else if (netImp > 4166.68 && netImp < 5001) {
      this.labels['IGR']['B'] = netImp;
      this.labels['IGR']['T'] = 20;
      this.labels['IGR']['R'] = (Number((this.labels['IGR']['B'] * this.labels['IGR']['T'])) / 100) - 666.67;
    } else if (netImp > 5001 && netImp < 6666.67) {
      this.labels['IGR']['B'] = netImp;
      this.labels['IGR']['T'] = 30;
      this.labels['IGR']['R'] = (Number((this.labels['IGR']['B'] * this.labels['IGR']['T'])) / 100) - 1166.67;
    } else if (netImp > 6666.67 && netImp < 150000) {
      this.labels['IGR']['B'] = netImp;
      this.labels['IGR']['T'] = 34;
      this.labels['IGR']['R'] = (Number((this.labels['IGR']['B'] * this.labels['IGR']['T'])) / 100) - 1433.33;
    } else if (netImp > 15000) {
      this.labels['IGR']['B'] = netImp;
      this.labels['IGR']['T'] = 38;
      this.labels['IGR']['R'] = (Number((this.labels['IGR']['B'] * this.labels['IGR']['T'])) / 100) - 2033.33;
    } else if (netImp < 2500) {
      return 0;
    }
    return this.labels['IGR']['R'];
  }

  txPro(netImposabel: number) {
    this.labels['TXPRO']['B'] = netImposabel;
    this.labels['TXPRO']['T'] = 20;
    this.labels['TXPRO']['R'] = (Number((this.labels['TXPRO']['B'] * this.labels['TXPRO']['T'])) / 100);
    return this.labels['TXPRO']['R'];
  }

}
