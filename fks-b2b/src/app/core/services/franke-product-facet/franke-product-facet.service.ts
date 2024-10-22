import {Injectable} from '@angular/core';
import {Params} from '@angular/router';
import {ActivatedRouterStateSnapshot, Breadcrumb, PageType, ProductSearchPage, RoutingService} from '@spartacus/core';
import {Observable} from 'rxjs';
import {filter, map, pluck, switchMap} from 'rxjs/operators';

import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {FrankeFacetList, FrankeProductSearchPage} from '@shared/models/franke-facet';
import {FrankeProductListComponentService} from '../franke-product-list-component/franke-product-list-component.service';

@Injectable({
  providedIn: 'root',
})
export class FrankeProductFacetService {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);
  isCategoryPage: boolean;
  isBundlePage: boolean;
  protected readonly routeState$ = this.routing
    .getRouterState()
    .pipe(pluck('state'));
  protected readonly searchResult$: Observable<ProductSearchPage> = this.routeState$.pipe(
    switchMap((state) =>
      this.isDesktop$.pipe(
        switchMap((isDesktop) => {
          if (!isDesktop) {
            return this.productListComponentService.modelMobile$.pipe(
              filter((page) => this.filterForPage(state, page)),
              map((page) => this.mapResults(state, page))
            );
          } else {
            return this.productListComponentService.modelDesktop$.pipe(
              filter((page) => this.filterForPage(state, page)),
              map((page) => this.mapResults(state, page))
            );
          }
        })
      )
    )
  );
  /**
   * Observes the facets and active facets for the given page. The facet data
   * is provided in a `FacetList`.
   */
  readonly facetList$: Observable<FrankeFacetList> = this.searchResult$.pipe(
    map((result: FrankeProductSearchPage) => {
      if (this.isCategoryPage) {
        return {
          facets: result.facets.filter(
            (facets) =>
              facets.code !== 'familyCodes' &&
              facets.code !== 'catalog_area' &&
              !facets.quickFacet &&
              facets.values.some((facet) => facet.count > 0)
          ),
          activeFacets: result.breadcrumbs.filter(
            (activeFacet) =>
              result.currentQuery?.query?.value?.indexOf(
                `familyCodes:${activeFacet.facetValueCode}`
              ) < 0 &&
              result.currentQuery?.query?.value?.indexOf(
                `product_status:${activeFacet.facetValueCode}`
              ) < 0
          ),
          quickFilters: result.facets.filter(
            (facets) =>
              facets.code !== 'familyCodes' &&
              facets.code !== 'catalog_area' &&
              facets.quickFacet &&
              facets.values.some((facet) => facet.count > 0)
          ),
          activeCategory: result.breadcrumbs.filter(
            (activeFacet) =>
              result.currentQuery?.query?.value?.indexOf(
                `familyCodes:${activeFacet.facetValueCode}`
              ) > 0
          ),
        } as FrankeFacetList;
      } else if (this.isBundlePage) {
        return {
          facets: result.facets.filter(
            (facets) =>
              facets.code !== 'familyCodes' &&
              facets.code !== 'catalog_area' &&
              !facets.quickFacet &&
              facets.values.some((facet) => facet.count > 0)
          ),
          activeFacets: result.breadcrumbs.filter(
            (activeFacet) =>
              result.currentQuery?.query?.value?.indexOf(
                `familyCodes:${activeFacet.facetValueCode}`
              ) < 0 &&
              result.currentQuery?.query?.value?.indexOf(
                `catalog_area:${activeFacet.facetValueCode}`
              ) < 0 &&
              result.currentQuery?.query?.value?.indexOf(
                `product_status:${activeFacet.facetValueCode}`
              ) < 0
          ),
          activeCategory: result.breadcrumbs.filter(
            (activeFacet) =>
              result.currentQuery?.query?.value?.indexOf(
                `familyCodes:${activeFacet.facetValueCode}`
              ) > 0
          ),
        } as FrankeFacetList;
      } else {
        const productFamilyFacets = result.facets.filter(
          (facets) => facets.code === 'familyCodes'
        );
        const activeProductFamilyFacets = productFamilyFacets.find((facet) =>
          facet.values.find((value) => value.selected === true)
        );

        if (activeProductFamilyFacets) {
          return {
            facets: result.facets.filter(
              (facets) =>
                facets.code !== 'catalog_area' &&
                !facets.quickFacet &&
                facets.values.some((facet) => facet.count > 0)
            ),
            activeFacets: result.breadcrumbs.filter(
              (activeFacet) =>
                result.currentQuery?.query?.value?.indexOf(
                  `catalog_area:${activeFacet.facetValueCode}`
                ) < 0 &&
                result.currentQuery?.query?.value?.indexOf(
                  `product_status:${activeFacet.facetValueCode}`
                ) < 0
            ),
            activeCategory: result.breadcrumbs.filter(
              (activeFacet) =>
                result.currentQuery?.query?.value?.indexOf(
                  `familyCodes:${activeFacet.facetValueCode}`
                ) > 0
            ),
          } as FrankeFacetList;
        } else {
          return {
            facets: productFamilyFacets,
            activeFacets: result.breadcrumbs.filter(
              (activeFacet) =>
                result.currentQuery?.query?.value?.indexOf(
                  `catalog_area:${activeFacet.facetValueCode}`
                ) < 0 &&
                result.currentQuery?.query?.value?.indexOf(
                  `product_status:${activeFacet.facetValueCode}`
                ) < 0
            ),
            activeCategory: result.breadcrumbs.filter(
              (activeFacet) =>
                result.currentQuery?.query?.value?.indexOf(
                  `familyCodes:${activeFacet.facetValueCode}`
                ) > 0
            ),
          } as FrankeFacetList;
        }
      }
    })
  );

  constructor(
    protected routing: RoutingService,
    protected productListComponentService: FrankeProductListComponentService,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    this.routeState$.subscribe((state) => {
      this.isCategoryPage = state.context.id.startsWith('/products');
      this.isBundlePage = state.url.includes('isBundle:true');
    });
  }

  /**
   * Filters the current result by verifying if the result is related to the page.
   * This is done to avoid a combination of the next page and the current search results.
   */
  protected filterForPage(
    state: ActivatedRouterStateSnapshot,
    page: ProductSearchPage
  ): boolean {
    if (state.context.type === PageType.CATEGORY_PAGE) {
      return (
        page.currentQuery?.query?.value?.indexOf(
          `allCategories:${state.context.id}`
        ) > -1
      );
    }

    if (
      state.context.type === PageType.CONTENT_PAGE &&
      state.context.id === 'search'
    ) {
      return page.currentQuery.query.value.startsWith(`${state.params.query}:`);
    } else if (state.context.type === PageType.CONTENT_PAGE) {
      return state.context.id.startsWith('/products')
        ? state.context.id.startsWith('/products')
        : state.context.id.startsWith('/search');
    }
    return false;
  }

  private mapResults(
    state: ActivatedRouterStateSnapshot,
    page: ProductSearchPage
  ): ProductSearchPage {
    return {
      ...page,
      breadcrumbs: this.filterBreadcrumbs(page.breadcrumbs, state.params),
    };
  }

  /**
   * filter breadcrumbs which are not actively selected
   * but coming from the route navigation
   */
  private filterBreadcrumbs(
    breadcrumbs: Breadcrumb[],
    params: Params
  ): Breadcrumb[] {
    return breadcrumbs
      ? breadcrumbs.filter(
        (breadcrumb) => !this.hasBreadcrumb(breadcrumb, params)
      )
      : [];
  }

  /**
   * Indicates whether the breadcrumb is related to navigation parameters,
   * since either the category or brand code should match those codes.
   */
  private hasBreadcrumb(breadcrumb: Breadcrumb, params: Params): boolean {
    return (
      breadcrumb.facetCode === 'allCategories' &&
      (breadcrumb.facetValueCode === params.categoryCode ||
        breadcrumb.facetValueCode === params.brandCode)
    );
  }
}
