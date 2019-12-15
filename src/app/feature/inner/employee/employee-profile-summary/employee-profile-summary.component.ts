import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../models/employee.model';
import { MatDialog } from '@angular/material';
import { ModalService } from '@shared/services/modal.service';
import { EmployeeAddEditComponent } from '../employee-add-edit/employee-add-edit.component';

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
}
