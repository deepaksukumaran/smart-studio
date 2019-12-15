import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ModalService } from '@shared/services/modal.service';
import { CustomerAddEditComponent } from '../customer-add-edit/customer-add-edit.component';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  employeeList: Customer[];
  searchCounter = 0;
  searchForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private modalService: ModalService, ) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
  }

  /* Public Methods */
  buildForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      mobile: new FormControl(''),
    });
  }

  onSearch() {
    if (this.searchForm.value.name !== '' || this.searchForm.value.mobile !== '') {
      this.searchCounter++;
    }
  }

  onClearSearch() {
    this.searchForm.patchValue({
      name: '',
      mobile: '',
    });
    this.searchCounter = 0;
  }

  addNewCustomer() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px');
    this.dialog.open(CustomerAddEditComponent, dialogConfig)
      .afterClosed().subscribe(reload => {
        if (reload) {
          this.searchCounter++;
        }
      });
  }
}
