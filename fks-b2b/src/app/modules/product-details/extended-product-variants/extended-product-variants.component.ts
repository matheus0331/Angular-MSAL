import {AfterViewInit, Component} from '@angular/core';

import {CurrentProductService} from '@spartacus/storefront';
import {Observable} from 'rxjs';
import {AttributeOption, ConfigurableProduct, Domainvalue} from 'src/app/shared/models/configurable-product';
import {ConfigurableProductsService} from 'src/app/core/services/configurable-products/configurable-products.service';
import {tap} from 'rxjs/operators';
import {ProductVariantsContainerComponent} from '@spartacus/product/variants/components';

@Component({
  selector: 'app-extended-product-variants',
  templateUrl: './extended-product-variants.component.html',
  styleUrls: ['./extended-product-variants.component.scss'],
})
export class ExtendedProductVariantsComponent
  extends ProductVariantsContainerComponent
  implements AfterViewInit {
  productCode: string;
  configurableProduct$: Observable<ConfigurableProduct>;

  constructor(
    currentProductService: CurrentProductService,
    protected configurableProductsService: ConfigurableProductsService
  ) {
    super(currentProductService);
  }

  ngAfterViewInit(): void {
    this.product$.subscribe((product) => {
      if (product.configurable) {
        this.configurableProductsService.setProductCode(product.code);
        this.configurableProduct$ = this.configurableProductsService
          .getVariants(product.code)
          .pipe(
            tap((configurableProduct) => {
              this.configurableProductsService.setConfigurableProduct(
                configurableProduct
              );
            })
          );
      }
    });
  }

  updateDomainValue(
    domainValue: Domainvalue,
    attributeOption: AttributeOption
  ): void {
    this.configurableProductsService.updateDomainValue(
      domainValue,
      attributeOption
    );
  }
}
