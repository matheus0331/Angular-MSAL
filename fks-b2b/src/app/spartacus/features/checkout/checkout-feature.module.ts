import {NgModule} from '@angular/core';
import {checkoutB2BTranslationChunksConfig, checkoutB2BTranslations} from '@spartacus/checkout/b2b/assets';
import {CheckoutB2BRootModule} from '@spartacus/checkout/b2b/root';
import {checkoutTranslationChunksConfig, checkoutTranslations} from '@spartacus/checkout/base/assets';
import {CHECKOUT_FEATURE, CheckoutRootModule} from '@spartacus/checkout/base/root';
import {CmsConfig, I18nConfig, provideConfig} from '@spartacus/core';
import {CheckoutModule} from '@modules/checkout/checkout.module';

@NgModule({
  declarations: [],
  imports: [
    CheckoutRootModule,
    CheckoutB2BRootModule,
    CheckoutModule
  ],
  providers: [provideConfig({
    featureModules: {
      [CHECKOUT_FEATURE]: {
        module: () =>
          import('./checkout-wrapper.module').then((m) => m.CheckoutWrapperModule),
      },
    }
  } as CmsConfig),
    provideConfig({
      i18n: {
        resources: checkoutTranslations,
        chunks: checkoutTranslationChunksConfig,
      },
    } as I18nConfig),
    provideConfig({
      i18n: {
        resources: checkoutB2BTranslations,
        chunks: checkoutB2BTranslationChunksConfig,
      },
    } as I18nConfig)
  ]
})
export class CheckoutFeatureModule {
}
