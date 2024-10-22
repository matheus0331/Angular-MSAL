import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {
  ActiveFacetsModule,
  FacetListModule,
  FacetModule,
  IconModule,
  KeyboardFocusModule,
  ListNavigationModule,
  MediaModule,
  PaginationModule,
  ProductListModule,
  SpinnerModule,
} from '@spartacus/storefront';

import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsGridItemComponent} from './components/products-grid-item/products-grid-item.component';
import {ButtonAddToCartComponent} from './components/button-add-to-cart/button-add-to-cart.component';
import {ButtonAddToFavoritesComponent} from './components/button-add-to-favorites/button-add-to-favorites.component';
import {ProductsListFiltersComponent} from './components/products-list-filters/products-list-filters.component';
import {FacetsActiveFiltersComponent} from './components/facets-active-filters/facets-active-filters.component';
import {FacetsFiltersComponent} from './components/facets-filters/facets-filters.component';
import {FacetsComponent} from './components/facets-filters/facets/facets.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductsListingPageComponent} from './components/products-listing-page/products-listing-page.component';
import {ButtonChangeViewModeComponent} from './components/button-change-view-mode/button-change-view-mode.component';
import {ButtonSortProductsComponent} from './components/button-sort-products/button-sort-products.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ProductsListItemComponent} from './components/products-list-item/products-list-item.component';
import {ProductsPaginationComponent} from './components/products-pagination/products-pagination.component';
import {QuickFiltersComponent} from './components/quick-filters/quick-filters.component';
import {QuickFacetsComponent} from './components/quick-filters/quick-facets/quick-facets.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsGridItemComponent,
    ButtonAddToCartComponent,
    ButtonAddToFavoritesComponent,
    ProductsListFiltersComponent,
    FacetsActiveFiltersComponent,
    FacetsFiltersComponent,
    FacetsComponent,
    ProductsListingPageComponent,
    ButtonChangeViewModeComponent,
    ButtonSortProductsComponent,
    ProductsListItemComponent,
    ProductsPaginationComponent,
    QuickFiltersComponent,
    QuickFacetsComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        CMSProductListComponent: {
          component: ProductsListingPageComponent,
        },
        SearchResultsListComponent: {
          component: ProductsListingPageComponent,
        },
        ProductRefinementComponent: {
          component: [],
        },
      },
    }),
    ProductListModule,
    PaginationModule,
    ListNavigationModule,
    I18nModule,
    MediaModule,
    RouterModule,
    UrlModule,
    IconModule,
    ReactiveFormsModule,
    FacetListModule,
    ActiveFacetsModule,
    FacetModule,
    KeyboardFocusModule,
    NgbModule,
    NgSelectModule,
    SpinnerModule,
    FormsModule,
  ],
  exports: [ProductsPaginationComponent],
})
export class ProductsListModule {
}
