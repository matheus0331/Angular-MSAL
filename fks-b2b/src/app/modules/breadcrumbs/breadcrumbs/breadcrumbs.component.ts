import {Component, OnDestroy} from '@angular/core';
import {RoutingService, Translatable, TranslationService} from '@spartacus/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

import {FrankeProductFacetService} from 'src/app/core/services/franke-product-facet/franke-product-facet.service';
import {FrankeProductListComponentService} from 'src/app/core/services/franke-product-list-component/franke-product-list-component.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnDestroy {
  pageTitle$: Observable<string | Translatable>;
  listingPageSubTitle$: Observable<boolean>;
  promotionPageSubTitle$: Observable<boolean>;
  dashboardPageSubTitle$: Observable<boolean>;
  titleIcon$: Observable<string>;

  facetServiceSub$: Subscription;
  translationSub$: Subscription;

  productFamily$: BehaviorSubject<string> = new BehaviorSubject('');
  searchTitle$: BehaviorSubject<Translatable> = new BehaviorSubject(null);

  constructor(
    protected routing: RoutingService,
    protected productListComponentService: FrankeProductListComponentService,
    protected productFacetService: FrankeProductFacetService,
    protected translation: TranslationService
  ) {
    this.pageTitle$ = this.routing.getRouterState().pipe(
      distinctUntilChanged(),
      map((state) => {
        switch (state.state.context.id) {
          case 'search': {
            this.setIconAndSubtitle(null, true, false, false);
            this.getSearchTitle(state);
            return null;
          }
          case '/my-account/orders': {
            this.setIconAndSubtitle(
              'ORDER_HISTORY_BDCRMB',
              false,
              false,
              false
            );
            return {key: 'breadcrumbs.orderHistoryPageTitle'};
          }
          case '/my-account/profile': {
            this.setIconAndSubtitle('MY_PROFILE_BDCRMB', false, false, false);
            return {key: 'breadcrumbs.profilePageTitle'};
          }
          case '/my-account/address-book': {
            this.setIconAndSubtitle('ADDRESS_BOOK_BDCRMB', false, false, false);
            return {key: 'breadcrumbs.addressBookPageTitle'};
          }
          case '/my-account/favorites': {
            this.setIconAndSubtitle('WISHLIST_BDCRMB', false, false, false);
            return {key: 'breadcrumbs.wishlistPageTitle'};
          }
          case '/my-account/dashboard': {
            this.setIconAndSubtitle(null, false, false, true);
            return {key: 'breadcrumbs.dashboardPage.dashboardPageTitle'};
          }
          case '/cart': {
            this.setIconAndSubtitle('CART_BDCRMB', false, false, false);
            return {key: 'breadcrumbs.shoppingCartPageTitle'};
          }
          case '/checkout/shipping-address': {
            this.setIconAndSubtitle('CHECKOUT_BDCRMB', false, false, false);
            return {key: 'breadcrumbs.checkoutPageTitle'};
          }
          case '/checkout/billing-address': {
            this.setIconAndSubtitle('CHECKOUT_BDCRMB', false, false, false);
            return {key: 'breadcrumbs.checkoutPageTitle'};
          }
          case '/checkout/review-order': {
            this.setIconAndSubtitle('CHECKOUT_BDCRMB', false, false, false);
            return {key: 'breadcrumbs.checkoutPageTitle'};
          }
          case '/order-confirmation': {
            this.setIconAndSubtitle(null, false, false, false);
            return {key: 'breadcrumbs.orderConfirmationPageTitle'};
          }
          case '/terms': {
            this.setIconAndSubtitle(null, false, false, false);
            return {key: 'breadcrumbs.termsPageTitle'};
          }
          case '/privacy': {
            this.setIconAndSubtitle(null, false, false, false);
            return {key: 'breadcrumbs.privacyPageTitle'};
          }
          case '/imprint': {
            this.setIconAndSubtitle(null, false, false, false);
            return {key: 'breadcrumbs.imprintPageTitle'};
          }
          default: {
            if (state.state.context.id.startsWith('/my-account/order')) {
              this.setIconAndSubtitle(
                'ORDER_HISTORY_BDCRMB',
                false,
                false,
                false
              );
              return {key: 'breadcrumbs.orderHistoryPageTitle'};
            } else if (state.state.context.id.startsWith('/products')) {
              this.setIconAndSubtitle(null, true, false, false);
              this.getActiveFamily();
              return null;
            } else if (
              state.state.context.id.startsWith('/search') &&
              state.state.url.search('catalog_area:FRANKE_S6') > 0
            ) {
              this.setIconAndSubtitle(null, true, false, false);
              return {key: 'breadcrumbs.outletPageTitle'};
            } else if (
              state.state.context.id.startsWith('/search') &&
              state.state.url.search('isBundle:true') > 0
            ) {
              this.setIconAndSubtitle(null, true, false, false);
              return {key: 'breadcrumbs.bundlesPageTitle'};
            } else if (state.state.context.id.startsWith('/search')) {
              this.setIconAndSubtitle(null, true, false, false);
              this.getSearchTitle(state);
              return null;
            } else {
              this.setIconAndSubtitle(null, false, false, false);
              return null;
            }
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.facetServiceSub$) {
      this.facetServiceSub$.unsubscribe();
    }
    if (this.translationSub$) {
      this.translationSub$.unsubscribe();
    }
  }

  setIconAndSubtitle(
    icon: string,
    listingPageSubTitle: boolean,
    promotionPageSubTitle: boolean,
    dashboardPageSubTitle: boolean
  ): void {
    this.titleIcon$ = of(icon);
    this.listingPageSubTitle$ = of(listingPageSubTitle);
    this.promotionPageSubTitle$ = of(promotionPageSubTitle);
    this.dashboardPageSubTitle$ = of(dashboardPageSubTitle);
  }

  getActiveFamily(): void {
    this.searchTitle$.next(null);
    this.facetServiceSub$ = this.productFacetService.facetList$.subscribe(
      (facetList) => {
        this.productFamily$.next(facetList.activeCategory[0]?.facetValueName);
      }
    );
  }

  getSearchTitle(state): void {
    this.translationSub$ = this.translation
      .translate('breadcrumbs.promotion')
      .subscribe((translatedWord) => {
        if (
          state.state?.params?.query
            ?.toUpperCase()
            .includes(translatedWord.toUpperCase()) ||
          state.state?.queryParams?.query
            ?.toUpperCase()
            .includes(translatedWord.toUpperCase())
        ) {
          this.searchTitle$.next({
            key: 'breadcrumbs.promotion',
          });
          this.setIconAndSubtitle(null, false, true, false);
        } else {
          this.searchTitle$.next({
            key: 'breadcrumbs.listingPage.searchPageTitle',
            params: {
              query: state?.state?.params?.query
                ? state?.state?.params?.query
                : state.state?.queryParams?.query,
            },
          });
        }
      });
  }
}
