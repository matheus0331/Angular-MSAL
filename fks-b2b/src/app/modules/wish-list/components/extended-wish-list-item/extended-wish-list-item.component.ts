import {Component} from '@angular/core';
import {Image} from '@spartacus/core';
import {WishListItemComponent} from '@spartacus/cart/wish-list/components';

@Component({
  selector: 'app-extended-wish-list-item',
  templateUrl: './extended-wish-list-item.component.html',
  styleUrls: ['./extended-wish-list-item.component.scss'],
})
export class ExtendedWishListItemComponent extends WishListItemComponent {
  getThumbnailFormatImage(productImages: Image): Image {
    if (productImages) {
      return (productImages as Image[]).find(
        (img) => img.format === 'thumbnail'
      );
    }
    return null;
  }
}
