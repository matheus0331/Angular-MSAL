import {Component} from '@angular/core';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {Cart, OrderEntry} from '@spartacus/cart/base/root';
import {Observable} from 'rxjs';
import {ExtendedWishlistService} from '@core/services/extended-wishlist/extended-wishlist.service';
import {ProductListItemContext, ProductListItemContextSource} from '@spartacus/storefront';

@Component({
  selector: 'app-extended-wish-list',
  templateUrl: './extended-wish-list.component.html',
  styleUrls: ['./extended-wish-list.component.scss'],
  providers: [WindowSizeUtils,
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
})
export class ExtendedWishListComponent {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);
  isMobile$ = this.windowSizeUtils.match(MediaBreakpoint.MOBILE);
  isPortrait$ = this.windowSizeUtils.match(MediaBreakpoint.PORTRAIT);
  wishLists$: Observable<Cart> = this.wishListFacade.getWishList();
  loading$: Observable<boolean> = this.wishListFacade.getWishListLoading();

  constructor(
    protected windowSizeUtils: WindowSizeUtils,
    protected wishListFacade: ExtendedWishlistService
  ) {
  }

  removeEntry(item: OrderEntry): void {
    this.wishListFacade.removeEntry(item);
  }
}
