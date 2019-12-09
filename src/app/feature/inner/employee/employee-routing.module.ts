import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'all',
                component: EmployeeListComponent,
                data: { breadcrumb: { label: 'All' } }
            },
            {
                path: ':employeeId',
                component: EmployeeProfileComponent,
            }
        ])
    ],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
