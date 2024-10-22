import {Component, Input} from '@angular/core';
import {FrankeAlternativeProductsService} from '@core/services/franke-alternative-products/franke-alternative-products.service';
import {AlternativeProduct, AlternativeProductFacet} from '@shared/models/alternative-products';

@Component({
  selector: 'app-franke-alternative-products-carousel-item',
  templateUrl: './franke-alternative-products-carousel-item.component.html',
  styleUrls: ['./franke-alternative-products-carousel-item.component.scss'],
})
export class FrankeAlternativeProductsCarouselItemComponent {
  @Input() product: AlternativeProduct;
  @Input() facets: AlternativeProductFacet[];
  @Input() imageHeight = '100px';
  @Input() showCharaCharacteristics: boolean;
  @Input() itemWidth = 'auto';
  @Input() actionButtonLabel;

  constructor(
    private frankeAlternativeProductsService: FrankeAlternativeProductsService
  ) {
  }

  handleProductClick(product: AlternativeProduct): void {
    this.frankeAlternativeProductsService.handleProductClick(product);
  }

  handleActionClick(product: AlternativeProduct): void {
    this.frankeAlternativeProductsService.handleActionClick(product);
  }
}

