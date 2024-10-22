import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {FrankeOrderDetailsService} from '@core/services/franke-order-details/franke-order-details.service';
import {MediaBreakpoint, WindowSizeUtils} from '@shared/utils/window-size-utils';

@Component({
  selector: 'app-order-details-container',
  templateUrl: './order-details-container.component.html',
  styleUrls: ['./order-details-container.component.scss'],
})
export class OrderDetailsContainerComponent {
  orderNumber$: Observable<string>;
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  constructor(
    public frankeOrderDetailsService: FrankeOrderDetailsService,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    this.frankeOrderDetailsService.loadOrderDetails();
    this.orderNumber$ = frankeOrderDetailsService.orderNumber$;
  }
}
