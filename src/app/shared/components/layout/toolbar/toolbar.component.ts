import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/feature/auth/auth.service';
import { EmployeeAuthorities } from 'app/feature/inner/employee/models/employee-authorities.model';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleLeftNav: EventEmitter<any> = new EventEmitter();

  loggedInUser: EmployeeAuthorities;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
  ) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.authService.employeeAuthorities$.subscribe((data) => {
      this.loggedInUser = data;
    });
  }

  /* Public Methods */
  toggleNeftNav() {
    this.toggleLeftNav.emit();
  }

  logout() {
    this.router.navigateByUrl('auth/login');
  }
}
