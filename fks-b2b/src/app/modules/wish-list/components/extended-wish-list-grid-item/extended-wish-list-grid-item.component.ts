import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Image, Images} from '@spartacus/core';
import {OrderEntry} from '@spartacus/cart/base/root';
import {ProductListItemContext, ProductListItemContextSource} from '@spartacus/storefront';

@Component({
  selector: 'app-extended-wish-list-grid-item',
  templateUrl: './extended-wish-list-grid-item.component.html',
  styleUrls: ['./extended-wish-list-grid-item.component.scss'],
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
})
export class ExtendedWishListGridItemComponent implements OnChanges {
  @Input()
  isLoading = false;
  @Input() cartEntry: OrderEntry;
  @Output()
  remove = new EventEmitter<OrderEntry>();

  constructor() {
  }

  getThumbnailFormatImage(productImages: Images): Image {
    if (productImages) {
      const imagesAsArray = Object.entries(productImages);
      const thumbnails = imagesAsArray.filter(
        ([key, value]) => key === 'thumbnail'
      );
      return Object.fromEntries(thumbnails);
    }
    return productImages;
  }

  ngOnChanges(changes?: SimpleChanges): void {

  }

  removeEntry(item: OrderEntry): void {
    this.remove.emit(item);
  }
}
