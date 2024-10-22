import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductSearchPage, ProductSearchService, RoutingService} from '@spartacus/core';
import {Observable, of, Subscription} from 'rxjs';
import {catchError, defaultIfEmpty, first, map, pluck} from 'rxjs/operators';
import {FrankeFacetService} from 'src/app/core/services/franke-facet/franke-facet.service';
import {FrankeProductListComponentService} from 'src/app/core/services/franke-product-list-component/franke-product-list-component.service';
import {WindowMoveUtils} from 'src/app/shared/utils/window-move-utils';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {FrankeProductFacetService} from '@core/services/franke-product-facet/franke-product-facet.service';
import {FrankeFacetList} from '@shared/models/franke-facet';
import {ProductsListComponent} from '../products-list/products-list.component';

@Component({
  selector: 'app-products-listing-page',
  templateUrl: './products-listing-page.component.html',
  styleUrls: ['./products-listing-page.component.scss'],
  providers: [ProductsListComponent, WindowSizeUtils, WindowMoveUtils],
})
export class ProductsListingPageComponent implements OnInit, OnDestroy {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);
  numberOfResults$: Observable<number>;
  title: string;
  pageScrollPosition: number;
  routeSub$: Subscription;
  routerEventsSubscription$: Subscription;
  isCategoryPage$: Observable<boolean>;
  isOutletPage$: Observable<boolean>;
  isBundlePage$: Observable<boolean>;
  facetServiceSub$: Subscription;
  categoryName$: Observable<string>;
  facetList$: Observable<FrankeFacetList> = this.productFacetService.facetList$;
  model$: Observable<ProductSearchPage>;
  searchQuery$: Observable<string>;
  protected readonly routeState$ = this.routing.getRouterState().pipe(pluck('state'));
  private isCollapsed = false;
  private queryParams: {
    [key: string]: string;
  };
  queryParamsForLink$: Observable<{ [key: string]: string }> | undefined;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected productFacetService: FrankeProductFacetService,
    protected productListComponentService: FrankeProductListComponentService,
    public productsListComponent: ProductsListComponent,
    protected routing: RoutingService,
    protected facetService: FrankeFacetService,
    protected windowSizeUtils: WindowSizeUtils,
    private router: Router,
    protected windowMoveUtils: WindowMoveUtils,
    protected productSearchService: ProductSearchService
  ) {
    this.isDesktop$.subscribe((isDesktop) => {
      if (!isDesktop) {
        this.model$ = this.productListComponentService.modelMobile$;
      } else {
        this.model$ = this.productListComponentService.modelDesktop$;
      }
    });
    this.routeSub$ = this.routeState$.subscribe((state) => {
      this.isCategoryPage$ = of(state.context.id.startsWith('/products'));
      this.isOutletPage$ = of(state.url.includes('catalog_area:FRANKE_S6'));
      this.isBundlePage$ = of(state.url.includes('isBundle:true'));
      this.searchQuery$ = of(state.params.query);
    });
    this.facetServiceSub$ = this.productFacetService.facetList$.subscribe(
      (facetList) => {
        this.categoryName$ = of(facetList.activeCategory[0]?.facetValueName);
      }
    );
  }

  ngOnInit(): void {
    this.queryParamsForLink$ = this.getQueryParamsProductFamily();
    this.handlePageScroll();
  }

  handlePageScroll(): void {
    //
  }

  getQueryParamsProductFamily(): Observable<{
    [key: string]: string;
  }> {

    const fallbackQueryParams: { [key: string]: string } = {
      'excludedFromIndex': 'false',
      'product_status': 'true',
      'familyCodes': ''
    };
    const params = this.facetList$.pipe(
      map((facets) => {
        return this.facetService.getLinkParams(
          facets.activeCategory?.[0]?.truncateQuery?.query?.value
        );
      }),
      catchError((error) => {
        return [fallbackQueryParams];
      }),
      defaultIfEmpty(fallbackQueryParams)
    );

    params.pipe(first()).subscribe(
      (p) => {
        this.queryParams = p;
      },
      (error) => {
        console.error('Subscription error:', error);
      }
    );

    return params;
  }

  getQueryParamsOutlet(): Observable<{
    [key: string]: string;
  }> {
    const params = this.facetList$.pipe(
      map((facets) => {
        let result = facets.activeCategory[0]?.removeQuery?.query?.value;
        if (result) {
          result = result.substring(
            0,
            result.indexOf('FRANKE_S6') + 'FRANKE_S6'.length
          );
        }
        return this.facetService.getLinkParams(result);
      }), defaultIfEmpty(this.queryParams)
    );
    params.pipe(first()).subscribe(p => this.queryParams = p);
    return params;
  }

  getQueryParamsBundles(): Observable<{
    [key: string]: string;
  }> {
    const params = this.facetList$.pipe(
      map((facets) => {
        let result = facets.activeCategory[0]?.removeQuery?.query?.value;
        if (result) {
          result = result.substring(
            0, result.indexOf('isBundle:true') + 'isBundle:true'.length
          );
        }
        return this.facetService.getLinkParams(result);
      }), defaultIfEmpty(this.queryParams)
    );
    params.pipe(first()).subscribe(p => this.queryParams = p);
    return params;
  }

  hideFilters(): void {
    const filters = this.elementRef.nativeElement.getElementsByClassName(
      'filters'
    )[0];
    const productList = this.elementRef.nativeElement.getElementsByClassName(
      'product-list'
    )[0];

    if (!this.isCollapsed) {
      filters.classList.add('filters-hidden');
      productList.classList.add('product-list-full');
    } else {
      filters.classList.remove('filters-hidden');
      productList.classList.remove('product-list-full');
    }
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription$?.unsubscribe();
    this.routeSub$?.unsubscribe();
    this.facetServiceSub$?.unsubscribe();
    this.productSearchService.clearResults();
  }
}
