import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: AuthComponent,
                children: [
                    {
                        path: 'login',
                        component: LoginComponent,
                    },
                    {
                        path: '**',
                        redirectTo: 'login'
                    },
                ]
            },
        ])
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
