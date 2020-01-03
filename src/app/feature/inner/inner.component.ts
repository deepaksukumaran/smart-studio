import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee/employee.service';

@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.scss']
})
export class InnerComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.getLoggedInUserAuthorities();
  }

  /*Public Methods */
  getLoggedInUserAuthorities() {
    this.employeeService.getEmployeeAuthorities();
  }
}
