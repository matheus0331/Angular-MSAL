import {Component, OnInit} from '@angular/core';
import {AuthService, RoutingService} from '@spartacus/core';
import {FrankeCartService} from 'src/app/core/services/franke-cart/franke-cart.service';
import {Observable} from 'rxjs';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {FrankeOrderEntry} from 'src/app/shared/models/franke-order';
import {CartDetailsComponent} from '@spartacus/cart/base/components';
import {ActiveCartFacade, Cart} from '@spartacus/cart/base/root';
import {CartConfigService, SelectiveCartService} from '@spartacus/cart/base/core';
import {EventsTrackerService} from '@core/services/events-tracker/events-tracker.service';

@Component({
  selector: 'app-shopping-cart-items',
  templateUrl: './shopping-cart-items.component.html',
  styleUrls: ['./shopping-cart-items.component.scss'],
  providers: [WindowSizeUtils],
})
export class ShoppingCartItemsComponent
  extends CartDetailsComponent
  implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<FrankeOrderEntry[]>;

  isTabletOrDesktop$ = this.windowSizeUtils.match(
    MediaBreakpoint.TABLET_OR_DESKTOP
  );
  isMobile$ = this.windowSizeUtils.match(MediaBreakpoint.MOBILE);
  isPortrait$ = this.windowSizeUtils.match(MediaBreakpoint.PORTRAIT);

  constructor(
    protected windowSizeUtils: WindowSizeUtils,
    activeCartFacade: ActiveCartFacade
    ,
    selectiveCartService: SelectiveCartService,
    authService: AuthService,
    routingService: RoutingService,
    private frankeCartService: FrankeCartService,
    protected cartConfig: CartConfigService,
    private eventsTrackerService: EventsTrackerService
  ) {
    super(
      activeCartFacade,
      selectiveCartService,
      authService,
      routingService,
      cartConfig
    );
  }

  get isLoading$(): Observable<boolean> {
    return this.frankeCartService.getActiveCartLoading();
  }

  get isUpdating$(): Observable<boolean> {
    return this.frankeCartService.getIsUpdatingCart();
  }

  ngOnInit(): void {
    this.frankeCartService.loadCart(true);
    this.cart$ = this.activeCartService.getActive();
    this.entries$ = this.frankeCartService.getActiveCartEntries();
  }
}
