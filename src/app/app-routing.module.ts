import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './feature/auth/auth.module#AuthModule'
  },
  {
    path: '',
    loadChildren: './feature/inner/inner.module#InnerModule',
    data: { breadcrumb: 'Home' }
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
