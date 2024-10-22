import {Component, Input} from '@angular/core';
import {AuthService, Product} from '@spartacus/core';
import {AddToWishListComponent} from '@spartacus/cart/wish-list/components/add-to-wishlist';
import {WishListFacade} from '@spartacus/cart/wish-list/root';
import {CurrentProductService} from '@spartacus/storefront';
import {EventsTrackerService} from '@core/services/events-tracker/events-tracker.service';

@Component({
  selector: 'app-button-add-to-favorites',
  templateUrl: './button-add-to-favorites.component.html',
  styleUrls: ['./button-add-to-favorites.component.scss'],
})
export class ButtonAddToFavoritesComponent extends AddToWishListComponent {
  @Input() product: Product;

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
