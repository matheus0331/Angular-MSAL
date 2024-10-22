import {Component} from '@angular/core';
import {FrankeOrderDeliveriesService} from '@core/services/franke-order-deliveries/franke-order-deliveries.service';
import {FrankeOrderDetailsService} from '@core/services/franke-order-details/franke-order-details.service';
import {FrankeOrderDelivery} from '@shared/models/franke-order-delivery';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-details-deliveries',
  templateUrl: './order-details-deliveries.component.html',
  styleUrls: ['./order-details-deliveries.component.scss'],
})
export class OrderDetailsDeliveriesComponent {
  loading$: Observable<boolean>;
  orderDeliverery$: Observable<FrankeOrderDelivery>;

  constructor(
    public frankeOrderDetailsService: FrankeOrderDetailsService,
    private frankeOrderDeliveriesService: FrankeOrderDeliveriesService
  ) {
    this.frankeOrderDeliveriesService.loadOrderDeliveries();
    this.loading$ = this.frankeOrderDeliveriesService.getLoading();
    this.orderDeliverery$ = this.frankeOrderDeliveriesService.getOrderDelivery();
  }
}
