import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalMessageService, OccEndpointsService, RoutingService} from '@spartacus/core';
import {EMPTY, Observable, Observer, Subject, Subscription} from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';
import {
  AlternativeProduct,
  AlternativeProductFacet,
  AlternativeProductSearchData,
  AlternativeProductsSearchFilters,
  AlternativeProductsSearchResponse,
  hiddenAlternativeProductFacetIds
} from './../../../shared/models/alternative-products';
import {ActiveCartFacade} from '@spartacus/cart/base/root';
import {CheckoutStepService} from '@spartacus/checkout/base/components';

@Injectable({
  providedIn: 'root',
})
export class FrankeAlternativeProductsService {
  alternativeProductSearchData$ = new Subject<AlternativeProductSearchData>();
  facetChange$ = new Subject<AlternativeProductFacet>();
  getAlternativeProductsRequest: Subscription;

  productClick$ = new Subject<AlternativeProduct>();
  actionClick$ = new Subject<AlternativeProduct>();

  constructor(
    private http: HttpClient,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService,
    protected globalMessageService: GlobalMessageService,
    protected occEndpointService: OccEndpointsService,
    private routingService: RoutingService
  ) {
  }

  setFacetChange(facet: AlternativeProductFacet): void {
    this.facetChange$.next(facet);
  }

  handleProductClick(product: AlternativeProduct): void {
    this.productClick$.next(product);
  }

  handleActionClick(product: AlternativeProduct): void {
    this.actionClick$.next(product);
  }

  goToProduct(code: string): void {
    this.routingService.go(
      'product/' + code,
    ).catch(e => e);
  }

  searchAlternativeProducts(filters: AlternativeProductsSearchFilters): void {
    this.alternativeProductSearchData$.next({
      isLoading: true,
    });

    this.getAlternativeProducts(filters)
      .pipe(
        take(1),
        map((values) => values),
        catchError((err) => {
          this.alternativeProductSearchData$.next({
            isLoading: false,
            error: err,
          });
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.alternativeProductSearchData$.next({
          isLoading: false,
          facets: res.d.facets,
          products: res.d.products,
        });
      });
  }

  getAlternativeProducts(
    filters: AlternativeProductsSearchFilters
  ): Observable<AlternativeProductsSearchResponse> {
    const url: string = this.occEndpointService.buildUrl(
      `/products/${filters.fun}/alternatives`
    );
    const urlQueries: string = this._generAtelternativeProductsSearchParams(
      filters
    );
    return new Observable(
      (observer: Observer<AlternativeProductsSearchResponse>) => {
        this.getAlternativeProductsRequest = this.http
          .get<AlternativeProductsSearchResponse>(`${url}?${urlQueries}`)
          .subscribe(
            (res) => {
              observer.next(res);
              observer.complete();
            },
            () => {
              observer.next({
                d: {
                  products: [],
                  facets: [],
                },
              });
            },
            () => observer.complete()
          );
      }
    );
  }

  filterFacetsWithoutHidden(
    facets: AlternativeProductFacet[]
  ): AlternativeProductFacet[] {
    return facets.filter((facet) => {
      return !hiddenAlternativeProductFacetIds.some((facetId) => {
        return facet.fieldName === facetId;
      });
    });
  }

  dropGetAlternativeProductsRequest(): void {
    if (this.getAlternativeProductsRequest) {
      this.getAlternativeProductsRequest.unsubscribe();
    }
  }

  private _generAtelternativeProductsSearchParams({
                                                    quantity = 1,
                                                    requestDate = new Date(),
                                                    minResults = 5,
                                                    maxResults = 10,
                                                    batchSize = 10,
                                                    query = '',
                                                  }: AlternativeProductsSearchFilters): string {
    const dateParams: string = requestDate
      .toISOString()
      .split('T')[0]
      .replace(/\-/g, '');

    const queryFilter = query ? `&query=${query}` : '';

    return (
      `quantity=${quantity}` +
      `&requestDate=${dateParams}` +
      `&minResults=${minResults}` +
      `&maxResults=${maxResults}` +
      `&batchSize=${batchSize}` +
      `${queryFilter}`
    );
  }
}
