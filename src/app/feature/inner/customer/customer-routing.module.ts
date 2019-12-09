import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'all',
                component: CustomerListComponent,
            },
            {
                path: ':customerId',
                component: CustomerProfileComponent,
            }
        ])
    ],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
