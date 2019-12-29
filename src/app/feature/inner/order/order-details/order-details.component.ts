import { Component, OnInit } from '@angular/core';
import { CustomerAddEditComponent } from '../../customer/customer-add-edit/customer-add-edit.component';
import { ModalService } from '@shared/services/modal.service';
import { MatDialog } from '@angular/material';
import { Customer } from '../../customer/models/customer.model';
import { CustomerLookupComponent } from '../../customer/customer-lookup/customer-lookup.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderDetailsPagesComponent } from '../order-details-pages/order-details-pages.component';

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
      customerName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null,
        [Validators.pattern('[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      type: new FormControl(null, [Validators.required]),
      subType: new FormControl(null, [Validators.required]),
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

  configurePages() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '100%', null, 'full-width-dialog');
    this.dialog.open(OrderDetailsPagesComponent, dialogConfig)
      .afterClosed().subscribe(data => {

      });
  }

  onSave() {

  }
}
