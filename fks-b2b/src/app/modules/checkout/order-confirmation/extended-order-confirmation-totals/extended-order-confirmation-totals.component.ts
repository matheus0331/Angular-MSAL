import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {FrankeCartService} from 'src/app/core/services/franke-cart/franke-cart.service';
import {Order, OrderFacade} from '@spartacus/order/root';
import {Cart} from '@spartacus/cart/base/root';
import {OrderConfirmationTotalsComponent} from '@spartacus/order/components';
import {first} from 'rxjs/operators';
import {EventsTrackerService} from '@core/services/events-tracker/events-tracker.service';

@Component({
  selector: 'app-extended-order-confirmation-totals',
  templateUrl: './extended-order-confirmation-totals.component.html',
  styleUrls: ['./extended-order-confirmation-totals.component.scss'],
})
export class ExtendedOrderConfirmationTotalsComponent extends OrderConfirmationTotalsComponent implements OnInit {
  order$: Observable<Order>;
  cart$: Observable<Cart>;

  constructor(
    protected orderFacade: OrderFacade,
    private frankeCartService: FrankeCartService,
    private eventsTrackerService: EventsTrackerService
  ) {
    super(orderFacade);
  }

  ngOnInit(): void {
    this.order$ = this.orderFacade.getOrderDetails();
    this.cart$ = this.frankeCartService.getActiveCart();
    combineLatest([
      this.order$,
      this.cart$,
    ]).pipe(first()).subscribe(([order, cart]) => this.eventsTrackerService.sendPurchaseEvent(cart, order));

  }
}
