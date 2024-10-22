import {APP_INITIALIZER, NgModule, Provider} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {
  FacetService,
  HamburgerMenuService,
  NavigationService,
  PaginationConfig,
  ProductFacetService,
  ProductListComponentService,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {ProductPaginationConfig} from './franke-product-list-component/product-pagination.config';
import {FrankeNavigationNodeService} from './franke-navigation-node/franke-navigation-node.service';
import {FrankeSearchBoxComponentService} from './franke-search-box/franke-search-box-component.service';
import {FrankeProductFacetService} from './franke-product-facet/franke-product-facet.service';
import {GoogleTagManagerService} from 'angular-google-tag-manager';
import {FrankeGoogleTagManagerService} from './franke-google-tag-manager/franke-google-tag-manager.service';
import {FrankeHamburgerMenuService} from './franke-hamburger-menu/franke-hamburger-menu.service';
import {UserRedirectService} from './user-redirect/user-redirect.service';
import {FrankeProductListComponentService} from './franke-product-list-component/franke-product-list-component.service';
import {FrankeFacetService} from './franke-facet/franke-facet.service';
import {WishListFacade} from "@spartacus/cart/wish-list/root";
import {ExtendedWishlistService} from "@core/services/extended-wishlist/extended-wishlist.service";
import {AuthService} from "@spartacus/core";
import {FrankeAuthService} from "@core/FrankeAuthService";

export const facadeProviders: Provider[] = [
  ExtendedWishlistService,
  {
    provide: WishListFacade,
    useExisting: ExtendedWishlistService,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: UserRedirectService.onUserRedirectFail,
      deps: [UserRedirectService],
      multi: true,
    },
    {
      provide: AuthService,
      useClass: FrankeAuthService,
    },
    {
      provide: ProductListComponentService,
      useClass: FrankeProductListComponentService,
    },
    {
      provide: SearchBoxComponentService,
      useClass: FrankeSearchBoxComponentService,
    },
    {
      provide: PaginationConfig,
      useClass: ProductPaginationConfig,
    },
    {
      provide: NavigationService,
      useClass: FrankeNavigationNodeService,
    },
    {
      provide: ProductFacetService,
      useClass: FrankeProductFacetService,
    },
    {
      provide: GoogleTagManagerService,
      useClass: FrankeGoogleTagManagerService,
    },
    {
      provide: HamburgerMenuService,
      useClass: FrankeHamburgerMenuService,
    },
    {
      provide: FacetService,
      useClass: FrankeFacetService,
    },
    ...facadeProviders,
    DecimalPipe,
  ],
})
export class ServicesModule {
}
