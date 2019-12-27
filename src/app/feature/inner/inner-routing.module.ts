import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InnerComponent } from './inner.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: InnerComponent,
                children: [
                    {
                        path: 'employee',
                        loadChildren: './employee/employee.module#EmployeeModule',
                        data: { breadcrumb: 'Employees' }
                    },
                    {
                        path: 'customer',
                        loadChildren: './customer/customer.module#CustomerModule',
                        data: { breadcrumb: 'Customers' }
                    },
                    {
                        path: 'order',
                        loadChildren: './order/order.module#OrderModule',
                        data: { breadcrumb: 'Orders' }
                    },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class InnerRoutingModule { }
