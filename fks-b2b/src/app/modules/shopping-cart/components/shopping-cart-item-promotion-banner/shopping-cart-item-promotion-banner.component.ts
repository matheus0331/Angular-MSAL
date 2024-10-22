import {Component, Input} from '@angular/core';
import {FrankeOrderEntry} from 'src/app/shared/models/franke-order';

@Component({
  selector: 'app-shopping-cart-item-promotion-banner',
  templateUrl: './shopping-cart-item-promotion-banner.component.html',
  styleUrls: ['./shopping-cart-item-promotion-banner.component.scss'],
})
export class ShoppingCartItemPromotionBannerComponent {
  @Input() entry: FrankeOrderEntry;
}
