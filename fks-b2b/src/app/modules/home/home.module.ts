import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CmsConfig, ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {
  GenericLinkModule,
  GlobalMessageComponentModule,
  IconModule,
  KeyboardFocusModule,
  MediaModule,
  NavigationModule,
  OutletRefModule,
  PageLayoutModule,
  PageSlotModule,
  SkipLinkModule,
} from '@spartacus/storefront';
import {RouterModule} from '@angular/router';

import {HomeProductCarouselComponent} from './components/home-product-carousel/home-product-carousel.component';
import {BrandsListComponent} from './components/brands-list/brands-list.component';
import {
  HomeProductCategoriesInspirationCmsComponent
} from './components/home-product-categories-inspiration-cms/home-product-categories-inspiration-cms.component';
import {HomeProductCategoryComponent} from './components/home-product-category/home-product-category.component';
import {HomeInspirationComponent} from './components/home-inspiration/home-inspiration.component';
import {
  InspirationItemImgLeftComponent
} from './components/home-inspiration/components/inspiration-item-img-left/inspiration-item-img-left.component';
import {
  InspirationItemImgRightComponent
} from './components/home-inspiration/components/inspiration-item-img-right/inspiration-item-img-right.component';
import {
  InspirationItemLargeImgComponent
} from './components/home-inspiration/components/inspiration-item-large-img/inspiration-item-large-img.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {HomeBannerCarouselComponent} from './components/home-banner-carousel/home-banner-carousel.component';
import {
  InspirationItemMobileComponent
} from './components/home-inspiration/components/inspiration-item-mobile/inspiration-item-mobile.component';

@NgModule({
  declarations: [
    BrandsListComponent,
    HomeProductCarouselComponent,
    HomeProductCategoriesInspirationCmsComponent,
    HomeProductCategoryComponent,
    HomeInspirationComponent,
    InspirationItemImgLeftComponent,
    InspirationItemImgRightComponent,
    InspirationItemLargeImgComponent,
    HomeBannerCarouselComponent,
    InspirationItemMobileComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        ProductCarouselComponent: {
          component: HomeProductCarouselComponent,
        },
        FrankeInspirationComponent: {
          component: HomeProductCategoriesInspirationCmsComponent,
        },
        BrandsListComponent: {
          component: BrandsListComponent,
        },
        FrankeCollectionCarouselComponent: {
          component: HomeBannerCarouselComponent,
        },
      },
    } as CmsConfig),
    RouterModule,
    UrlModule,
    MediaModule,
    IconModule,
    NavigationModule,
    OutletRefModule,
    SharedModule,
    I18nModule,
    SkipLinkModule,
    KeyboardFocusModule,
    PageLayoutModule,
    GlobalMessageComponentModule,
    PageSlotModule,
    GenericLinkModule,
  ],
})
export class HomeModule {
}
