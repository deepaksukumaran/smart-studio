import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsViewComponent } from './order-details-view/order-details-view.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'all',
                component: OrderListComponent,
                data: { breadcrumb: 'All' }
            },
            {
                path: 'new',
                component: OrderDetailsComponent,
                data: { breadcrumb: 'New' }
            },
            {
                path: ':orderId',
                component: OrderDetailsComponent,
                data: { breadcrumb: 'orderId' }
            },
            {
                path: ':orderId/view',
                component: OrderDetailsViewComponent,
                data: { breadcrumb: 'orderId' }
            },
        ])
    ],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
