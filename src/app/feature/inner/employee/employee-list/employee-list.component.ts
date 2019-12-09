import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from 'app/feature/inner/employee/models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[];
  searchCounter = 0;
  searchForm: FormGroup;

  constructor(private employeeService: EmployeeService) { }

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
    this.searchCounter++;
  }
}
