import {Component, Input} from '@angular/core';
import {AlternativeProductFacet} from '@shared/models/alternative-products';
import {FrankeAlternativeProductsService} from '@core/services/franke-alternative-products/franke-alternative-products.service';

@Component({
  selector: 'app-franke-alternative-products-facets',
  templateUrl: './franke-alternative-products-facets.component.html',
  styleUrls: ['./franke-alternative-products-facets.component.scss'],
})
export class FrankeAlternativeProductsFacetsComponent {
  @Input() facets: AlternativeProductFacet[];

  constructor(
    private frankeAlternativeProductsService: FrankeAlternativeProductsService
  ) {
  }

  handleFacetChange(facet: AlternativeProductFacet): void {
    this.frankeAlternativeProductsService.setFacetChange(facet);
  }
}
