import {Component} from '@angular/core';
import {OccConfig, Product} from '@spartacus/core';
import {CurrentProductService} from '@spartacus/storefront';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.scss'],
})
export class BundlesComponent {
  product$: Observable<Product> = this.currentProductService.getProduct();
  productImgPlaceholder = '../../../../assets/imgs/productImgPlaceholder.jpeg';

  constructor(
    protected occConfig: OccConfig,
    protected currentProductService: CurrentProductService
  ) {
  }
}
