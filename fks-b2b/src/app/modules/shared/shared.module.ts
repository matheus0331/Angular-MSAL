import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CmsConfig, ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {RouterModule} from '@angular/router';
import {CheckoutSummaryComponent} from './components/checkout-summary/checkout-summary.component';
import {CartNavigationButtonsComponent} from './components/cart-navigation-buttons/cart-navigation-buttons.component';
import {ExtendedAddToCartComponent} from './components/extended-add-to-cart/extended-add-to-cart.component';
import {FormErrorsModule, IconModule, ItemCounterModule, SpinnerModule} from '@spartacus/storefront';
import {CheckoutAdditionalInfoComponent} from './components/checkout-additional-info/checkout-additional-info.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FrankePipesModule} from '@modules/pipes/pipes.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CheckoutSummaryComponent,
    CartNavigationButtonsComponent,
    ExtendedAddToCartComponent,
    CheckoutAdditionalInfoComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        CheckoutOrderSummary: {
          component: CheckoutSummaryComponent,
        },
      },
    } as CmsConfig),
    I18nModule,
    RouterModule,
    UrlModule,
    ItemCounterModule,
    ReactiveFormsModule,
    FormErrorsModule,
    IconModule,
    NgbModule,
    FormsModule,
    SpinnerModule,
    FrankePipesModule
  ],
  exports: [CartNavigationButtonsComponent, ExtendedAddToCartComponent],
})
export class SharedModule {
}
