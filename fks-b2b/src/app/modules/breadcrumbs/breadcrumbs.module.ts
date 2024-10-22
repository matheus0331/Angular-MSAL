import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigModule, I18nModule} from '@spartacus/core';
import {RouterModule} from '@angular/router';

import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {IconModule, PageSlotModule} from '@spartacus/storefront';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        BreadcrumbComponent: {
          component: BreadcrumbsComponent,
        },
      },
    }),
    RouterModule,
    IconModule,
    I18nModule,
    PageSlotModule,
  ],
})
export class BreadcrumbsModule {
}
