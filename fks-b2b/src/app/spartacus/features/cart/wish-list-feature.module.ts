import {NgModule} from '@angular/core';
import {wishListTranslationChunksConfig, wishListTranslations} from '@spartacus/cart/wish-list/assets';
import {ADD_TO_WISHLIST_FEATURE, CART_WISH_LIST_FEATURE, WishListRootModule} from '@spartacus/cart/wish-list/root';
import {CmsConfig, I18nConfig, provideConfig} from '@spartacus/core';

@NgModule({
  declarations: [],
  imports: [
    WishListRootModule
  ],
  providers: [provideConfig({
    featureModules: {
      [CART_WISH_LIST_FEATURE]: {
        module: () =>
          import('@spartacus/cart/wish-list').then((m) => m.WishListModule),
      },
    }
  } as CmsConfig),
    provideConfig({
      featureModules: {
        [ADD_TO_WISHLIST_FEATURE]: {
          module: () =>
            import('@spartacus/cart/wish-list/components/add-to-wishlist').then((m) => m.AddToWishListModule),
        },
      }
    } as CmsConfig),
    provideConfig({
      i18n: {
        resources: wishListTranslations,
        chunks: wishListTranslationChunksConfig,
      },
    } as I18nConfig)
  ]
})
export class WishListFeatureModule {
}

