import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {EmployeeModel} from '../../employee/employee-model';
import {PayslipService} from '../payslip.service';
import {LabelsRubric} from '../PaysLipToolsShared/labelsRubric';
import {EmployeeService} from '../../employee/employee.service';
import {FormGroup} from '@angular/forms';
import {Rubric} from '../PaysLipToolsShared/rubric';

import {PaysLip} from '../PaysLipToolsShared/PaysLip';
import {isNumeric} from 'rxjs/util/isNumeric';
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
  AMO = 2.28;
  CNSS = 4.29;
  IGR = 1;

  labelRubrics: LabelsRubric[];


  @Input() employee: EmployeeModel = null;
  @Output() Cancel = new EventEmitter<boolean>();

  ngOnChanges(employee: SimpleChanges): void {
    this.labelRubrics = [];
    this.labelRubrics = this.payslipService.listRubrique;
    this.labels['IGR']['B'] = '';
    this.labels['IGR']['T'] = '';
    this.labels['IGR']['R'] = '';
    this.netAPaye = 0;
    this.netImpo = 0;
    this.totalGains = 0;
    this.totalRetenues = 0;

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
    //console.log('destroy');

    this.labelRubrics = [];
    this.netAPaye = 0;
    this.netImpo = 0;
    this.totalGains = 0;
    this.totalRetenues = 0;
  }

  ngOnInit() {

    this.labelRubrics = [];
    this.labelRubrics = this.payslipService.listRubrique;

    this.netAPaye = 0;
    this.netImpo = 0;
    this.totalGains = 0;
    this.totalRetenues = 0;
    this.initialisation(this.employee);
    this.employeeService.employeeToShow.subscribe(
      (employee: EmployeeModel) => {
        this.initialisation(employee);
      }
    );

  }

  initialisation(employee: EmployeeModel) {

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
    if (employee.nbEnfant > 0) {
      this.labels['PRCHG']['B'] = 30;
      this.labels['PRCHG']['T'] = employee.nbEnfant;
      this.labels['PRCHG']['R'] = this.labels['PRCHG']['B'] * this.labels['PRCHG']['T'];
    }

    this.labels['TXPRO']['B'] = '';
    this.labels['TXPRO']['T'] = '';
    this.labels['TXPRO']['R'] = '';
  }

  resetInput(rubrique: string) {

  }

  calculate(rubLib: string, form: FormGroup) {
    let indem: number = 0;

    this.labels[rubLib]['G'] = this.labels[rubLib]['B'] * this.labels[rubLib]['T'];
    indem = indem + this.labels[rubLib]['G'];
    if (indem - 300 > 0) {
      this.labels['CNSS']['B'] = (this.labels['CNSS']['B'] + (indem - 300));
      this.labels['CNSS']['R'] = Number((this.labels['CNSS']['B'] * this.labels['CNSS']['T'])) / 100;
    }
    this.labels['AMO']['B'] = (this.labels['AMO']['B'] + (this.labels[rubLib]['G']));
    this.labels['AMO']['R'] = Number((this.labels['AMO']['B'] * this.labels['AMO']['T'])) / 100;
    $(document).ready(function () {

      $('#' + rubLib + '_B').prop('disabled', true);
      $('#' + rubLib + '_T').prop('disabled', true);
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

  validate() {
    this.netAPaye = 0;
    this.netImpo = 0;
    const Brut = this.totalGain();
    const charges = this.totalRetenue();
    let igr;
    //console.log('Brut' + Brut);
    //console.log('Charge' + charges);
    //console.log('taxe Pro' + this.txPro(Brut));
    this.netImpo = Brut - charges - this.txPro(Brut);
    //console.log('net impo' + this.netImpo);
    igr = this.igr(this.netImpo);
    this.totalRetenues = this.totalRetenues + this.txPro(Brut);

    this.netAPaye = Brut - igr - charges;


  }

  reset(form: FormGroup) {
    ////console.log(form);
    this.ngOnDestroy();
    this.Cancel.emit(false);

  }

  getLabelRubrics(labelRubrics: any[], label: string) {
    labelRubrics = this.payslipService.listRubrique;
    ////console.log(labelRubrics);
    for (const labelRub of labelRubrics) {
      ////console.log(labelRub['libelle']);
      if (labelRub['libelle'] === label) {
        return labelRub.nbOrTaux;
      }
    }

  }

  storRubrics(paysLip: PaysLip) {
    const rubrics: Rubric[] = [];
    const totalRet = new Rubric('totalRet', 0, 'nb', false, this.totalRetenue(), 999, paysLip);
    const totalGain = new Rubric('totalGain', 0, 'nb', true, this.totalGain(), 999, paysLip);
    const netApaye = new Rubric('netApaye', 0, 'nb', true, this.netAPaye, 999, paysLip);
    const netImpo = new Rubric('netImpo', 0, 'nb', true, this.netImpo, 999, paysLip);

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
      const rub = new Rubric(label, this.labels[label]['T'], this.getLabelRubrics(this.labelRubrics, label), GainRet, Number(value), this.labels[label]['B'], paysLip);
      if (this.labels[label]['B'] !== '' && (isNumeric(this.labels[label]['R']) || isNumeric(this.labels[label]['B'])))
        rubrics.push(rub);

    }
    console.log(totalRet.value);
    totalRet.value -= this.labels['TXPRO']['R'];
    console.log(totalRet.value);
    rubrics.push(totalGain, totalRet, netApaye, netImpo);
    console.log(this.txPro(netImpo.value));
    return rubrics;
  }

  savePaysLip(employee: EmployeeModel) {
    employee = this.employee;
    const periode: Date[] = [];
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    periode.push(new Date(y, m, 1), new Date(y, m + 1, 0));
    //console.log(periode1);
    const paysLip = new PaysLip(employee, periode[0], periode[1]);
    //console.log(paysLip);
    this.payslipService.addPaysLip(paysLip).subscribe(
      (pl: PaysLip) => {
        //console.log(pl);

        this.payslipService.addRubricsToPaysLip(this.storRubrics(pl)).subscribe(
          (rubrics: Rubric[]) => {
            //console.log(rubrics);
          }
        );
      }
    );
    this.payslipService.onAddPaysLip.next(paysLip);
  }

  anciente(dateEmb: Date) {
    dateEmb = new Date(dateEmb);
    if (new Date().getFullYear() - dateEmb.getFullYear() < 3) {
      return 5;
    } else if (new Date().getFullYear() - dateEmb.getFullYear() < 6) {
      return 10;
    } else if (new Date().getFullYear() - dateEmb.getFullYear() < 13) {
      return 15;
    } else if (new Date().getFullYear() - dateEmb.getFullYear() < 21) {
      return 20;
    } else if (new Date().getFullYear() - dateEmb.getFullYear() > 21) {
      return 25;
    }
  }

  igr(netImp: number) {
    this.labels['IGR']['B'] = '';
    this.labels['IGR']['T'] = '';
    this.labels['IGR']['R'] = '';
    if (netImp > 2500 && netImp < 4166.68) {
      this.labels['IGR']['B'] = netImp;
      this.labels['IGR']['T'] = 10;
      this.labels['IGR']['R'] = (Number((this.labels['IGR']['B'] * this.labels['IGR']['T'])) / 100) - 250;

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
