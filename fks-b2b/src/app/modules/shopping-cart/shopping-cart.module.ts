import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CmsConfig, ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {FormErrorsModule, IconModule, MediaModule, OutletRefModule, SpinnerModule} from '@spartacus/storefront';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ShoppingCartItemsComponent} from './components/shopping-cart-items/shopping-cart-items.component';
import {SharedModule} from '../shared/shared.module';
import {ShoppingCartItemComponent} from './components/shopping-cart-item/shopping-cart-item.component';
import {ShoppingCartGridItemComponent} from './components/shopping-cart-grid-item/shopping-cart-grid-item.component';
import {
  ShoppingCartItemPromotionBannerComponent
} from './components/shopping-cart-item-promotion-banner/shopping-cart-item-promotion-banner.component';
import {
  ShoppingCartAlternativeProductsOverlayButtonComponent
} from './components/alternative-products-overlay-button/shopping-cart-alternative-products-overlay-button.component';
import {AlternativeProductsModule} from './../alternative-products/alternative-products.module';

@NgModule({
  declarations: [
    ShoppingCartItemsComponent,
    ShoppingCartItemComponent,
    ShoppingCartGridItemComponent,
    ShoppingCartItemPromotionBannerComponent,
    ShoppingCartAlternativeProductsOverlayButtonComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        CartComponent: {
          component: ShoppingCartItemsComponent,
        },
      },
    } as CmsConfig),
    I18nModule,
    MediaModule,
    RouterModule,
    UrlModule,
    IconModule,
    SharedModule,
    OutletRefModule,
    FormsModule,
    BrowserModule,
    NgbModule,
    SpinnerModule,
    ReactiveFormsModule,
    FormErrorsModule,
    AlternativeProductsModule,
  ],
})
export class ShoppingCartModule {
}
