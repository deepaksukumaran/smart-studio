import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CustomerService } from '../customer.service';
import { ActionService } from '@shared/services/action.service';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { CustomerFilterParams } from '../models/customer-filter-params.model';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-lookup',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['./customer-lookup.component.scss']
})
export class CustomerLookupComponent implements OnInit {

  resultsLength = 0;
  itemPerPage = 5;
  isLoadingResults = true;
  isRateLimitReached = false;
  searchCounter = 0;
  searchForm: FormGroup;
  customerList: Customer[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'phone', 'email', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private actionService: ActionService,
    private dialogRef: MatDialogRef<CustomerLookupComponent>
  ) {

  }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
  }

  /* Private Methods */
  private buildForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      mobile: new FormControl(''),
    });
  }

  private getCustomers() {
    if (!this.sort) { return; }
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const customerFilterParams = new CustomerFilterParams();
          customerFilterParams.name = this.searchForm.value.name;
          customerFilterParams.mobile = this.searchForm.value.mobile;
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

  /* Public Methods */
  onSearch() {
    if (this.searchForm.value.name !== '' || this.searchForm.value.mobile !== '') {
      this.searchCounter++;
      this.getCustomers();
    }
  }

  onClearSearch() {
    this.searchForm.patchValue({
      name: '',
      mobile: '',
    });
    this.searchCounter = 0;
  }

  attachCustomerToOrder(customer: Customer) {
    this.dialogRef.close(customer);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {
    this.dialogRef.close(null);
  }
}
