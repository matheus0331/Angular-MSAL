import {NgModule} from '@angular/core';
import {savedCartTranslationChunksConfig, savedCartTranslations} from '@spartacus/cart/saved-cart/assets';
import {CART_SAVED_CART_FEATURE, SavedCartRootModule} from '@spartacus/cart/saved-cart/root';
import {CmsConfig, I18nConfig, provideConfig} from '@spartacus/core';

@NgModule({
  declarations: [],
  imports: [
    SavedCartRootModule
  ],
  providers: [provideConfig({
    featureModules: {
      [CART_SAVED_CART_FEATURE]: {
        module: () =>
          import('@spartacus/cart/saved-cart').then((m) => m.SavedCartModule),
      },
    }
  } as CmsConfig),
    provideConfig({
      i18n: {
        resources: savedCartTranslations,
        chunks: savedCartTranslationChunksConfig,
      },
    } as I18nConfig)
  ]
})
export class CartSavedCartFeatureModule {
}
