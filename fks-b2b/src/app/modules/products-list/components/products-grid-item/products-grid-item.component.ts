import {Component} from '@angular/core';
import {Product} from '@spartacus/core';
import {ProductGridItemComponent, ProductListItemContext, ProductListItemContextSource} from '@spartacus/storefront';
import {EventsTrackerService} from 'src/app/core/services/events-tracker/events-tracker.service';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-products-grid-item',
  templateUrl: './products-grid-item.component.html',
  styleUrls: ['./products-grid-item.component.scss'],
  providers: [WindowSizeUtils,
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
})
export class ProductsGridItemComponent extends ProductGridItemComponent {
  productImgPlaceholder = '../../../../../assets/imgs/productImgPlaceholder.jpeg';

  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);
  product: Product | any;

  constructor(
    protected windowSizeUtils: WindowSizeUtils,
    private eventsTrackerService: EventsTrackerService, productListItemContextSource: ProductListItemContextSource
  ) {
    super(productListItemContextSource);
  }
}
