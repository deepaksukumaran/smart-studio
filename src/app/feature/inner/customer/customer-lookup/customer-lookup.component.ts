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
  itemPerPage = 10;
  isLoadingResults = true;
  isRateLimitReached = false;
  searchCounter = 0;
  searchForm: FormGroup;
  customerList: Customer[];
  displayedColumns: string[] = ['name', 'mobile', 'phone', 'email', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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
    this.dataSource.paginator = this.paginator;
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


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];