import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  customerDetails: Customer;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.getEmployee();
  }

  private getEmployee() {
    const customerId = this.activatedRoute.snapshot.paramMap.get('customerId');
    this.customerService.getCustomer(parseInt(customerId, 0))
      .subscribe((data) => {
        this.customerDetails = data;
      });
  }
}
