import {Component, Input} from '@angular/core';
import {OccConfig} from '@spartacus/core';

import {FrankeProductCategoryInspirationCmsComponent} from 'src/app/shared/models/franke-cms';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-home-product-category',
  templateUrl: './home-product-category.component.html',
  styleUrls: ['./home-product-category.component.scss'],
  providers: [WindowSizeUtils],
})
export class HomeProductCategoryComponent {
  @Input()
  frankeCmsProductCategory: FrankeProductCategoryInspirationCmsComponent;
  @Input() productCategories: FrankeProductCategoryInspirationCmsComponent;
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);
  categoriesIndexsToSeparate = [3, 7, 11, 15, 19, 23, 27, 31, 35];

  apiEndpoint = this.occConfig.backend.occ.baseUrl;

  constructor(
    protected occConfig: OccConfig,
    protected windowSizeUtils: WindowSizeUtils
  ) {
  }
}
