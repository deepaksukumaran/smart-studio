import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActionService } from '@shared/services/action.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Customer } from '../../models/customer.model';

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

  /* Public Methods */
  buildForm() {
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

  bindFormData() {
    if (!this.isEditMode) { return; }

    this.customerFormGroup.patchValue(this.customerDetails);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close();
  }
}
