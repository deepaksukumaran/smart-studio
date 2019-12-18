import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'new',
                component: NewOrderComponent,
                data: { breadcrumb: { label: 'New' } }
            },
            // {
            //     path: ':employeeId',
            //     component: EmployeeProfileComponent,
            // }
        ])
    ],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
