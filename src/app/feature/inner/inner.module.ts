import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EmployeeModule } from './employee/employee.module';
import { InnerRoutingModule } from './inner-routing.module';
import { InnerComponent } from './inner.component';
import { JobCardComponent } from './job-card/job-card.component';
import { PipelineComponent } from './pipeline/pipeline.component';

@NgModule({
  declarations: [
    InnerComponent,
    JobCardComponent,
    PipelineComponent,
  ],
  exports: [InnerComponent],
  imports: [
    CommonModule,
    InnerRoutingModule,
    SharedModule,
    DragDropModule,
    LayoutModule,
    EmployeeModule
  ]
})
export class InnerModule { }
