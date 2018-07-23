import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {EmployeeModel} from '../../employee/employee-model';
import {PayslipService} from '../payslip.service';
import {LabelsRubric} from '../PaysLipToolsShared/labelsRubric';
import {EmployeeService} from "../../employee/employee.service";
import * as html2canvas from 'html2canvas';
import {Rubric} from "../PaysLipToolsShared/rubric";

import {PaysLip} from "../PaysLipToolsShared/PaysLip";
import {isNumeric} from "rxjs/util/isNumeric";
import * as jsPDF from 'jspdf';
import {ActivatedRoute, Router} from "@angular/router";
declare const $: any;
//import * as $ from 'jquery';


@Component({
  selector: 'app-all-pays-lip',
  templateUrl: './all-pays-lip.component.html',
  styleUrls: ['./all-pays-lip.component.css']
})
export class AllPaysLipComponent implements OnInit {

  labels = this.payslipService.labelsVariabls;

  netAPaye: number = 0;
  progress: number = 10;
  netImpo: number = 0;
  totalGains: number = 0;
  totalRetenues: number = 0;
  processStart: boolean = false;
  AMO = 2.28;
  CNSS = 4.29;
  IGR = 1;
  Title = 'HTMLPaysLip_';


  labelRubrics: LabelsRubric[];

  rubricLabels: any;
  jspdf = new jsPDF('p', 'pt', 'a4', true);

  listPaysLip: PaysLip[] = [];
  employees: EmployeeModel[];


  constructor(private payslipService: PayslipService, private employeeService: EmployeeService,private router: Router, private route: ActivatedRoute) {


    console.log("Constructor");
    this.payslipService.paysLipsGenerated.subscribe(
      (generated: boolean) => {
        if (generated) {

          this.oKPdf();
        }

      }
    );
  }

  ngOnInit() {
    this.payslipService.onGenerateAllPaysLip.subscribe(
      (onGenerate: boolean) => {
      //  this.router.navigate(['All PaysLip']);
        this.labels = this.payslipService.labelsVariabls;

        this.saveAllPaysLips(this.employeeService.getListEmployee());

        console.log(this.listPaysLip);

      }
    );

    $('#showAllPaysLip').modal('show');
    if(this.listPaysLip.length===0){
      console.log("OnInit");
      this.labels = this.payslipService.labelsVariabls;

      this.saveAllPaysLips(this.employeeService.getListEmployee());

      console.log(this.listPaysLip);
    }

    this.labelRubrics = [];
    this.labelRubrics = this.payslipService.listRubrique;
    this.rubricLabels = this.payslipService.rubricsTitles;

    this.netAPaye = 0;
    this.netImpo = 0;
    this.totalGains = 0;
    this.totalRetenues = 0;
    // this.labels = this.payslipService.labelsVariabls;



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
  storRubrics(paysLip: PaysLip) {
    const rubrics: Rubric[]=[];
    const totalRet = new Rubric('totalRet', 0, true, this.totalRetenue(), 999, paysLip);
    const totalGain = new Rubric('totalGain', 0, true, this.totalGain(), 999, paysLip);
    const netApaye = new Rubric('netApaye', 0, true, this.netAPaye, 999, paysLip);
    const netImpo = new Rubric('netImpo', 0, true, this.netImpo, 999,paysLip);

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
      const rub = new Rubric(label, this.labels[label]['T'], GainRet, Number(value), this.labels[label]['B'],paysLip);

      rubrics.push(rub);

    }
    rubrics.push(totalGain, totalRet, netApaye, netImpo);
    return rubrics;
  }

  savePaysLip(employee: EmployeeModel) {

    const periode: Date[] = [];
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    periode.push(new Date(y, m, 1), new Date(y, m + 1, 0));
    ////console.log(periode1);
    const paysLip = new PaysLip( employee, periode[0],periode[1]);
    // console.log(paysLip);
    this.payslipService.allPaysLips.push(paysLip);
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
    this.payslipService.allPaysLips=[];
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
   // $('#showAllPaysLip').fadeTo("slow", 0.5);
    console.log("Test Progress Bar");
    this.processStart=true;
    const paysLipsDOM = document.querySelectorAll('.HTMLPaysLip');

    let index = 0;
    this.processStart=true;
    for (const payslip of this.listPaysLip) {
      const paysLipDOM = document.querySelector('#HTMLPaysLip_' + index.toString());
      console.log(paysLipDOM);
      html2canvas(paysLipDOM).then(
        canvas => {

          this.jspdf.setPage(index);
          console.log("Canvas " + canvas.width);

          this.jspdf.addImage(canvas.toDataURL('image/jpeg', 1), 4, 10);
          this.jspdf.addPage();

          this.progress=(this.jspdf.internal.getNumberOfPages()/(paysLipsDOM.length + 1) )*100;
          console.log("Progress "+this.progress);
          if (paysLipsDOM.length + 1 === this.jspdf.internal.getNumberOfPages()) {
            this.payslipService.paysLipsGenerated.next(true);

          }

        }
      );
      index++;


    }


    // this.jspdf.autoPrint();
    // jspdf.save("Fiches de Paies du " + new Date().getMonth() + '/' + new Date().getFullYear());
  }

  oKPdf() {
    $('#showAllPaysLip').fadeIn();
    this.processStart=false;
    this.jspdf.save("Fiches de Paies du " + new Date().getMonth() + '/' + new Date().getFullYear());
  }

  navigateToPaysLip(){
    $('#showAllPaysLip').modal('hide');
    this.router.navigate(['/paysLip']);
  }
}
