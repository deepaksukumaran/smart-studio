import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor() { }

  /* Public Methods */
  /* return true if value is undefined/null; else false */
  isNullOrEmptyObject(obj: object): boolean {
    if (obj === undefined || obj === null) {
      return true;
    }
    return false;
  }

  /* return true if all properties of the object param is undefined/null/empty; else false */
  isAllNullOrEmptyObject(obj: object): boolean {
    for (const key in obj) {
      if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
        return false;
      }
    }
    return true;
  }

  /* return true if string is undefined/null/empty; else false */
  isNullOrEmptyString(val: string): boolean {
    if (val === undefined || val === null || val === '') {
      return true;
    }
    return false;
  }

  /* return empty string if value is undefined/null; else string itself */
  getEmptyIfNull(val: string): string {
    if (val === undefined || val === null) {
      return '';
    }
    return val;
  }

  removeDuplicatesFromObjectList(list, propNme): any {

    /* Removing undefined values */
    list = list.filter((element) => {
      return element !== undefined;
    });

    /* Removing duplicate values */
    return list.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[propNme]).indexOf(obj[propNme]) === pos;
    });
  }

  makeStringArrayToText(content: string[]) {
    return content.filter(Boolean).join(' ');
  }

  /*
  return empty string if value is undefined/null; else string itself
  Eg:
  sample data: prop1: {prop2:{prop3:'test'}}
  getNestedPropertyValue(prop1,['prop2','prop3']) will return 'test'
  */
  getNestedPropertyValue(obj, args): string {
    for (let i = 0; i < args.length; i++) {
      if (!obj || !obj.hasOwnProperty(args[i])) {
        return '';
      }
      obj = obj[args[i]];
    }
    return obj;
  }

  removeSpecialCharacters(text: string): string {
    if (!this.isNullOrEmptyString(text)) {
      text = text.replace('-', '').replace('(', '').replace(')', '').replace(' ', '');
    }
    return text;
  }

  deepCopy(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }
}
