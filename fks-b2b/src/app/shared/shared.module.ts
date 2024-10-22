import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CmsConfig, ConfigModule, I18nModule} from '@spartacus/core';
import {FrankeBannerCollectionComponent} from './components/franke-banner-collection/franke-banner-collection.component';
import {FrankeBannerLeftComponent} from './components/franke-banner-left/franke-banner-left.component';
import {FrankeBannerRightComponent} from './components/franke-banner-right/franke-banner-right.component';
import {RouterModule} from '@angular/router';
import {FrankeHomepageBannerComponent} from './components/franke-homepage-banner/franke-homepage-banner.component';
import {FrankeCarouselComponent} from './components/franke-carousel/franke-carousel.component';
import {GenericLinkModule, IconModule} from '@spartacus/storefront';
import {FrankeSearchBoxComponent} from './components/franke-search-box/franke-search-box.component';
import {FrankeSearchResultsComponent} from './components/franke-search-results/franke-search-results.component';
import {ExtendedTabParagraphContainerModule} from '@shared/components/tab-paragraph-container/extended-tab-paragraph-container.module';

@NgModule({
  declarations: [
    FrankeBannerCollectionComponent,
    FrankeBannerLeftComponent,
    FrankeBannerRightComponent,
    FrankeHomepageBannerComponent,
    FrankeCarouselComponent,
    FrankeSearchBoxComponent,
    FrankeSearchResultsComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        FrankeCollectionComponent: {
          component: FrankeBannerCollectionComponent,
        },
        CarouselComponent: {
          component: FrankeCarouselComponent,
        },
      },
    } as CmsConfig),
    RouterModule,
    IconModule,
    I18nModule,
    GenericLinkModule,
    ExtendedTabParagraphContainerModule
  ],
  exports: [
    FrankeCarouselComponent,
    FrankeSearchBoxComponent,
    FrankeHomepageBannerComponent,
  ],
})
export class SharedModule {
}
