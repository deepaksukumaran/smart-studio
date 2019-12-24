import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { JobCardComponent } from './job-card/job-card.component';

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
                component: JobCardComponent,
                data: { breadcrumb: { label: 'All' } }
            },
        ])
    ],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
