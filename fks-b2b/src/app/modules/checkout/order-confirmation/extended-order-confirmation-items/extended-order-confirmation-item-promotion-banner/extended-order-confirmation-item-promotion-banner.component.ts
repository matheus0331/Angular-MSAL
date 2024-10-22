import {Component, Input} from '@angular/core';
import {FrankeOrderEntry} from 'src/app/shared/models/franke-order';

@Component({
  selector: 'app-extended-order-confirmation-item-promotion-banner',
  templateUrl: './extended-order-confirmation-item-promotion-banner.component.html',
  styleUrls: ['./extended-order-confirmation-item-promotion-banner.component.scss'],
})
export class ExtendedOrderConfirmationItemPromotionBannerComponent {
  @Input() entry: FrankeOrderEntry;
}
