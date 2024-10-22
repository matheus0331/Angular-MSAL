import {Component, OnInit} from '@angular/core';
import {ProductListItemComponent, ProductListItemContext, ProductListItemContextSource} from '@spartacus/storefront';

import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss'],
  providers: [WindowSizeUtils,
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
})
export class ProductsListItemComponent
  extends ProductListItemComponent
  implements OnInit {
  productImgPlaceholder =
    '../../../../../assets/imgs/productImgPlaceholder.jpeg';
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  constructor(protected windowSizeUtils: WindowSizeUtils, productListItemContextSource: ProductListItemContextSource) {
    super(productListItemContextSource);
  }

  ngOnInit(): void {
  }
}
