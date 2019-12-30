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
  pageNumbers: string;

  constructor(
    private formBuilder: FormBuilder,
    private actionService: ActionService,
    private dialogRef: MatDialogRef<OrderDetailsPagesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.isEditMode = !actionService.isAllNullOrEmptyObject(data);
  }

  /* Lifecycle Hooks */
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
      type: new FormControl(null),
      value: new FormControl(null),
      clearOnApply: new FormControl(false),
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

    const mainList = this.actionService.groupBy(tags, 'type');
    let refinedMainList = [];
    for (var mainProp in mainList) {
      if (Object.prototype.hasOwnProperty.call(mainList, mainProp)) {
        let childList = this.actionService.groupBy(mainList[mainProp], 'value');
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

  private setSelectedPages() {
    this.pageNumbers = '';
    const selectedPageNumbers = this.highlitedPages.map((i) => { return i.id });
    const result = selectedPageNumbers.reduce((r, n) => {
      const lastSubArray = r[r.length - 1];

      if (!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) {
        r.push([]);
      }

      r[r.length - 1].push(n);

      return r;
    }, []);

    result.map((group) => {
      if (group.length === 1) {
        this.pageNumbers = this.pageNumbers + `${group[0]}, `;
      } else {
        this.pageNumbers = this.pageNumbers + `${group[0]} - ${group[group.length - 1]}, `;
      }
    });
  }

  private resetSelectedPages() {
    this.pages = this.pages.map((i) => {
      i.isSelected = false;
      return i;
    });
  }

  private doSequentialSelection(page: OrderPage) {
    if (page.isSelected === false) {
      const selectedPageNumbers = this.highlitedPages.map((i) => { return i.id });
      const lesser = selectedPageNumbers.filter(function (item) {
        return item < page.id;
      });
      const prevHighlitedPageNumber = Math.max(...lesser);
      this.pages.map((i) => {
        if (i.id > prevHighlitedPageNumber && i.id < page.id) {
          i.isSelected = true;
        }
      });
      this.highlitedPages = this.pages.filter((i) => i.isSelected === true);
      this.setSelectedPages();
    }
  }

  /* Public Methods */
  togglePageSelection(page: OrderPage, event) {
    if (event.shiftKey) {
      this.doSequentialSelection(page);
    }

    const index = this.pages.findIndex((i) => i.id === page.id);
    page.isSelected = !page.isSelected;
    this.pages[index] = page;
    this.highlitedPages = this.pages.filter((i) => i.isSelected === true);
    this.setSelectedPages();
  }

  onApply() {
    const type = this.applyFormGroup.value.type;
    const value = this.applyFormGroup.value.value;
    this.highlitedPages.map((item) => {
      const index = item.pageDetails.findIndex((data) => data.type === type && data.value === value);
      if (index === -1) {
        const pageDetails = new OrderPageDetails();
        pageDetails.pageId = item.id;
        pageDetails.type = type;
        pageDetails.value = value;
        item.pageDetails.push(pageDetails);
      }
    });
    this.updatePageTask();
    this.applyFormGroup.reset();
    if (this.applyFormGroup.value.clearOnApply) { this.resetSelectedPages(); }
  }

  onSave() {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
