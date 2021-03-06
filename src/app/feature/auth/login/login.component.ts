import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFailed = false;
  loginForm: FormGroup;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
    this.authService.resetSession();
  }

  /* Private Methods */
  private buildForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /* Public Methods */
  login() {
    if (this.loginForm.invalid) { return; }
    this.authService.validateUser(this.loginForm.value)
      .subscribe(
        (response) => {
          if (response.token) {
            localStorage.setItem(':jwt', response.token);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.loginFailed = true;
        }
      );
  }
}
