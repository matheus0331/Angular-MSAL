import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class NgbUtilsService {
  generateNgbDateFromDate(date: Date = new Date()): NgbDateStruct {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  generateDateFromNgbDate(date: NgbDateStruct = null): Date {
    if (!date) {
      return new Date();
    }
    return new Date(date.year, date.month - 1, date.day);
  }
}
