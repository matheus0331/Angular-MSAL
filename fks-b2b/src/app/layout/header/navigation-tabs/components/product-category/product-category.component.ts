import {Component, Input, OnInit} from '@angular/core';
import {OccConfig, WindowRef} from '@spartacus/core';
import {FrankeNavigationNode} from 'src/app/shared/models/franke-navigation-node';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  @Input() productCategory: FrankeNavigationNode;
  apiEndpoint: string;
  currentTab;

  constructor(protected occConfig: OccConfig, protected winRef: WindowRef) {
    this.apiEndpoint = this.occConfig.backend.occ.baseUrl;
    this.currentTab = this.winRef.document.getElementsByClassName(
      'tab-title-2'
    )[0];
  }

  ngOnInit(): void {
  }

  closeNav(): void {
    this.currentTab.children[1].classList.remove('menu-active');
    this.currentTab.classList.remove('tab-active');
    this.currentTab.classList.add('tab-style');
    this.winRef.document.body.classList.remove('nav-menu-is-open');
  }
}
