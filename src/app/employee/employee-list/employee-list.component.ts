import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {EmployeeModel} from "../employee-model";
import {HeaderService} from "../../header/header.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  searchableField: string[];
  keyWord: string;
  hideListe: boolean = true;

  constructor(private employeeService: EmployeeService, private headerService: HeaderService) {

    this.searchableField = [
      'nom', 'prenom', 'matricule'
    ];
  }

  employees: EmployeeModel[];

  ngOnInit() {
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

  hideList(matricule: number) {
    this.keyWord= matricule.toString();

  }
}
