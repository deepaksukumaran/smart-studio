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
  orderTypeList = [];
  selectedType: any;

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.initVariables();
    this.buildForm();
  }

  /* Private Methods */
  private initVariables() {

    this.orderTypeList = [
      {
        value: 'Printing',
        text: 'Printing',
        child: [
          { value: 'Album', text: 'Album' },
          { value: 'Priniting', text: 'Priniting' },
          { value: 'Enlargement Print', text: 'Enlargement Print' },
          { value: 'Laser Printing', text: 'Laser Printing' },
          { value: 'Canvas Printing', text: 'Canvas Printing' },
        ]
      },
      {
        value: 'Design',
        text: 'Design',
      },
      {
        value: 'Momentous',
        text: 'Momentous',
      },
      {
        value: 'Photo Good',
        text: 'Photo Good',
      },
      {
        value: 'Lamination',
        text: 'Lamination',
        child: [
          { value: 'Print & Lamination', text: 'Print & Lamination' },
          { value: 'Lamination Only', text: 'Lamination Only' },
        ]
      },
      {
        value: 'Accessories',
        text: 'Accessories',
      },
    ];
  }

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
      // type: new FormControl(''),
      size: new FormControl(''),
      pages: new FormControl(''),
      coverType: new FormControl(''),
      bagType: new FormControl(''),
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
    const dialogConfig = this.modalService.setDialogConfig(true, true, '100%', null, 'order-page-details-dialog');
    this.dialog.open(OrderDetailsPagesComponent, dialogConfig)
      .afterClosed().subscribe(data => {

      });
  }

  onTypeSelected(event, type) {

    if (event.isUserInput) {
      this.selectedType = type;
    }

    this.orderForm.patchValue({
      subType: null,
    });
  }

  onSave() {

  }
}
