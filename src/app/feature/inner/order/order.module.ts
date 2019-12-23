import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
  ]
})
export class OrderModule { }
