import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeListComponent} from './employee/employee-list/employee-list.component';
import {EmployeeDetailsComponent} from './employee/employee-details/employee-details.component';
import {AddEmployeeComponent} from './employee/add-employee/add-employee.component';
import {UpdateEmployeeComponent} from './employee/update-employee/update-employee.component';
import {EmployeeService} from './employee/employee.service';
import {PayslipComponent} from './payslip/payslip.component';
import {EmployeeInfosComponent} from './employee/employee-infos/employee-infos.component';
import {FooterComponent} from './footer/footer.component';
import {AppRoutingModule} from './app-routing.module';

import {CurrentPayslipComponent} from './payslip/current-payslip/current-payslip.component';
import {ListPayslipComponent} from './payslip/list-payslip/list-payslip.component';
import {PayslipService} from './payslip/payslip.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterByNamePipe } from './Shared/filter-by-name.pipe';
import { ProRecordComponent } from './employee/pro-record/pro-record.component';
import {HeaderService} from "./header/header.service";

import { ViewPaysLipComponent } from './payslip/list-payslip/view-pays-lip/view-pays-lip.component';
import { HomeComponent } from './home/home.component';
import { FilterByDatePipe } from './Shared/filter-by-date.pipe';
import {AllPaysLipComponent} from "./payslip/all-pays-lip/all-pays-lip.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressBarModule, MatProgressSpinnerModule} from "@angular/material";
import { StudentComponent } from './student/student.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { UpdateStudentComponent } from './student/update-student/update-student.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { StudentInfosComponent } from './student/student-infos/student-infos.component';
import {StudentService} from "./student/student.service";
import { AdministrationComponent } from './administration/administration.component';
import { LevelsComponent } from './administration/levels/levels.component';
import { FonctionsComponent } from './administration/fonctions/fonctions.component';
import { ServicesComponent } from './administration/services/services.component';
import {AdministrationService} from "./administration/administration.service";
import {HttpClient, HttpClientModule} from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    PayslipComponent,
    EmployeeInfosComponent,
    FooterComponent,

    CurrentPayslipComponent,
    ListPayslipComponent,
    FilterByNamePipe,
    ProRecordComponent,

    ViewPaysLipComponent,

    HomeComponent,

    FilterByDatePipe,
    AllPaysLipComponent,
    StudentComponent,
    AddStudentComponent,
    StudentListComponent,
    UpdateStudentComponent,
    StudentDetailsComponent,
    StudentInfosComponent,
    AdministrationComponent,
    LevelsComponent,
    FonctionsComponent,
    ServicesComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     ReactiveFormsModule, // <-- #2 add to @NgModule imports
    BrowserAnimationsModule,
    MatProgressBarModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [EmployeeService, PayslipService, HeaderService, StudentService, AdministrationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
