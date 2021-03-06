import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActionService } from '@shared/services/action.service';
import { ModalService } from '@shared/services/modal.service';
import { CustomerAddEditComponent } from '../customer-add-edit/customer-add-edit.component';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-profile-summary',
  templateUrl: './customer-profile-summary.component.html',
  styleUrls: ['./customer-profile-summary.component.scss']
})
export class CustomerProfileSummaryComponent implements OnInit {

  @Input() customerDetails: Customer;

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService,
    private actionService: ActionService,
  ) { }

  ngOnInit() {
  }

  /* Public Methods */
  editCustomerProfile(customer: Customer) {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px', { customer: this.customerDetails });
    this.dialog.open(CustomerAddEditComponent, dialogConfig)
      .afterClosed().subscribe(reload => {
        if (reload) {

        }
      });
  }

  getCustomerAddress() {
    if (this.customerDetails) {
      return [
        this.actionService.getEmptyIfNull(this.customerDetails.address),
        this.actionService.getEmptyIfNull(this.customerDetails.city),
        this.actionService.getEmptyIfNull(this.customerDetails.zip)
      ]
        .filter(Boolean)
        .join(', ');
    } else {
      return '';
    }
  }

}
