import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {OccEndpointsService, RoutingService} from '@spartacus/core';
import {FrankeOrderDelivery} from '@shared/models/franke-order-delivery';
import {FrankeOrderDetailsService} from '../franke-order-details/franke-order-details.service';

@Injectable({providedIn: 'root'})
export class FrankeOrderDeliveriesService {
  orderCode$: Observable<string>;
  protected loading$ = new BehaviorSubject<boolean>(true);
  protected orderDelivery$ = new BehaviorSubject<FrankeOrderDelivery>(null);

  constructor(
    private http: HttpClient,
    private occEndpointService: OccEndpointsService,
    private routingService: RoutingService,
    private frankeOrderDetailsService: FrankeOrderDetailsService
  ) {
  }

  getLoading(): Observable<boolean> {
    return this.loading$;
  }

  getOrderDelivery(): Observable<FrankeOrderDelivery> {
    return this.orderDelivery$;
  }

  loadOrderDeliveries(): void {
    this.loading$.next(true);
    this.orderDelivery$.next(null);

    this.orderCode$ = this.frankeOrderDetailsService.getOrderCode();

    this.orderCode$
      .subscribe((orderCode) => {
        if (orderCode) {
          this.getOrderDeliveriesAPI(orderCode).subscribe(
            (delivery: FrankeOrderDelivery) =>
              this._finishLoadDeliveryDetails(delivery),
            () =>
              this._finishLoadDeliveryDetails({
                deliveryEntries: [],
              })
          );
        }
      })
      .unsubscribe();
  }

  getOrderDeliveriesAPI(
    salesOrderCode: string
  ): Observable<FrankeOrderDelivery> {
    return this.http.get<FrankeOrderDelivery>(
      this.occEndpointService.buildUrl(
        `/users/current/b2bOrders/${salesOrderCode}/deliveries`
      )
    );
  }

  private _finishLoadDeliveryDetails(delivery: FrankeOrderDelivery): void {
    this.orderDelivery$.next(delivery);
    this.loading$.next(false);
  }
}
