import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionService } from '@shared/services/action.service';
import { OrderPageDetails } from '../models/order-page-details.model';
import { OrderPage } from '../models/order-page.model';

@Component({
  selector: 'app-order-details-pages',
  templateUrl: './order-details-pages.component.html',
  styleUrls: ['./order-details-pages.component.scss']
})
export class OrderDetailsPagesComponent implements OnInit {

  isEditMode: boolean;
  applyFormGroup: FormGroup;
  pageCount = 100;
  pages: OrderPage[] = [];
  pageTasks: any = [];
  highlitedPages = [];

  constructor(
    private formBuilder: FormBuilder,
    private actionService: ActionService,
    private dialogRef: MatDialogRef<OrderDetailsPagesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.isEditMode = !actionService.isAllNullOrEmptyObject(data);
  }

  ngOnInit() {
    this.initVariables();
    this.buildForm();
  }

  /* Private Methods */
  private initVariables() {

    for (let i = 1; i <= this.pageCount; i++) {
      const page = new OrderPage();
      page.id = i;
      page.isSelected = false;
      page.pageDetails = [];
      this.pages.push(page);
    }
  }

  private buildForm() {
    this.applyFormGroup = new FormGroup({
      type: new FormControl(''),
      value: new FormControl(''),
    });
  }


  private updatePageTask() {
    const selectedPages = this.pages.filter((i) => i.isSelected === true);
    let tags = [];
    this.pages.map((i) => {
      if (i.pageDetails.length > 0) {
        tags = tags.concat(i.pageDetails);
      }
    });

    const mainList = groupBy(tags, 'type');
    let refinedMainList = [];
    for (var mainProp in mainList) {
      if (Object.prototype.hasOwnProperty.call(mainList, mainProp)) {
        let childList = groupBy(mainList[mainProp], 'value');
        let refinedChild = [];
        for (var childProp in childList) {
          if (Object.prototype.hasOwnProperty.call(childList, childProp)) {
            refinedChild.push({ 'type': childProp, 'child': childList[childProp] });
          }
        }
        refinedMainList.push({ 'type': mainProp, 'child': refinedChild });
      }
    }
    this.pageTasks = refinedMainList;
  }

  /* Public Methods */
  togglePageSelection(page: OrderPage) {
    const index = this.pages.findIndex((i) => i.id === page.id);
    page.isSelected = !page.isSelected;
    this.pages[index] = page;
    this.highlitedPages = this.pages.filter((i) => i.isSelected === true);
  }

  onApply() {
    const selectedPages = this.pages.filter((i) => i.isSelected === true);
    const type = this.applyFormGroup.value.type;
    const value = this.applyFormGroup.value.value;
    selectedPages.map((item) => {
      const i = item.pageDetails.findIndex((data) => data.type === type && data.value === value);
      if (i === -1) {
        const pageDetails = new OrderPageDetails();
        pageDetails.pageId = item.id;
        pageDetails.type = type;
        pageDetails.value = value;
        item.pageDetails.push(pageDetails);
      }
    });
    this.updatePageTask();
    this.applyFormGroup.reset();
  }

  onSave() {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}

// Accepts the array and key
const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};
