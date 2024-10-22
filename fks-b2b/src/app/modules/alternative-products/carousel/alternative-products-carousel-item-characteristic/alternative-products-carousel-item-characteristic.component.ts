import {Component, Input, OnInit} from '@angular/core';
import {Image} from '@spartacus/core';
import {AlternativeProductCharacteristic, AlternativeProductFacet} from '@shared/models/alternative-products';

@Component({
  selector: 'app-franke-alternative-products-carousel-item-characteristic',
  templateUrl:
    './alternative-products-carousel-item-characteristic.component.html',
  styleUrls: [
    './alternative-products-carousel-item-characteristic.component.scss',
  ],
})
export class FrankeAlternativeProductsCarouselItemCharacteristicComponent
  implements OnInit {
  @Input() characteristic: AlternativeProductCharacteristic;
  @Input() characteristics: AlternativeProductCharacteristic[];
  @Input() facet: AlternativeProductFacet;
  @Input() itemWidth = 'auto';

  image: Image;

  constructor() {
  }

  ngOnInit(): void {
    this.setValue();
  }

  setValue(): void {
    if (!this.characteristics || !this.facet) {
      return;
    }
    this.characteristic = this.characteristics.find(
      (characteristic: AlternativeProductCharacteristic) =>
        characteristic.fieldName === this.facet.fieldName
    );
  }
}
