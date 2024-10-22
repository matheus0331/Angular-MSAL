import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CmsConfig, ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {IconModule, MediaModule, OutletRefModule, SpinnerModule, SplitViewModule} from '@spartacus/storefront';
import {SharedModule} from 'src/app/shared/shared.module';
import {AddressFormModule} from '../../shared/components/address-form/address-form.module';
import {CardModule} from '../../shared/components/card/card.module';
import {SharedModule as CheckoutSharedModule} from '../shared/shared.module';
import {ExtendedProgressMobileBottomComponent} from './extended-progress-mobile-bottom/extended-progress-mobile-bottom.component';
import {ExtendedProgressMobileTopComponent} from './extended-progress-mobile-top/extended-progress-mobile-top.component';
import {ExtendedShippingAddressComponent} from './extended-shipping-address/extended-shipping-address.component';
import {FrankeBillingAddressComponent} from './franke-billing-address/franke-billing-address.component';
import {FrankeCheckoutProgressComponent} from './franke-checkout-progress/franke-checkout-progress.component';
import {FrankePlaceOrderComponent} from './franke-place-order/franke-place-order.component';
import {
  FrankeReviewOrderItemPromotionBannerComponent
} from './franke-review-order/franke-review-order-item-promotion-banner/franke-review-order-item-promotion-banner.component';
import {FrankeReviewOrderComponent} from './franke-review-order/franke-review-order.component';
import {FrankeOrderConfirmationModule} from './order-confirmation/franke-order-confirmation.module';
import {CartNotEmptyGuard, CheckoutAuthGuard} from '@spartacus/checkout/base/components';


@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        CheckoutBillingAddress: {
          component: FrankeBillingAddressComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
        CheckoutShippingAddress: {
          component: ExtendedShippingAddressComponent,
        },
        CheckoutProgress: {
          component: FrankeCheckoutProgressComponent,
        },
        CheckoutReviewOrder: {
          component: FrankeReviewOrderComponent,
          guards: [
            CheckoutAuthGuard,
            CartNotEmptyGuard,
            // ShippingAddressSetGuard,
          ],
        },
        CheckoutPlaceOrder: {
          component: FrankePlaceOrderComponent,
        },
        CheckoutProgressMobileTop: {
          component: ExtendedProgressMobileTopComponent,
        },
        CheckoutProgressMobileBottom: {
          component: ExtendedProgressMobileBottomComponent,
        },
      },
    } as CmsConfig),
    IconModule,
    SharedModule,
    MediaModule,
    RouterModule,
    UrlModule,
    NgbModule,
    BrowserModule,
    I18nModule,
    SpinnerModule,
    SplitViewModule,
    AddressFormModule,
    CardModule,
    OutletRefModule,
    CheckoutSharedModule,
    ReactiveFormsModule,
    FrankeOrderConfirmationModule,
  ],
  declarations: [
    FrankeBillingAddressComponent,
    FrankeCheckoutProgressComponent,
    ExtendedShippingAddressComponent,
    FrankeReviewOrderComponent,
    FrankeReviewOrderItemPromotionBannerComponent,
    FrankePlaceOrderComponent,
    ExtendedProgressMobileTopComponent,
    ExtendedProgressMobileBottomComponent,
  ],
})
export class CheckoutModule {
}
