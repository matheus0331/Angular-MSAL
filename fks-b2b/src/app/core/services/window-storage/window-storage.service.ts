import {Injectable} from '@angular/core';
import {WindowRef} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class WindowStorageService {
  constructor(protected winRef: WindowRef) {
  }

  getItemFromLocalStorage(item: string): any {
    if (this.winRef.localStorage) {
      return localStorage.getItem(item);
    }
    return '';
  }

  setItemInLocalStorage(key: string, value: any): void {
    if (this.winRef.localStorage) {
      localStorage.setItem(key, value);
    }
  }

  getItemFromSessionStorage(item: string): any {
    if (this.winRef.sessionStorage) {
      return sessionStorage.getItem(item);
    }
    return '';
  }

  setItemInSessionStorage(key: string, value: any): void {
    if (this.winRef.sessionStorage) {
      sessionStorage.setItem(key, value);
    }
  }

  clearLocalStorage(): void {
    if (this.winRef.localStorage) {
      localStorage.clear();
    }
  }

  clearSessionStorage(): void {
    if (this.winRef.sessionStorage) {
      sessionStorage.clear();
    }
  }
}
