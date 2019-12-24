import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EmployeeModule } from './employee/employee.module';
import { InnerRoutingModule } from './inner-routing.module';
import { InnerComponent } from './inner.component';

@NgModule({
  declarations: [
    InnerComponent
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
