import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedAddressFormComponent } from './extended-address-form.component';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormErrorsModule } from '@spartacus/storefront';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExtendedAddressFormComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        AddressFormComponent: {
          component: ExtendedAddressFormComponent,
        }
      },
    } as CmsConfig),
    I18nModule,
    NgSelectModule,
    FormErrorsModule,
    ReactiveFormsModule,
  ],
  exports: [ExtendedAddressFormComponent],
})
export class AddressFormModule { }
