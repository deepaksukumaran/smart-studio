import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CustomerListTableViewComponent } from './customer-list-table-view/customer-list-table-view.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';
import { CustomerProfileSummaryComponent } from './customer-profile-summary/customer-profile-summary.component';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerListTableViewComponent,
    CustomerProfileComponent,
    CustomerAddEditComponent,
    CustomerProfileSummaryComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    CustomerAddEditComponent
  ]
})
export class CustomerModule { }
