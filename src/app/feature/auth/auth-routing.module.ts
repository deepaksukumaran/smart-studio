import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: AuthComponent,
                children: [
                    {
                        path: 'login',
                        component: LoginComponent,
                    }]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
