import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionService } from '@shared/services/action.service';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss']
})
export class CustomerAddEditComponent implements OnInit {

  isEditMode: boolean;
  customerDetails: Customer;
  customerFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private actionService: ActionService,
    private dialogRef: MatDialogRef<CustomerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.isEditMode = !actionService.isAllNullOrEmptyObject(data);
    this.customerDetails = data ? data.customer : null;
  }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
    this.bindFormData();
  }

  /* Private Methods */
  private buildForm() {
    this.customerFormGroup = this.formBuilder.group({
      name: new FormControl(null),
      phone: new FormControl(null),
      mobile: new FormControl(null),
      email: new FormControl(null),
      description: new FormControl(null),
      address: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      zip: new FormControl(null),
    });
  }

  private bindFormData() {
    if (!this.isEditMode) { return; }

    this.customerFormGroup.patchValue(this.customerDetails);
  }

  private addCustomer(customer: Customer) {
    customer.createdAt = '2019-11-03';
    customer.createdBy = '28';
    this.customerService.createCustomer(customer).subscribe((data) => {
      this.dialogRef.close(true);
    });
  }

  private updateCustomer(customer: Customer) {

    customer.updatedAt = '2019-11-03';
    customer.updatedBy = '28';

    this.customerService.updateCustomer(customer).subscribe((data) => {
      this.dialogRef.close(true);
    });
  }

  /* Public Methods */
  onCancel() {
    this.dialogRef.close();
  }

  onSave() {

    let customer = new Customer();

    if (!this.isEditMode) {
      customer = this.customerFormGroup.value;
      this.addCustomer(customer);
    } else {
      customer = this.customerDetails;
      customer = Object.assign(customer, this.customerFormGroup.value);
      this.updateCustomer(customer);
    }
  }
}
