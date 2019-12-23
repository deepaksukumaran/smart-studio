import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InnerComponent } from './inner.component';
import { JobCardComponent } from './order/job-card/job-card.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: InnerComponent,
                children: [
                    {
                        path: 'employee',
                        loadChildren: './employee/employee.module#EmployeeModule',
                        data: { breadcrumb: { label: 'Employee' } }
                    },
                    {
                        path: 'customer',
                        loadChildren: './customer/customer.module#CustomerModule'
                    },
                    {
                        path: 'order',
                        loadChildren: './order/order.module#OrderModule'
                    },
                    {
                        path: 'order/:orderId',
                        component: JobCardComponent
                    },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class InnerRoutingModule { }
