import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'all',
                component: OrderListComponent,
                data: { breadcrumb: { label: 'All' } }
            },
        ])
    ],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
