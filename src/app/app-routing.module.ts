import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeComponent} from "./employee/employee.component";
import {EmployeeDetailsComponent} from "./employee/employee-details/employee-details.component";
import {EmployeeInfosComponent} from "./employee/employee-infos/employee-infos.component";
import {PayslipComponent} from "./payslip/payslip.component";
import {UpdateEmployeeComponent} from "./employee/update-employee/update-employee.component";
import {HomeComponent} from "./home/home.component";
import {CurrentPayslipComponent} from "./payslip/current-payslip/current-payslip.component";
import {AddEmployeeComponent} from "./employee/add-employee/add-employee.component";
import {AllPaysLipComponent} from "./payslip/all-pays-lip/all-pays-lip.component";
import {StudentComponent} from "./student/student.component";
import {StudentDetailsComponent} from "./student/student-details/student-details.component";

const appRoutes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },


  { path: 'home', component: HomeComponent },
  { path: 'All PaysLip', component: AllPaysLipComponent },
  { path: 'Ajout nouveau salarie', component: AddEmployeeComponent },
  { path: 'paysLip', component: PayslipComponent, children: [
    { path: 'employee-details/:id', component: PayslipComponent }
] },
  { path: 'employee-list', component: EmployeeComponent,
  children:[
    { path: 'employee-details/:id', component: EmployeeDetailsComponent }
  ]
  },
  { path: 'student-list', component: StudentComponent,
  children:[
    { path: 'student-list/:id', component: StudentDetailsComponent }
  ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
