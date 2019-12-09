import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../customer.service';
import { CustomerFilterParams } from '../models/customer-filter-params.model';

@Component({
  selector: 'app-customer-list-table-view',
  templateUrl: './customer-list-table-view.component.html',
  styleUrls: ['./customer-list-table-view.component.scss']
})
export class CustomerListTableViewComponent implements AfterViewInit, OnChanges {

  resultsLength = 0;
  itemPerPage = 10;
  isLoadingResults = true;
  isRateLimitReached = false;
  customerList: Customer[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'email'];

  @Input() searchCriteria: CustomerFilterParams;
  @Input() searchCounter: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
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
          customerFilterParams.page = this.paginator.pageIndex;
          customerFilterParams.size = this.itemPerPage;
          customerFilterParams.sortBy = this.sort.active;
          return this.customerService.getAllCustomers(customerFilterParams);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          // this.resultsLength = data.totalElements;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.customerList = data
      });
  }

  showCustomerProfile(customerId: number) {
    this.router.navigateByUrl(`customer/${customerId}`);
  }
}
