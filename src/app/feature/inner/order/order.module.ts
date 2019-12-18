import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [NewOrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
  ]
})
export class OrderModule { }
