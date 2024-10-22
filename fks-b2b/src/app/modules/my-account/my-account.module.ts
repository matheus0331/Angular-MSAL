import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CmsConfig, ConfigModule, I18nModule} from '@spartacus/core';
import {IconModule, SpinnerModule} from '@spartacus/storefront';
import {UpdateProfileModule} from '@spartacus/user/profile/components';
import {AddressFormModule} from '@shared/components/address-form/address-form.module';
import {CardModule} from '@shared/components/card/card.module';
import {ExtendedAddressBookComponent} from './extended-address-book/extended-address-book.component';
import {ProfileComponent} from './profile/profile.component';


@NgModule({
  declarations: [ProfileComponent, ExtendedAddressBookComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        UpdateProfileComponent: {
          component: ProfileComponent,
        },
        AccountAddressBookComponent: {
          component: ExtendedAddressBookComponent,
        },
      },
    } as CmsConfig),
    UpdateProfileModule,
    SpinnerModule,
    I18nModule,
    CardModule,
    AddressFormModule,
    IconModule,
  ],
})
export class MyAccountModule {
}
