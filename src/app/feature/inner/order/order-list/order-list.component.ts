import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ModalService } from '@shared/services/modal.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  searchCounter = 0;
  searchForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService,
    private employeeService: OrderService) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
  }

  /* Public Methods */
  buildForm() {
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  onSearch() {
    if (this.searchForm.value.firstName !== '' || this.searchForm.value.lastName !== '') {
      this.searchCounter++;
    }
  }

  onClearSearch() {
    this.searchForm.patchValue({
      firstName: '',
      lastName: '',
    });
    this.searchCounter = 0;
  }

  addNewOrder() {
  //   const dialogConfig = this.modalService.setDialogConfig(true, true, '780px');
  //   this.dialog.open(EmployeeAddEditComponent, dialogConfig)
  //     .afterClosed().subscribe(reload => {
  //       if (reload) {
  //         this.searchCounter++;
  //       }
  //     });
  }
}
