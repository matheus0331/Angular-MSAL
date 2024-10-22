import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {CmsProductReferencesComponent, ProductReferenceService, WindowRef} from '@spartacus/core';
import {CmsComponentData, CurrentProductService, ProductReferencesComponent} from '@spartacus/storefront';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ProductAvailabilityService} from 'src/app/core/services/product-availability/product-availability.service';
import {SubstituteProductsService} from 'src/app/core/services/substitute-products/substitute-products.service';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

const SUBSTITUTES_BY_COLOR = 'substitutesColor';
const SUBSTITUTES_BY_SIZE = 'substitutesSize';

@Component({
  selector: 'app-franke-product-references',
  templateUrl: './franke-product-references.component.html',
  styleUrls: ['./franke-product-references.component.scss'],
  providers: [WindowSizeUtils],
})
export class FrankeProductReferencesComponent
  extends ProductReferencesComponent
  implements OnInit, OnDestroy {
  productImgPlaceholder = '../../../../assets/imgs/productImgPlaceholder.jpeg';
  subscription: Subscription;
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);
  isTablet$ = this.windowSizeUtils.match(MediaBreakpoint.TABLET);
  displaySubstitutes$ = new BehaviorSubject(false);

  constructor(
    cmsComponentData: CmsComponentData<CmsProductReferencesComponent>,
    currentProductService: CurrentProductService,
    productReferenceService: ProductReferenceService,
    private router: Router,
    private winRef: WindowRef,
    private substituteProductsService: SubstituteProductsService,
    protected windowSizeUtils: WindowSizeUtils,
    protected productAvailabilityService: ProductAvailabilityService
  ) {
    super(cmsComponentData, currentProductService, productReferenceService);
  }

  get shouldShowCarousel(): Observable<boolean> {
    return this.componentData$.pipe(
      map((data) => data?.uid),
      switchMap((uid) =>
        uid === SUBSTITUTES_BY_COLOR || uid === SUBSTITUTES_BY_SIZE
          ? this.displaySubstitutes$
          : of(true)
      )
    );
  }

  ngOnInit(): void {
    this.componentData$.subscribe((data) => {
      if (
        data.uid === SUBSTITUTES_BY_COLOR ||
        data.uid === SUBSTITUTES_BY_SIZE
      ) {
        this.items$.subscribe((item) => {
          if (item && item.length > 0) {
            this.substituteProductsService.substituteProducts$.next(true);
          }
        });
        this.productAvailabilityService.isInStock$.subscribe((isInStock) => {
          isInStock
            ? this.displaySubstitutes$.next(false)
            : this.displaySubstitutes$.next(true);
        });
      }
    });

    this.subscription = this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      this.substituteProductsService.substituteProducts$.next(false);
      this.winRef.nativeWindow.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
