import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';
import { EmployeeConstants } from '../employee-constatnts';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  isEditMode: boolean;
  employeeDetails: Employee;
  employeeFormGroup: FormGroup;
  genderList = EmployeeConstants.genderList;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.initVariables();
    this.buildForm();
    this.getEmployee();
  }

  private initVariables() {
    const employeeId = this.activatedRoute.snapshot.paramMap.get('employeeId');
    this.isEditMode = employeeId !== null;
  }

  private buildForm() {
    this.employeeFormGroup = this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      gender: new FormControl(''),
      dob: new FormControl(''),
    });
  }

  private getEmployee() {
    const employeeId = this.activatedRoute.snapshot.paramMap.get('employeeId');
    this.employeeService.getEmployee(parseInt(employeeId, 0))
      .subscribe((data) => {
        this.employeeDetails = data;
        this.employeeFormGroup.patchValue(this.employeeDetails);
      });
  }
}
