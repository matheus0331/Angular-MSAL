import {Component, Input} from '@angular/core';
import {FrankeOrderEntry} from 'src/app/shared/models/franke-order';

@Component({
  selector: 'app-franke-review-order-item-promotion-banner',
  templateUrl: './franke-review-order-item-promotion-banner.component.html',
  styleUrls: ['./franke-review-order-item-promotion-banner.component.scss'],
})
export class FrankeReviewOrderItemPromotionBannerComponent {
  @Input() entry: FrankeOrderEntry;
}
