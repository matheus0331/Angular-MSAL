import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchboxComponent} from './searchbox/searchbox.component';
import {ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {GenericLinkModule, IconModule, MediaModule, NavigationModule, OutletRefModule} from '@spartacus/storefront';
import {RouterModule} from '@angular/router';

import {SearchResultsComponent} from './search-results/search-results.component';
import {CategoryNavigationNodeComponent} from './navigation/category-navigation.component';
import {UserNavigationComponent} from './user-navigation/user-navigation.component';
import {MinicartComponent} from './minicart/minicart.component';
import {UserPanelComponent} from './user-panel/user-panel.component';
import {LanguageCurrencySelectorComponent} from './language-currency-selector/language-currency-selector.component';
import {NavigationTabsComponent} from './navigation-tabs/navigation-tabs.component';
import {BrowserModule} from '@angular/platform-browser';
import {HeaderLogoComponent} from './header-logo/header-logo.component';
import {ProductCategoryComponent} from './navigation-tabs/components/product-category/product-category.component';
import {BundlesComponent} from './navigation-tabs/components/bundles/bundles.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {NotificationCenterComponent} from './notification-center/notification-center.component';
import {NotificationItemComponent} from './notification-item/notification-item.component';
import {NotificationBannerComponent} from './notification-banner/notification-banner.component';
import {FrankeHamburgerMenuComponent} from './franke-hamburger-menu/franke-hamburger-menu.component';

@NgModule({
  declarations: [
    SearchboxComponent,
    SearchResultsComponent,
    UserNavigationComponent,
    MinicartComponent,
    CategoryNavigationNodeComponent,
    UserPanelComponent,
    LanguageCurrencySelectorComponent,
    NavigationTabsComponent,
    HeaderLogoComponent,
    ProductCategoryComponent,
    BundlesComponent,
    NotificationCenterComponent,
    NotificationItemComponent,
    NotificationBannerComponent,
    FrankeHamburgerMenuComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        SearchBoxComponent: {
          component: SearchboxComponent,
        },
        CategoryNavigationComponent: {
          component: CategoryNavigationNodeComponent,
        },
        NavigationComponent: {
          component: UserNavigationComponent,
        },
        LoginComponent: {
          component: UserPanelComponent,
        },
        CMSSiteContextComponent: {
          component: LanguageCurrencySelectorComponent,
        },
        SimpleBannerComponent: {
          component: HeaderLogoComponent,
        },
        MiniCartComponent: {
          component: MinicartComponent,
        },
        HamburgerMenuComponent: {
          component: FrankeHamburgerMenuComponent,
        },
        FrankeNotificationTopBannerComponent: {
          component: NotificationBannerComponent,
        },
      },
    }),
    IconModule,
    RouterModule,
    MediaModule,
    UrlModule,
    OutletRefModule,
    NavigationModule,
    I18nModule,
    GenericLinkModule,
    BrowserModule,
    SharedModule,
  ],
  exports: [],
})
export class HeaderModule {
}
