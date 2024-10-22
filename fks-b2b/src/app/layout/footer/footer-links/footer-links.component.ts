import { Component, Input } from '@angular/core';
import { NavigationUIComponent } from '@spartacus/storefront';
import { FrankeNavigationNode } from 'src/app/shared/models/franke-navigation-node';

@Component({
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html',
  styleUrls: ['./footer-links.component.scss'],
})
export class FooterLinksComponent extends NavigationUIComponent {
  @Input() node: FrankeNavigationNode;
  socialIcons = ['LINKEDIN', 'FACEBOOK', 'YOUTUBE', 'INSTAGRAM', 'PINTEREST'];
}
