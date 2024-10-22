import {Component} from '@angular/core';
import {WindowRef} from '@spartacus/core';
import {CurrentProductService, ProductSummaryComponent} from '@spartacus/storefront';

@Component({
  selector: 'app-custom-product-summary',
  templateUrl: './custom-product-summary.component.html',
  styleUrls: ['./custom-product-summary.component.scss'],
})
export class CustomProductSummaryComponent extends ProductSummaryComponent {
  constructor(
    protected currentProductService: CurrentProductService,
    protected winRef: WindowRef
  ) {
    super(currentProductService);
  }

  scrollToDescription(): void {
    this.winRef.document
      .getElementById('description')
      .scrollIntoView({behavior: 'smooth'});
  }
}
