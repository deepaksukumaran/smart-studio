import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { EmployeeConstants } from '../employee-constatnts';
import { EmployeeService } from '../employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActionService } from '@shared/services/action.service';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {

  isEditMode: boolean;
  employeeId: number;
  employeeDetails: Employee;
  employeeFormGroup: FormGroup;
  genderList = EmployeeConstants.genderList;
  stateList = EmployeeConstants.stateList;
  countryList = EmployeeConstants.countryList;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private actionService: ActionService,
    private dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.isEditMode = !actionService.isAllNullOrEmptyObject(data);
    this.employeeId = data ? data.employeeId : null;
  }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.initVariables();
    this.buildForm();
    this.getEmployee();
  }

  /* Private Methods */
  private initVariables() {

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
    if (!this.employeeId) { return; }
    this.employeeService.getEmployee(this.employeeId)
      .subscribe((data) => {
        this.employeeDetails = data;
        this.employeeFormGroup.patchValue(this.employeeDetails);
      });
  }

  private addNewEmployee(employee: Employee) {
    employee.doj = "2019-11-03";
    employee.createdAt = "2019-11-03";
    employee.createdBy = "28";
    employee.userName = this.employeeFormGroup.value.firstName + '@123';
    employee.password = "password";

    this.employeeService.createEmployee(employee).subscribe((data) => {
      this.dialogRef.close(true);
    });
  }

  private updateEmployee(employee: Employee) {
    employee.id = this.employeeId;
    employee.updatedAt = "2019-11-03";
    employee.updatedBy = "28";
    employee.userName = this.employeeFormGroup.value.firstName + '@123';
    employee.password = "password";

    this.employeeService.updateEmployee(employee).subscribe((data) => {
      this.dialogRef.close(true);
    });
  }

  /* Public Methods */
  onCancel() {
    this.dialogRef.close(false);
  }

  onSave() {

    let employee = new Employee;
    employee = this.employeeFormGroup.value;

    if (!this.employeeId) {
      this.addNewEmployee(employee);
    } else {
      this.updateEmployee(employee);
    }
  }
}
