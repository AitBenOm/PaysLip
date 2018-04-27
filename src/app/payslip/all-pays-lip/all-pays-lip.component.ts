import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {EmployeeModel} from '../../employee/employee-model';
import {PayslipService} from '../payslip.service';
import {LabelsRubric} from '../PaysLipToolsShared/labelsRubric';
import {EmployeeService} from "../../employee/employee.service";
import * as html2canvas from 'html2canvas';
import {Rubric} from "../PaysLipToolsShared/rubric";

import {PaysLip} from "../PaysLipToolsShared/pays-lip";
import {isNumeric} from "rxjs/util/isNumeric";
import * as jsPDF from 'jspdf';
import * as $ from 'jquery';


@Component({
  selector: 'app-all-pays-lip',
  templateUrl: './all-pays-lip.component.html',
  styleUrls: ['./all-pays-lip.component.css']
})
export class AllPaysLipComponent implements OnInit {

  labels = this.payslipService.labelsVariabls;

  netAPaye: number = 0;
  netImpo: number = 0;
  totalGains: number = 0;
  totalRetenues: number = 0;
  AMO = 2.28;
  CNSS = 4.29;
  IGR = 1;
  Title = 'HTMLPaysLip_';


  labelRubrics: LabelsRubric[];

  rubricLabels: any;
  jspdf= new jsPDF();

  listPaysLip: PaysLip[] = [];
  employees: EmployeeModel[];


  constructor(private payslipService: PayslipService, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.labelRubrics = [];
    this.labelRubrics = this.payslipService.listRubrique;
    this.rubricLabels = this.payslipService.rubricsTitles;

    this.netAPaye = 0;
    this.netImpo = 0;
    this.totalGains = 0;
    this.totalRetenues = 0;
    // this.labels = this.payslipService.labelsVariabls;

    this.payslipService.onGenerateAllPaysLip.subscribe(
      (onGenerate: boolean) => {

        this.labels = this.payslipService.labelsVariabls;

        this.saveAllPaysLips(this.employeeService.getListEmployee());

        console.log(this.listPaysLip);
      }
    );

    this.listPaysLip = this.payslipService.allPaysLips;

    this.employees = this.employeeService.getListEmployee();
  }

  initialisation(employee: EmployeeModel) {
    this.labels['IGR']['B'] = '';
    this.labels['IGR']['T'] = '';
    this.labels['IGR']['R'] = '';
    //cons.log(employee.salaireDeBase);
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
    //console.log("Brut"+ Brut);
    //console.log("Charge"+ charges);
    //console.log("taxe Pro"+ this.txPro(Brut));
    this.netImpo = Brut - charges - this.txPro(Brut);
    //console.log("net impo"+ this.netImpo);
    igr = this.igr(this.netImpo);
    this.totalRetenues = this.totalRetenues + this.txPro(Brut);

    this.netAPaye = Brut - igr - charges;

  }

  storRubrics() {
    const rubrics: Rubric[] = [];
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
      if (!isNaN(rub.value)) {
        rubrics.push(rub);
      }


    }
    rubrics.push(totalGain, totalRet, netApaye, netImpo);
    return rubrics;
  }

  savePaysLip(employee: EmployeeModel) {

    const periode: Date[] = [];
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    periode.push(new Date(y, m, 1), new Date(y, m + 1, 0));
    ////console.log(periode1);
    const paysLip = new PaysLip('1', employee, periode, this.storRubrics());
    // console.log(paysLip);
    this.payslipService.allPaysLips.push(paysLip);
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
    } else if (new Date().getFullYear() - dateEmb.getFullYear() > 21) {
      return 25;
    }
  }

  igr(netImp: number) {

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


  saveAllPaysLips(employees: EmployeeModel[]) {
    //   console.log('onSave ALL');
    for (const employee of employees) {
      //  console.log(employee);
      this.labelRubrics = this.payslipService.listRubrique;

      this.initialisation(employee);
      this.validate();
      this.savePaysLip(employee);
    }

    //console.log(this.listPaysLip);
  }


  generatePaysLip() {


    let index = 0;
    for (const paysLip of this.listPaysLip) {
      const paysLipDOM = document.querySelector('#HTMLPaysLip_' + index.toString());
      html2canvas(paysLipDOM).then(
        canvas => {
          this.jspdf.addPage();
          this.jspdf.setPage(index);
          console.log("Canvas " + canvas);
          console.log("=========================== "+index);
          this.jspdf.addImage(canvas.toDataURL('image/png',0.5), 4, 10);
        }
      );
      index++;


    }

    this.jspdf.autoPrint();
    // jspdf.save("Fiches de Paies du " + new Date().getMonth() + '/' + new Date().getFullYear());
  }

  oKPdf() {
    this.jspdf.save("Fiches de Paies du " + new Date().getMonth() + '/' + new Date().getFullYear());
  }
}
