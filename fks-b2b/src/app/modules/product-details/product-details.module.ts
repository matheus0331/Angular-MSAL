import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CmsConfig, ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {CustomProductIntroComponent} from './custom-product-intro/custom-product-intro.component';
import {CustomProductSummaryComponent} from './custom-product-summary/custom-product-summary.component';
import {CustomAddToWishListComponent} from './custom-add-to-wish-list/custom-add-to-wish-list.component';
import {
  CarouselModule,
  FormErrorsModule,
  IconModule,
  ItemCounterModule,
  MediaModule,
  SpinnerModule,
  TabParagraphContainerModule,
} from '@spartacus/storefront';
import {ProductDetailsImagesComponent} from './product-details-images/product-details-images.component';
import {FrankeProductReferencesComponent} from './franke-product-references/franke-product-references.component';
import {SharedModule as AppSharedModule} from 'src/app/shared/shared.module';
import {ExtendedProductDetailsTabComponent} from './extended-product-details-tab/extended-product-details-tab.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductDownloadsTabComponent} from './product-downloads-tab/product-downloads-tab.component';
import {ExtendedProductVariantsComponent} from './extended-product-variants/extended-product-variants.component';
import {SharedModule} from '../shared/shared.module';
import {BundlesComponent} from './bundles/bundles.component';
import {ProductDetailsTabsComponent} from './product-details-tabs/product-details-tabs.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AvailabilityCheckAddToCartComponent} from './availability-check-add-to-cart/availability-check-add-to-cart.component';
import {StockNotificationComponent} from './stock-notification/stock-notification.component';
import {
  FrankeAlternativeProductsOverlayButtonComponent
} from './alternative-products-overlay-button/franke-alternative-products-overlay-button.component';
import {AlternativeProductsModule} from '../alternative-products/alternative-products.module';
import {
  ProductVariantColorSelectorModule,
  ProductVariantSizeSelectorModule,
  ProductVariantStyleSelectorModule
} from '@spartacus/product/variants/components';
import {ExtendedTabParagraphContainerModule} from '@shared/components/tab-paragraph-container/extended-tab-paragraph-container.module';

@NgModule({
  declarations: [
    CustomProductIntroComponent,
    CustomProductSummaryComponent,
    CustomAddToWishListComponent,
    ProductDetailsImagesComponent,
    FrankeProductReferencesComponent,
    ExtendedProductDetailsTabComponent,
    ProductDownloadsTabComponent,
    ExtendedProductVariantsComponent,
    BundlesComponent,
    ProductDetailsTabsComponent,
    AvailabilityCheckAddToCartComponent,
    StockNotificationComponent,
    FrankeAlternativeProductsOverlayButtonComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        ProductIntroComponent: {
          component: CustomProductIntroComponent,
        },
        ProductSummaryComponent: {
          component: CustomProductSummaryComponent,
        },
        AddToWishListComponent: {
          component: CustomAddToWishListComponent,
        },
        ProductAddToCartComponent: {
          component: AvailabilityCheckAddToCartComponent,
        },
        ProductImagesComponent: {
          component: ProductDetailsImagesComponent,
        },
        ProductReferencesComponent: {
          component: FrankeProductReferencesComponent,
        },
        ProductDetailsTabComponent: {
          component: ExtendedProductDetailsTabComponent,
        },
        ProductDownloadsTabComponent: {
          component: ProductDownloadsTabComponent,
        },
        ProductVariantSelectorComponent: {
          component: ExtendedProductVariantsComponent,
        },
        CMSTabParagraphContainer: {
          component: ProductDetailsTabsComponent,
        },
        AlternativeProductsOverlayButtonComponent: {
          component: FrankeAlternativeProductsOverlayButtonComponent,
        },
      },
    } as CmsConfig),
    I18nModule,
    RouterModule,
    UrlModule,
    ItemCounterModule,
    MediaModule,
    IconModule,
    SharedModule,
    NgbModule,
    ProductVariantStyleSelectorModule,
    ProductVariantSizeSelectorModule,
    ProductVariantColorSelectorModule,
    AppSharedModule,
    CarouselModule,
    SpinnerModule,
    TabParagraphContainerModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    AlternativeProductsModule,
    ExtendedTabParagraphContainerModule,
  ],
})
export class ProductDetailsModule {
}
