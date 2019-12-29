import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CustomerAddEditComponent } from '../customer/customer-add-edit/customer-add-edit.component';
import { CustomerLookupComponent } from '../customer/customer-lookup/customer-lookup.component';
import { CustomerModule } from '../customer/customer.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListTableViewComponent } from './order-list-table-view/order-list-table-view.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailsPagesComponent } from './order-details-pages/order-details-pages.component';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderListTableViewComponent,
    OrderDetailsComponent,
    OrderDetailsPagesComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    CustomerModule
  ],
  entryComponents: [
    CustomerLookupComponent,
    CustomerAddEditComponent,
    OrderDetailsPagesComponent
  ]
})
export class OrderModule { }
