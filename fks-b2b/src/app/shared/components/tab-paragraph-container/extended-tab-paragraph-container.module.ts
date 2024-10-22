import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CmsConfig, I18nModule, provideDefaultConfig} from '@spartacus/core';
import {OutletModule, PageComponentModule, TabParagraphContainerComponent} from '@spartacus/storefront';
import {
  ExtendedTabParagraphContainerComponent
} from '@shared/components/tab-paragraph-container/extended-tab-paragraph-container.component';


@NgModule({
  imports: [CommonModule, PageComponentModule, OutletModule, I18nModule],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        CMSTabParagraphContainer: {
          component: TabParagraphContainerComponent,
        },
      },
    } as CmsConfig),
  ],
  declarations: [ExtendedTabParagraphContainerComponent],
  exports: [ExtendedTabParagraphContainerComponent],
})
export class ExtendedTabParagraphContainerModule {
}
