import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FormBuilder } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private actionService: ActionService,
    private dialogRef: MatDialogRef<CustomerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.isEditMode = !actionService.isAllNullOrEmptyObject(data);
    this.customerDetails = data ? data.employee : null;
  }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close();
  }
}
