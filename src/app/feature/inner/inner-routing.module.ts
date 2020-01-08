import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InnerComponent } from './inner.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';

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
            },
            {
                path: '**',
                redirectTo: 'auth/login'
            },
        ])
    ],
    exports: [RouterModule]
})
export class InnerRoutingModule { }
