import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-profile-summary',
  templateUrl: './employee-profile-summary.component.html',
  styleUrls: ['./employee-profile-summary.component.scss']
})
export class EmployeeProfileSummaryComponent implements OnInit {

  @Input() employeeDetails: Employee;

  constructor() { }

  ngOnInit() {
  }

}
