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
  historyPages: OrderPage[] = [];
  highlitedPageNumbers: number[] = [];
  pagesGroupedByType: any = [];
  pageNumbersLine: string;
  porpertyList = [];
  selectedProperty: any;

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

    this.porpertyList = [
      {
        value: 'Lamination',
        text: 'Lamination',
        child: [
          { value: 'Glossy', text: 'Glossy' },
          { value: 'Sparkle', text: 'Sparkle' },
          { value: 'Silky Matt', text: 'Silky Matt' },
          { value: 'Velvet ', text: 'Velvet' },
        ]
      },
      {
        value: 'Color',
        text: 'Color',
        child: [
          { value: 'Vivid', text: 'Vivid' },
          { value: 'Four color', text: 'Four Color' },
        ]
      },
    ];

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
    });
  }

  private updatePageTask() {
    let tags = [];
    this.pages.map((i) => {
      if (i.pageDetails.length > 0) {
        tags = tags.concat(i.pageDetails);
      }
    });

    const mainList = this.actionService.groupBy(tags, 'type');
    const refinedMainList = [];
    for (var mainProp in mainList) {
      if (Object.prototype.hasOwnProperty.call(mainList, mainProp)) {
        let childList = this.actionService.groupBy(mainList[mainProp], 'value');
        let refinedChild = [];
        for (const childProp in childList) {
          if (Object.prototype.hasOwnProperty.call(childList, childProp)) {
            refinedChild.push({ 'type': childProp, 'child': childList[childProp] });
          }
        }
        refinedMainList.push({ 'type': mainProp, 'child': refinedChild });
      }
    }
    this.pagesGroupedByType = refinedMainList;
  }

  private setSelectedPageInOneLine() {
    this.pageNumbersLine = '';
    const result = this.highlitedPageNumbers.reduce((r, n) => {
      const lastSubArray = r[r.length - 1];

      if (!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) {
        r.push([]);
      }

      r[r.length - 1].push(n);

      return r;
    }, []);

    result.map((group) => {
      if (group.length === 1) {
        this.pageNumbersLine = this.pageNumbersLine + `${group[0]}, `;
      } else {
        this.pageNumbersLine = this.pageNumbersLine + `${group[0]} - ${group[group.length - 1]}, `;
      }
    });
    this.pageNumbersLine = this.pageNumbersLine.replace(/,\s*$/, "");
  }

  private resetSelectedPages() {
    this.pages = this.pages.map((i) => {
      i.isSelected = false;
      return i;
    });
  }

  private doSequentialSelection(page: OrderPage) {
    if (page.isSelected === false) {
      const lesser = this.highlitedPageNumbers.filter(function (item) {
        return item < page.id;
      });
      const prevHighlitedPageNumber = Math.max(...lesser);
      this.pages.map((i) => {
        if (i.id > prevHighlitedPageNumber && i.id < page.id) {
          i.isSelected = true;
        }
      });
      const highlitedPages = this.pages.filter((i) => i.isSelected === true);
      this.highlitedPageNumbers = highlitedPages.map((i) => i.id);
      this.setSelectedPageInOneLine();
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
    const highlitedPages = this.pages.filter((i) => i.isSelected === true);
    this.highlitedPageNumbers = highlitedPages.map((i) => i.id);
    this.setSelectedPageInOneLine();
  }

  clearSelection() {
    this.resetSelectedPages();
    this.highlitedPageNumbers = [];
    this.pageNumbersLine = '';
  }

  onApply() {
    const type = this.applyFormGroup.value.type;
    const value = this.applyFormGroup.value.value;
    this.historyPages = this.actionService.deepCopy(this.pages);

    this.highlitedPageNumbers.map((number) => {

      const pageIndex = this.pages
        .findIndex((page) => page.id === number);

      const pageDetailsIndex = this.pages[pageIndex].pageDetails
        .findIndex((detail) => detail.type === type);

      const pageDetails = new OrderPageDetails();
      pageDetails.pageId = number;
      pageDetails.type = type;
      pageDetails.value = value;

      if (pageDetailsIndex === -1) {
        this.pages[pageIndex].pageDetails.push(pageDetails);
      } else {
        this.pages[pageIndex].pageDetails[pageDetailsIndex] = pageDetails;
      }
    });

    this.applyFormGroup.reset();
    this.updatePageTask();
  }

  onPropertySelected(event, type) {

    if (event.isUserInput) {
      this.selectedProperty = type;
    }

    this.applyFormGroup.patchValue({
      value: null,
    });
  }

  removePropertyFromPage(task: any) {

    const pageIndex = this.pages
      .findIndex((page) => page.id === task.pageId);

    this.pages[pageIndex].pageDetails = this.pages[pageIndex].pageDetails
      .filter((detail) => {
        return detail.type !== task.type
          || (detail.type === task.type && detail.value !== task.value);
      });

    this.updatePageTask();
  }

  trackByFn(index, item) {
    return index;
  }

  getToolTip(page: OrderPage) {
    if (page.pageDetails.length === 0) {
      return;
    } else {
      let text = '';
      page.pageDetails.map((detail) => {
        text = text + `${detail.type} - ${detail.value}, `
      });
      return text.replace(/,\s*$/, '');
    }
  }

  onUndo() {
    this.pages = this.historyPages;
    this.updatePageTask();
    this.resetSelectedPages();
    this.historyPages = [];
    this.highlitedPageNumbers = [];
    this.pageNumbersLine = '';
  }

  onSave() {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
