import {Component} from '@angular/core';
import {AddToWishListComponent} from '@spartacus/cart/wish-list/components/add-to-wishlist';
import {WishListFacade} from '@spartacus/cart/wish-list/root';
import {CurrentProductService} from '@spartacus/storefront';
import {AuthService, Product} from '@spartacus/core';
import {EventsTrackerService} from '@core/services/events-tracker/events-tracker.service';

@Component({
  selector: 'app-custom-add-to-wish-list',
  templateUrl: './custom-add-to-wish-list.component.html',
  styleUrls: ['./custom-add-to-wish-list.component.scss'],
})
export class CustomAddToWishListComponent extends AddToWishListComponent {

  constructor(wishListFacade: WishListFacade,
              currentProductService: CurrentProductService,
              authService: AuthService,
              private eventsTrackerService: EventsTrackerService) {
    super(wishListFacade, currentProductService, authService);
  }

  public add(product: Product): void {
    this.eventsTrackerService.sendAddProductToWishlistEvent(product);
    super.add(product);
  }
}
