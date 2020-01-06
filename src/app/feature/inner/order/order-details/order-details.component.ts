import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@shared/services/modal.service';
import { CustomerAddEditComponent } from '../../customer/customer-add-edit/customer-add-edit.component';
import { CustomerLookupComponent } from '../../customer/customer-lookup/customer-lookup.component';
import { Customer } from '../../customer/models/customer.model';
import { Service } from '../../other/models/service.model';
import { OrderDetailsPagesComponent } from '../order-details-pages/order-details-pages.component';
import { ServiceService } from '../../other/service.service';

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
  servicesList: Service[];

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService,
  ) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
    this.getAllServices();
    const orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
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
      // type: new FormControl(''),
      size: new FormControl(''),
      pages: new FormControl(''),
      coverType: new FormControl(''),
      bagType: new FormControl(''),
      notes: new FormControl(''),
    });
  }

  private getAllServices() {
    this.serviceService.getAllServices().subscribe((data) => {
      this.servicesList = data;

      this.orderTypeList = this.servicesList
        .filter((item) => item.type.toLowerCase() === 'parent');

      this.orderTypeList.map((item) => {
        item.child = this.servicesList
          .filter((i) => i.type.toLowerCase() === item.name.toLowerCase());
      });
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
