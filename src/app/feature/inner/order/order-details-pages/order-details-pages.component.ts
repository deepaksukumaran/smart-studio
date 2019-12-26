import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ActionService } from '@shared/services/action.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-order-details-pages',
  templateUrl: './order-details-pages.component.html',
  styleUrls: ['./order-details-pages.component.scss']
})
export class OrderDetailsPagesComponent implements OnInit {

  isEditMode: boolean;
  orderPagesFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private actionService: ActionService,
    private dialogRef: MatDialogRef<OrderDetailsPagesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.isEditMode = !actionService.isAllNullOrEmptyObject(data);
  }

  ngOnInit() {
    this.buildForm();
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /* Private Methods */
  private buildForm() {
    this.orderPagesFormGroup = new FormGroup({});
  }

  /* Public Methods */
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
];