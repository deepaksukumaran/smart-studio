import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionService } from '@shared/services/action.service';
import { EmployeeConstants } from '../employee-constatnts';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {

  isEditMode: boolean;
  employeeDetails: Employee;
  employeeFormGroup: FormGroup;
  genderList = EmployeeConstants.genderList;
  stateList = EmployeeConstants.stateList;

  private get addresses(): FormArray { return this.employeeFormGroup.get('addresses') as FormArray; }

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private actionService: ActionService,
    private dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.isEditMode = !actionService.isAllNullOrEmptyObject(data);
    this.employeeDetails = data ? data.employee : null;
  }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
    this.bindFormData();
  }

  /* Private Methods */
  private buildForm() {
    this.employeeFormGroup = this.formBuilder.group({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      gender: new FormControl(null),
      dob: new FormControl('1985-11-03'),
      phone: new FormControl(null),
      email: new FormControl(null),
      addresses: this.formBuilder.array([]),
    });

    if (!this.isEditMode) {
      this.buildAddressForm();
    }
  }

  private buildAddressForm() {
    this.addresses.push(
      this.formBuilder.group({
        id: new FormControl(null),
        address1: new FormControl(null),
        address2: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null),
        zip: new FormControl(null),
        landmark: new FormControl(null),
      })
    );
  }

  private bindFormData() {
    if (!this.isEditMode) { return; }

    this.employeeDetails.addresses.forEach(x => {
      this.buildAddressForm();
    });

    if (this.employeeDetails.addresses.length === 0) {
      this.buildAddressForm();
    }

    this.employeeFormGroup.patchValue(this.employeeDetails);
  }

  private addEmployee(employee: Employee) {
    employee.doj = '2019-11-03';
    employee.createdAt = '2019-11-03';
    employee.createdBy = '28';
    employee.userName = this.employeeFormGroup.value.firstName + '@123';
    employee.password = 'password';
    employee.addresses = [];
    employee.positions = [];

    this.employeeService.createEmployee(employee).subscribe((data) => {
      this.dialogRef.close(true);
    });
  }

  private updateEmployee(employee: Employee) {

    employee.updatedAt = '2019-11-03';
    employee.updatedBy = '28';

    this.employeeService.updateEmployee(employee).subscribe((data) => {
      this.dialogRef.close(true);
    });
  }

  /* Public Methods */
  onCancel() {
    this.dialogRef.close(false);
  }

  onSave() {

    let employee = new Employee();

    if (!this.isEditMode) {
      employee = this.employeeFormGroup.value;
      this.addEmployee(employee);
    } else {
      employee = this.employeeDetails;
      employee = Object.assign(employee, this.employeeFormGroup.value);
      this.updateEmployee(employee);
    }
  }
}
