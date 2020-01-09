import { Component } from '@angular/core';
import { AuthService } from './feature/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    // this.getLoggedInUserAuthorities();
  }

  /*Public Methods */
  getLoggedInUserAuthorities() {
    // this.authService.getEmployeeAuthorities();
  }
}
