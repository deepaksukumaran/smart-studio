import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EmployeeListTableViewComponent } from './employee-list-table-view/employee-list-table-view.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeProfileSummaryComponent } from './employee-profile-summary/employee-profile-summary.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeListTableViewComponent,
    EmployeeProfileComponent,
    EmployeeProfileSummaryComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
  ],
  exports: [
    EmployeeListComponent,
    EmployeeListTableViewComponent,
    EmployeeProfileComponent,
    EmployeeProfileSummaryComponent
  ],
})
export class EmployeeModule { }
