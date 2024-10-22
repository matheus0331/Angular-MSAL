import {Component, Input, OnInit} from '@angular/core';
import {OccConfig, WindowRef} from '@spartacus/core';
import {FrankeNavigationNode} from 'src/app/shared/models/franke-navigation-node';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.scss'],
  providers: [WindowSizeUtils],
})
export class BundlesComponent implements OnInit {
  isMobile$ = this.windowSizeUtils.match(MediaBreakpoint.MOBILE);

  @Input() bundles: FrankeNavigationNode;
  apiEndpoint: string;
  currentTab;

  constructor(
    protected occConfig: OccConfig,
    protected windowSizeUtils: WindowSizeUtils,
    protected winRef: WindowRef
  ) {
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
