import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListTableViewComponent } from './order-list-table-view/order-list-table-view.component';
import { JobCardComponent } from './job-card/job-card.component';

@NgModule({
  declarations: [OrderListComponent, OrderListTableViewComponent, JobCardComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
  ]
})
export class OrderModule { }
