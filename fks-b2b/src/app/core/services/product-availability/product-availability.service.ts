import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OccEndpointsService} from '@spartacus/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

export interface CartItemDate {
  refresh: true;
  date: NgbDate;
}

@Injectable({
  providedIn: 'root',
})
export class ProductAvailabilityService {
  preferredDate: string;
  quantity = 1;
  isInStock$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  notify = new BehaviorSubject<CartItemDate>(null);
  deliveryDate$ = new BehaviorSubject<NgbDate>(null);
  notifyObservable$ = this.notify.asObservable();

  constructor(
    private http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {
    this.preferredDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  notifyCartItem(data: CartItemDate): void {
    if (data) {
      this.deliveryDate$.next(data.date);
      this.notify.next(data);
    }
  }

  getAvailability(
    productCode: string,
    cartQuantity?: number,
    deliveryDate?: string
  ): Observable<any> {
    return this.http
      .get(
        this.occEndpointService.buildUrl(
          `/products/${productCode}/availability?preferredDate=${deliveryDate}&quantity=${
            cartQuantity ? cartQuantity : this.quantity
          }`
        )
      )
      .pipe(
        catchError((e) => {
          return of([]);
        })
      );
  }

  checkAvailabilityPDP(
    productCode: string,
    quantity: number,
    date: any
  ): Observable<any> {
    return this.http
      .get(
        this.occEndpointService.buildUrl(
          `/products/${productCode}/availability?preferredDate=${date.year}-${date.month}-${date.day}&quantity=${quantity}`
        )
      )
      .pipe(
        catchError((e) => {
          return of([]);
        })
      );
  }
}
