import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActionService } from '@shared/services/action.service';
import { ModalService } from '@shared/services/modal.service';
import { EmployeeAddEditComponent } from '../employee-add-edit/employee-add-edit.component';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-profile-summary',
  templateUrl: './employee-profile-summary.component.html',
  styleUrls: ['./employee-profile-summary.component.scss']
})
export class EmployeeProfileSummaryComponent implements OnInit {

  @Input() employeeDetails: Employee;

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService,
    private actionService: ActionService,
  ) { }

  /* Lifecycle Hooks */
  ngOnInit() {
  }

  /* Public Methods */
  editEmployeeProfile(employee: Employee) {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px', { employee: this.employeeDetails });
    this.dialog.open(EmployeeAddEditComponent, dialogConfig)
      .afterClosed().subscribe(reload => {
        if (reload) {
          // this.getEmployees();
        }
      });
  }

  getEmployeeAddress() {
    if (this.employeeDetails && this.employeeDetails.addresses.length > 0) {
      const address = this.employeeDetails.addresses[0];
      return [
        this.actionService.getEmptyIfNull(address.address1),
        this.actionService.getEmptyIfNull(address.address2),
        this.actionService.getEmptyIfNull(address.city),
        this.actionService.getEmptyIfNull(address.zip)
      ]
        .filter(Boolean)
        .join(', ');
    } else {
      return '';
    }
  }

  getEmployeePositions() {
    if (this.employeeDetails && this.employeeDetails.positions.length > 0) {
      const positions = this.employeeDetails.positions.map((p) => p.name);
      return positions
        .filter(Boolean)
        .join(', ');
    } else {
      return '';
    }
  }
}
