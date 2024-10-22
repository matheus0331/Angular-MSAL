import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselModule, IconModule, LaunchDialogModule, MediaModule, SpinnerModule} from '@spartacus/storefront';
import {RouterModule} from '@angular/router';
import {I18nModule, UrlModule} from '@spartacus/core';
import {
  FrankeAlternativeProductsCarouselModalContentComponent
} from './modal-content/franke-alternative-products-carousel-modal-content.component';
import {FrankeAlternativeProductsCarouselComponent} from './carousel/franke-alternative-products-carousel.component';
import {
  FrankeAlternativeProductsCarouselItemComponent
} from './carousel/alternative-products-carousel-item/franke-alternative-products-carousel-item.component';
import {
  FrankeAlternativeProductsCarouselItemCharacteristicComponent
} from './carousel/alternative-products-carousel-item-characteristic/alternative-products-carousel-item-characteristic.component';
import {FrankeAlternativeProductsFacetsComponent} from './facets/franke-alternative-products-facets.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    FrankeAlternativeProductsCarouselModalContentComponent,
    FrankeAlternativeProductsCarouselComponent,
    FrankeAlternativeProductsCarouselItemComponent,
    FrankeAlternativeProductsCarouselItemCharacteristicComponent,
    FrankeAlternativeProductsFacetsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    I18nModule,
    IconModule,
    CarouselModule,
    SpinnerModule,
    LaunchDialogModule,
    MediaModule,
    RouterModule,
    UrlModule,
    FormsModule,
  ],
  exports: [
    FrankeAlternativeProductsCarouselModalContentComponent,
    FrankeAlternativeProductsCarouselComponent,
    FrankeAlternativeProductsCarouselItemComponent,
    FrankeAlternativeProductsCarouselItemCharacteristicComponent,
    FrankeAlternativeProductsFacetsComponent,
  ],
})
export class AlternativeProductsModule {
}
