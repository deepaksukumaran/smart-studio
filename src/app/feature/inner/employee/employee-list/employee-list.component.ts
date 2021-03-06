import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ModalService } from '@shared/services/modal.service';
import { EmployeeAddEditComponent } from '../employee-add-edit/employee-add-edit.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  searchCounter = 0;
  searchForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService,
    private employeeService: EmployeeService) { }

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
    if (this.searchForm.value.firstName !== '' || this.searchForm.value.lastName !== '') {
      this.searchCounter++;
    }
  }

  onClearSearch(field: string) {
    switch (field) {
      case 'firstName':
        this.searchForm.patchValue({ firstName: '' });
        break;
      case 'lastName':
        this.searchForm.patchValue({ lastName: '' });
        break;
      default:
        this.searchForm.patchValue({ firstName: '', lastName: '', });
        this.searchCounter = 0;
        break;
    }

    if (this.searchCounter > 0) {
      this.searchCounter--;
    }
  }

  addNewEmployee() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px');
    this.dialog.open(EmployeeAddEditComponent, dialogConfig)
      .afterClosed().subscribe(reload => {
        if (reload) {
          this.searchCounter++;
        }
      });
  }
}
