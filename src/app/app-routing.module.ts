import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeComponent} from "./employee/employee.component";
import {EmployeeDetailsComponent} from "./employee/employee-details/employee-details.component";
import {EmployeeInfosComponent} from "./employee/employee-infos/employee-infos.component";
import {PayslipComponent} from "./payslip/payslip.component";
import {UpdateEmployeeComponent} from "./employee/update-employee/update-employee.component";

const appRoutes: Routes = [

  { path: '', redirectTo: 'employee-list', pathMatch: 'full' },

  { path: 'employee-list', component: EmployeeComponent },

  { path: 'employee-list', component: EmployeeComponent,
  children:[
    { path: 'employee-details/:id', component: EmployeeDetailsComponent }
  ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
