import { Component, OnInit } from '@angular/core';
import { CustomerAddEditComponent } from '../../customer/customer-add-edit/customer-add-edit.component';
import { ModalService } from '@shared/services/modal.service';
import { MatDialog } from '@angular/material';
import { Customer } from '../../customer/models/customer.model';
import { CustomerLookupComponent } from '../../customer/customer-lookup/customer-lookup.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  customer: Customer;
  orderForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  /* Private Methods */
  private buildForm() {
    this.orderForm = new FormGroup({
      customerName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      type: new FormControl(''),
      subType: new FormControl(''),
      dueDate: new FormControl(''),
      priority: new FormControl(''),
      notes: new FormControl(''),
    });
  }

  /* Public Methods */
  lookupCustomer() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px');
    this.dialog.open(CustomerLookupComponent, dialogConfig)
      .afterClosed().subscribe(customer => {
        if (customer) {
          debugger;
          this.customer = customer;
        }
      });
  }

  addCustomer() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px');
    this.dialog.open(CustomerAddEditComponent, dialogConfig)
      .afterClosed().subscribe(customer => {
        if (customer) {
          this.customer = customer;
        }
      });
  }

  setContactAsCustomer() {
    this.orderForm.patchValue({
      customerName: this.customer.name,
      phone: this.customer.phone,
      email: this.customer.email,
    });
  }
}
