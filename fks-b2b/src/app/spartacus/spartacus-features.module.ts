import {NgModule} from '@angular/core';
import {UserFeatureModule} from './features/user/user-feature.module';
import {
  AuthModule,
  CostCenterOccModule,
  ExternalRoutesModule,
  ProductModule,
  ProductOccModule,
  UserModule,
  UserOccModule
} from '@spartacus/core';
import {
  BannerCarouselModule,
  BannerModule,
  CategoryNavigationModule,
  CmsParagraphModule,
  FooterNavigationModule,
  HamburgerMenuModule,
  HomePageEventModule,
  LinkModule,
  LoginRouteModule,
  LogoutModule,
  NavigationEventModule,
  NavigationModule,
  PageTitleModule,
  ProductCarouselModule,
  ProductDetailsPageModule,
  ProductFacetNavigationModule,
  ProductImagesModule,
  ProductIntroModule,
  ProductListingPageModule,
  ProductListModule,
  ProductPageEventModule,
  ProductReferencesModule,
  ProductSummaryModule,
  ProductTabsModule,
  SearchBoxModule,
  SiteContextSelectorModule,
  TabParagraphContainerModule
} from '@spartacus/storefront';
import {HomeModule} from '@modules/home/home.module';
import {AdministrationModule} from '@spartacus/organization';
import {HeaderModule} from '@layout/header/header.module';
import {FooterModule} from '@layout/footer/footer.module';
import {ShoppingCartModule} from '@modules/shopping-cart/shopping-cart.module';
import {CartBaseOccModule} from '@spartacus/cart/base/occ';
import {DashboardModule} from '@modules/dashboard/dashboard.module';
import {ChatModule} from '@modules/chat/chat.module';
import {MyAccountModule} from '@modules/my-account/my-account.module';
import {CartBaseFeatureModule} from './features/cart/cart-base-feature.module';
import {WishListFeatureModule} from './features/cart/wish-list-feature.module';
import {OrderFeatureModule} from './features/order/order-feature.module';
import {OrdersModule} from '@modules/orders/orders.module';
import {ClientServiceModule} from '@modules/client-service/client-service.module';
import {ProductDetailsModule} from '@modules/product-details/product-details.module';
import {CheckoutFeatureModule} from './features/checkout/checkout-feature.module';
import {WishListModule} from '@modules/wish-list/wish-list.module';
import {ProductsListModule} from '@modules/products-list/products-list.module';
import {BreadcrumbsModule} from '@modules/breadcrumbs/breadcrumbs.module';
import {SmartEditFeatureModule} from './features/smartedit/smart-edit-feature.module';

@NgModule({
  declarations: [],
  imports: [
    AdministrationModule,
    AuthModule.forRoot(),
    BannerCarouselModule,
    BannerModule,
    BreadcrumbsModule,
    CartBaseFeatureModule,
    CartBaseOccModule,
    CategoryNavigationModule,
    ChatModule,
    CheckoutFeatureModule,
    ClientServiceModule,
    CmsParagraphModule,
    CostCenterOccModule,
    DashboardModule,
    ExternalRoutesModule.forRoot(),
    FooterModule,
    FooterNavigationModule,
    HamburgerMenuModule,
    HeaderModule,
    HomeModule,
    HomePageEventModule,
    LinkModule,
    LoginRouteModule,
    LogoutModule,
    MyAccountModule,
    NavigationEventModule,
    NavigationModule,
    OrderFeatureModule,
    OrdersModule,
    PageTitleModule,
    ProductCarouselModule,
    ProductDetailsModule,
    ProductDetailsPageModule,
    ProductFacetNavigationModule,
    ProductImagesModule,
    ProductIntroModule,
    ProductListModule,
    ProductListingPageModule,
    ProductModule.forRoot(),
    ProductOccModule,
    ProductPageEventModule,
    ProductReferencesModule,
    ProductSummaryModule,
    ProductTabsModule,
    ProductsListModule,
    SearchBoxModule,
    ShoppingCartModule,
    SiteContextSelectorModule,
    SmartEditFeatureModule,
    TabParagraphContainerModule,
    UserFeatureModule,
    UserModule,
    UserOccModule,
    WishListFeatureModule,
    WishListModule,
  ]
})
export class SpartacusFeaturesModule {
}
