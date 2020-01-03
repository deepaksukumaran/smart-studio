import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ModalService } from '@shared/services/modal.service';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CustomerAddEditComponent } from '../../customer/customer-add-edit/customer-add-edit.component';
import { CustomerFilterParams } from '../../customer/models/customer-filter-params.model';
import { Customer } from '../../customer/models/customer.model';
import { Order } from '../models/order';
import { OrderFilterParams } from '../models/order-filter-params.model';
import { OrderService } from '../order.service';

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
  orderList: Order[] = [];
  displayedColumns: string[] = ['customerName', 'phone', 'email', 'actions'];

  @Input() searchCriteria: OrderFilterParams;
  @Input() searchCounter: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private modalService: ModalService,
    private orderService: OrderService) { }

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
          const orderFilterParams = new OrderFilterParams();
          orderFilterParams.custName = this.searchCriteria.custName;
          orderFilterParams.phone = this.searchCriteria.phone;
          orderFilterParams.email = this.searchCriteria.phone;
          orderFilterParams.dueDate = '2019-12-24T04:18:22.750Z';
          orderFilterParams.present = this.searchCriteria.phone;
          orderFilterParams.priority = this.searchCriteria.phone;
          orderFilterParams.status = this.searchCriteria.phone;
          orderFilterParams.page = this.paginator.pageIndex;
          orderFilterParams.size = this.itemPerPage;
          orderFilterParams.sortBy = this.sort.active;
          orderFilterParams.sortDirection = this.sort.direction;
          return this.orderService.getAllOrders(orderFilterParams);
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
        this.orderList = data;
      });
  }

  showOrderProfile(orderId: number) {
    // this.router.navigateByUrl(`order/${orderId}`);
  }
}
