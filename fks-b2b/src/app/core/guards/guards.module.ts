import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductVariantsGuard} from '@spartacus/product/variants/components';

import {ExtendedProductVariantGuard} from './extended-product-variant/extended-product-variant.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: ProductVariantsGuard,
      useClass: ExtendedProductVariantGuard,
    },
  ],
})
export class GuardsModule {
}
