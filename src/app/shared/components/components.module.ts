import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MaterialModule } from '../modules/material.module';
import { LabelTextComboComponent } from './label-text-combo/label-text-combo.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { InnerLayoutComponent } from './layout/inner-layout/inner-layout.component';
import { SidenavListComponent } from './layout/sidenav-list/sidenav-list.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    InnerLayoutComponent,
    SidenavListComponent,
    ToolbarComponent,
    LabelTextComboComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PerfectScrollbarModule
  ],
  exports: [
    AuthLayoutComponent,
    InnerLayoutComponent,
    LabelTextComboComponent,
  ]
})
export class ComponentsModule { }
