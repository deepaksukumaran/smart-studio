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
                        loadChildren: './employee/employee.module#EmployeeModule'
                    },
                    {
                        path: 'customer',
                        loadChildren: './customer/customer.module#CustomerModule'
                    },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class InnerRoutingModule { }
