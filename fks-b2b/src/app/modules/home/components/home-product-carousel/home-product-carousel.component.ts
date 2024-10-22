import {Component} from '@angular/core';
import {CmsComponentData, ProductCarouselComponent} from '@spartacus/storefront';
import {CmsProductCarouselComponent as model, Product, ProductService} from '@spartacus/core';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './home-product-carousel.component.html',
  styleUrls: ['./home-product-carousel.component.scss'],
  providers: [WindowSizeUtils],
})
export class HomeProductCarouselComponent extends ProductCarouselComponent {
  productImgPlaceholder =
    '../../../../../assets/imgs/productImgPlaceholder.jpeg';
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);
  isTablet$ = this.windowSizeUtils.match(MediaBreakpoint.TABLET);

  carouselComponentData$: Observable<model> = this.componentData.data$.pipe(
    filter(Boolean)
  );

  items$: Observable<Observable<Product>[]> = this.carouselComponentData$.pipe(
    map((data) => data.productCodes?.trim().split(' ') ?? []),
    map((codes) =>
      codes.map((code) => this.productService.get(code, this.PRODUCT_SCOPE))
    )
  );

  constructor(
    componentData: CmsComponentData<model>,
    productService: ProductService,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    super(componentData, productService);
  }
}
