import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CmsConfig, FeaturesConfigModule, I18nModule, provideConfig, provideDefaultConfig} from '@spartacus/core';
import {ReactiveFormsModule} from '@angular/forms';
import {IconModule, MediaModule, PromotionsModule} from '@spartacus/storefront';
import {
  ExtendedOrderConfirmationThankYouMessageComponent
} from './extended-order-confirmation-thank-you-message/extended-order-confirmation-thank-you-message.component';
import {
  ExtendedOrderConfirmationOverviewComponent
} from './extended-order-confirmation-overview/extended-order-confirmation-overview.component';
import {ExtendedOrderConfirmationItemsComponent} from './extended-order-confirmation-items/extended-order-confirmation-items.component';
import {
  ExtendedOrderConfirmationItemPromotionBannerComponent,
} from './extended-order-confirmation-items/extended-order-confirmation-item-promotion-banner/extended-order-confirmation-item-promotion-banner.component';
import {ExtendedOrderConfirmationTotalsComponent} from './extended-order-confirmation-totals/extended-order-confirmation-totals.component';
import {CartSharedModule} from '@spartacus/cart/base/components';
import {OrderConfirmationModule} from '@spartacus/order/components';

@NgModule({
  declarations: [
    ExtendedOrderConfirmationThankYouMessageComponent,
    ExtendedOrderConfirmationOverviewComponent,
    ExtendedOrderConfirmationItemsComponent,
    ExtendedOrderConfirmationItemPromotionBannerComponent,
    ExtendedOrderConfirmationTotalsComponent,
  ],
  imports: [
    CommonModule,
    I18nModule,
    ReactiveFormsModule,
    FeaturesConfigModule,
    IconModule,
    PromotionsModule,
    MediaModule,
    CartSharedModule,
    OrderConfirmationModule
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        OrderConfirmationThankMessageComponent: {
          component: ExtendedOrderConfirmationThankYouMessageComponent,
        },
        OrderConfirmationOverviewComponent: {
          component: ExtendedOrderConfirmationOverviewComponent,
        },
        OrderConfirmationItemsComponent: {
          component: ExtendedOrderConfirmationItemsComponent,
        },
        OrderConfirmationTotalsComponent: {
          component: ExtendedOrderConfirmationTotalsComponent,
        },
        OrderConfirmationShippingComponent: {
          component: null,
        },
      },
    } as CmsConfig),
    provideConfig({
      cmsComponents: {
        OrderConfirmationThankMessageComponent: {
          component: ExtendedOrderConfirmationThankYouMessageComponent,
        },
        OrderConfirmationOverviewComponent: {
          component: ExtendedOrderConfirmationOverviewComponent,
        },
        OrderConfirmationItemsComponent: {
          component: ExtendedOrderConfirmationItemsComponent,
        },
        OrderConfirmationTotalsComponent: {
          component: ExtendedOrderConfirmationTotalsComponent,
        },
        OrderConfirmationShippingComponent: {
          component: null,
        },
      },
    } as CmsConfig),
  ],
  exports: [ExtendedOrderConfirmationThankYouMessageComponent],
})
export class FrankeOrderConfirmationModule {
}
