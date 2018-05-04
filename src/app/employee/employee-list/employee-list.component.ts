import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {EmployeeModel} from "../employee-model";
import {HeaderService} from "../../header/header.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PayslipService} from "../../payslip/payslip.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  searchableField: string[];
  keyWord: string;
  hideListe: boolean = true;
  @Input() employee: EmployeeModel = null;
  @Output() employeeSelected = new EventEmitter<EmployeeModel>();

  constructor(private employeeService: EmployeeService, private headerService: HeaderService, private router: Router, private route: ActivatedRoute, private paysLipService: PayslipService) {

    this.searchableField = [
      'nom', 'prenom', 'matricule'
    ];
  }

  employees: EmployeeModel[];


  ngOnInit() {
    console.log(this.route.toString().split("'")[1]);
    this.headerService.onShowList.subscribe(
      (data: boolean) => {
        this.hideListe = data;
      }
    );
    this.employeeService.onKewWordChanged.subscribe(
      (data: string) => {
        this.keyWord = data;
      }
    );
    this.employees = this.employeeService.getListEmployee();
  }

  getEmployee(employee: EmployeeModel) {
    console.log(employee);
    this.keyWord = employee.nom;
    this.employeeSelected.emit(employee);

  }

  onSearch() {
    this.employeeService.onKewWordChanged.emit(this.keyWord);
  }

  cleanUpInput() {
    this.keyWord = '';
    this.employeeService.onKewWordChanged.next('');
    console.log((this.router.url).split('/'));
    if ((this.router.url).split('/')[1] === 'paysLip') {
      this.router.navigate(['paysLip']);
    } else {
      this.router.navigate(['employee-list']);
    }

  }
  testUrl(){
    console.log(this.route.toString().split("'"));
    return this.route.toString().split("'")[1]==='paysLip';
  }
  generateAllPaysLip(){
    console.log('onClick generate ALL');
    this.router.navigate(['All PaysLip']);
   // this.paysLipService.onGenerateAllPaysLip.next(true);

  }
}
