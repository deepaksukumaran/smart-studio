import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ModalService } from '@shared/services/modal.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  searchCounter = 0;
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private modalService: ModalService,
    private employeeService: OrderService) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
  }

  /* Private Methods */
  private buildForm() {
    this.searchForm = new FormGroup({
      custName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
    });
  }

  /* Public Methods */
  onSearch() {
    if (this.searchForm.value.custName !== ''
      || this.searchForm.value.phone !== ''
      || this.searchForm.value.email !== '') {
      this.searchCounter++;
    }
  }

  onClearSearch(field: string) {
    switch (field) {
      case 'custName':
        this.searchForm.patchValue({ custName: '' });
        break;
      case 'phone':
        this.searchForm.patchValue({ phone: '' });
        break;
      case 'email':
        this.searchForm.patchValue({ email: '' });
        break;
      default:
        this.searchForm.patchValue({ custName: '', phone: '', email: '', });
        this.searchCounter = 0;
        break;
    }

    if (this.searchCounter > 0) {
      this.searchCounter--;
    }
  }

  addNewOrder() {
    this.router.navigateByUrl(`order/new`);
  }
}
