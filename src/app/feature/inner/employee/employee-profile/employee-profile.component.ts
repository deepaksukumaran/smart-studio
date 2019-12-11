import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  employeeDetails: Employee;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployee();
  }

  private getEmployee() {
    const employeeId = this.activatedRoute.snapshot.paramMap.get('employeeId');
    this.employeeService.getEmployee(parseInt(employeeId, 0))
      .subscribe((data) => {
        this.employeeDetails = data;
      });
  }
}
