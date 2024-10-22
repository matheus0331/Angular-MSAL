import {NgModule} from '@angular/core';
import {CmsConfig, I18nConfig, provideConfig} from '@spartacus/core';
import {orderTranslationChunksConfig, orderTranslations} from '@spartacus/order/assets';
import {ORDER_FEATURE, OrderRootModule} from '@spartacus/order/root';

@NgModule({
  declarations: [],
  imports: [
    OrderRootModule
  ],
  providers: [provideConfig({
    featureModules: {
      [ORDER_FEATURE]: {
        module: () =>
          import('@spartacus/order').then((m) => m.OrderModule),
      },
    }
  } as CmsConfig),
    provideConfig({
      i18n: {
        resources: orderTranslations,
        chunks: orderTranslationChunksConfig,
      },
    } as I18nConfig)
  ]
})
export class OrderFeatureModule {
}
