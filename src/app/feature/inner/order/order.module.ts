import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListTableViewComponent } from './order-list-table-view/order-list-table-view.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderListTableViewComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
  ]
})
export class OrderModule { }
