import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'all',
                component: OrderListComponent,
                data: { breadcrumb: { label: 'All' } }
            },
            {
                path: 'new',
                component: OrderDetailsComponent,
                data: { breadcrumb: { label: 'All' } }
            },
        ])
    ],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
