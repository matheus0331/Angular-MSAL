import {Component} from '@angular/core';

import {FooterNavigationComponent} from '@spartacus/storefront';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [FooterNavigationComponent],
})
export class FooterComponent extends FooterNavigationComponent {
  copyright = `© Franke ${new Date().getUTCFullYear()}`;
}
