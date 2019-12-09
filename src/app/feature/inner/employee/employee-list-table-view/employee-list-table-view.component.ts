import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EmployeeFilterParams } from '@shared/models/employee/employee-filter-params.model';
import { Employee } from '@shared/models/employee/employee.model';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list-table-view',
  templateUrl: './employee-list-table-view.component.html',
  styleUrls: ['./employee-list-table-view.component.scss']
})
export class EmployeeListTableViewComponent implements AfterViewInit, OnChanges {

  resultsLength = 0;
  itemPerPage = 10;
  isLoadingResults = true;
  isRateLimitReached = false;
  employeeList: Employee[] = [];
  displayedColumns: string[] = ['firstName', 'gender', 'doj'];

  @Input() searchCriteria: EmployeeFilterParams;
  @Input() searchCounter: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private employeeService: EmployeeService) { }

  /* Lifecycle Hooks */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchCounter && changes.searchCounter.previousValue !== changes.searchCounter.currentValue) {
      if (this.paginator) { this.paginator.pageIndex = 0; }
      this.getEmployees();
    }
  }

  ngAfterViewInit() {
    this.getEmployees();
  }

  /* Public Methods */
  getEmployees() {
    if (!this.sort) { return; }
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const employeeFilterParams = new EmployeeFilterParams();
          employeeFilterParams.firstName = this.searchCriteria.firstName;
          employeeFilterParams.lastName = this.searchCriteria.lastName;
          employeeFilterParams.page = this.paginator.pageIndex;
          employeeFilterParams.size = this.itemPerPage;
          employeeFilterParams.sortBy = this.sort.active;
          return this.employeeService.getAllEmployees(employeeFilterParams);
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
      ).subscribe(data => this.employeeList = data);
  }

  showEmployeeProfile(employeeId: number) {
    this.router.navigateByUrl(`employees/${employeeId}`);
  }
}
