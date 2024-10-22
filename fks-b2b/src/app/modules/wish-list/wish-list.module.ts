import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CmsConfig, ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {ItemCounterModule, MediaModule} from '@spartacus/storefront';
import {RouterModule} from '@angular/router';

import {ExtendedWishListComponent} from './components/extended-wish-list/extended-wish-list.component';
import {ExtendedWishListItemComponent} from './components/extended-wish-list-item/extended-wish-list-item.component';
import {SharedModule} from '../shared/shared.module';
import {ExtendedWishListGridItemComponent} from './components/extended-wish-list-grid-item/extended-wish-list-grid-item.component';
import {AddToCartModule} from '@spartacus/cart/base/components/add-to-cart';

@NgModule({
  declarations: [ExtendedWishListComponent, ExtendedWishListItemComponent, ExtendedWishListGridItemComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        WishListComponent: {
          component: ExtendedWishListComponent,
        },
      },
    } as CmsConfig),
    I18nModule,
    RouterModule,
    AddToCartModule,
    UrlModule,
    MediaModule,
    ItemCounterModule,
    SharedModule,
  ],
})
export class WishListModule {
}
