import { Component, OnInit, AfterViewInit, OnChanges, Input, ViewChild, SimpleChanges } from '@angular/core';
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ModalService } from '@shared/services/modal.service';
import { CustomerService } from '../../customer/customer.service';
import { CustomerFilterParams } from '../../customer/models/customer-filter-params.model';
import { Customer } from '../../customer/models/customer.model';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { CustomerAddEditComponent } from '../../customer/customer-add-edit/customer-add-edit.component';

@Component({
  selector: 'app-order-list-table-view',
  templateUrl: './order-list-table-view.component.html',
  styleUrls: ['./order-list-table-view.component.scss']
})
export class OrderListTableViewComponent implements AfterViewInit, OnChanges {

  resultsLength = 0;
  itemPerPage = 10;
  isLoadingResults = true;
  isRateLimitReached = false;
  customerList: Customer[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'phone', 'email', 'actions'];

  @Input() searchCriteria: CustomerFilterParams;
  @Input() searchCounter: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private modalService: ModalService,
    private customerService: CustomerService) { }

  /* Lifecycle Hooks */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchCounter && changes.searchCounter.previousValue !== changes.searchCounter.currentValue) {
      if (this.paginator) { this.paginator.pageIndex = 0; }
      this.getCustomers();
    }
  }

  ngAfterViewInit() {
    this.getCustomers();
  }

  /* Public Methods */
  getCustomers() {
    if (!this.sort) { return; }
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const customerFilterParams = new CustomerFilterParams();
          customerFilterParams.name = this.searchCriteria.name;
          customerFilterParams.mobile = this.searchCriteria.mobile;
          customerFilterParams.page = this.paginator.pageIndex;
          customerFilterParams.size = this.itemPerPage;
          customerFilterParams.sortBy = this.sort.active;
          customerFilterParams.sortDirection = this.sort.direction;
          return this.customerService.getAllCustomers(customerFilterParams);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.customerList = data;
      });
  }

  showCustomerProfile(customerId: number) {
    this.router.navigateByUrl(`customer/${customerId}`);
  }

  editCustomerProfile(customer: Customer) {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px', { customer: customer });
    this.dialog.open(CustomerAddEditComponent, dialogConfig)
      .afterClosed().subscribe(reload => {
        if (reload) {

        }
      });
  }
}
