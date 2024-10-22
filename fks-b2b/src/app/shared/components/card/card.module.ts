import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedCardComponent } from './extended-card.component';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';

@NgModule({
  declarations: [ExtendedCardComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        CardComponent: {
          component: ExtendedCardComponent
        },
      }
    } as CmsConfig),
    IconModule,
    I18nModule,
  ],
  exports: [ExtendedCardComponent]
})
export class CardModule { }
