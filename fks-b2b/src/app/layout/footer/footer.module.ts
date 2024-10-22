import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer.component';
import {ConfigModule, I18nModule} from '@spartacus/core';
import {GenericLinkModule, IconModule, NavigationModule} from '@spartacus/storefront';
import {FooterLinksComponent} from './footer-links/footer-links.component';

@NgModule({
  declarations: [FooterComponent, FooterLinksComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        FooterNavigationComponent: {
          component: FooterComponent,
        },
      },
    }),
    NavigationModule,
    IconModule,
    I18nModule,
    GenericLinkModule,
  ],
})
export class FooterModule {
}
