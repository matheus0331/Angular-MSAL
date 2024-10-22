import {NgModule} from '@angular/core';
import {cartBaseTranslationChunksConfig, cartBaseTranslations} from '@spartacus/cart/base/assets';
import {ADD_TO_CART_FEATURE, CART_BASE_FEATURE, CartBaseRootModule, MINI_CART_FEATURE} from '@spartacus/cart/base/root';
import {CmsConfig, I18nConfig, provideConfig} from '@spartacus/core';

@NgModule({
  declarations: [],
  imports: [
    CartBaseRootModule
  ],
  providers: [provideConfig({
    featureModules: {
      [CART_BASE_FEATURE]: {
        module: () =>
          import('@spartacus/cart/base').then((m) => m.CartBaseModule),
      },
    }
  } as CmsConfig),
    provideConfig({
      featureModules: {
        [MINI_CART_FEATURE]: {
          module: () =>
            import('@spartacus/cart/base/components/mini-cart').then((m) => m.MiniCartModule),
        },
      }
    } as CmsConfig),
    provideConfig({
      featureModules: {
        [ADD_TO_CART_FEATURE]: {
          module: () =>
            import('@spartacus/cart/base/components/add-to-cart').then((m) => m.AddToCartModule),
        },
      }
    } as CmsConfig),
    provideConfig({
      i18n: {
        resources: cartBaseTranslations,
        chunks: cartBaseTranslationChunksConfig,
      },
    } as I18nConfig)
  ]
})
export class CartBaseFeatureModule {
}
