import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  employeeList: Customer[];
  searchCounter = 0;
  searchForm: FormGroup;

  constructor(private customerService: CustomerService) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
  }

  /* Public Methods */
  buildForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
    });
  }

  onSearch() {
    this.searchCounter++;
  }
}
