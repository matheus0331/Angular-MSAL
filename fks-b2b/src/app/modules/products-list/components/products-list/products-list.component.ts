import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GlobalMessageService, ProductSearchPage, ProductSearchService} from '@spartacus/core';
import {
  PageLayoutService,
  ProductListComponent,
  ProductListComponentService,
  ProductListItemContext,
  ProductListItemContextSource,
  ViewConfig,
  ViewModes
} from '@spartacus/storefront';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [WindowSizeUtils,
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
})
export class ProductsListComponent extends ProductListComponent implements OnInit, OnDestroy {
  @Input() viewMode$: BehaviorSubject<ViewModes>;
  @Input() model$: Observable<ProductSearchPage>;

  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);
  isLandscape$ = this.windowSizeUtils.match(MediaBreakpoint.LANDSCAPE);
  isTablet$ = this.windowSizeUtils.match(MediaBreakpoint.TABLET);
  isMobile$ = this.windowSizeUtils.match(MediaBreakpoint.MOBILE);
  modelSubscription$: Subscription;

  constructor(
    pageLayoutService: PageLayoutService,
    productListComponentService: ProductListComponentService,
    scrollConfig: ViewConfig,
    protected globalMessageService2: GlobalMessageService,
    protected windowSizeUtils: WindowSizeUtils,
    protected productSearchService: ProductSearchService
  ) {
    super(pageLayoutService, productListComponentService, globalMessageService2, scrollConfig);
    this.viewMode$ = new BehaviorSubject<ViewModes>(ViewModes.List);
  }

  ngOnInit(): void {
    this.viewMode$.next(ViewModes.Grid);
  }

  ngOnDestroy(): void {
    this.productSearchService.clearResults();
  }
}
