import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './feature/inner/inner.module#InnerModule',
    data: { breadcrumb: { label: 'Home' } }
  },
  {
    path: 'auth',
    loadChildren: './feature/auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
