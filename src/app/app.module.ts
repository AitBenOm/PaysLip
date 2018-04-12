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
import {FormsModule} from '@angular/forms';
import { FilterByNamePipe } from './Shared/filter-by-name.pipe';
import { ProRecordComponent } from './employee/pro-record/pro-record.component';
import {HeaderService} from "./header/header.service";

import { ViewPaysLipComponent } from './payslip/list-payslip/view-pays-lip/view-pays-lip.component';



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


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [EmployeeService, PayslipService, HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
