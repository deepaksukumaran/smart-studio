import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { InnerComponent } from './inner.component';
import { JobCardComponent } from './job-card/job-card.component';
import { PipelineComponent } from './pipeline/pipeline.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: InnerComponent,
                children: [
                    {
                        path: 'orders',
                        component: PipelineComponent,
                    },
                    {
                        path: 'orders/new',
                        component: JobCardComponent,
                    },
                    {
                        path: 'orders/:orderId',
                        component: JobCardComponent,
                    },
                    {
                        path: 'employees',
                        component: EmployeeListComponent,
                    },
                    {
                        path: 'employees/:employeeId',
                        component: EmployeeProfileComponent,
                    },
                    {
                        path: 'drag-drop',
                        component: DragDropComponent,
                    }]
            }
        ])
    ],
    exports: [RouterModule]
})
export class InnerRoutingModule { }
