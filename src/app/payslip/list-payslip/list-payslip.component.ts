import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from '../../employee/employee-model';

@Component({
  selector: 'app-list-payslip',
  templateUrl: './list-payslip.component.html',
  styleUrls: ['./list-payslip.component.css']
})
export class ListPayslipComponent implements OnInit {
  @Input() employee: EmployeeModel = null;
  constructor() { }

  ngOnInit() {
  }

}
