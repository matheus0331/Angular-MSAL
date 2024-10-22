import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {CmsComponentData, HamburgerMenuService, NavigationUIComponent} from '@spartacus/storefront';
import {CmsNavigationComponent, CmsService, OccConfig, WindowRef} from '@spartacus/core';
import {Observable} from 'rxjs';

import {FrankeNavigationNode} from 'src/app/shared/models/franke-navigation-node';
import {BrandsService} from 'src/app/core/services/brands/brands.service';
import {FrankeThemeService} from '@core/services/franke-theme/franke-theme.service';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {FrankeNavigationNodeService} from 'src/app/core/services/franke-navigation-node/franke-navigation-node.service';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss'],
  providers: [WindowSizeUtils],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTabsComponent
  extends NavigationUIComponent
  implements AfterViewInit {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  @Input() node: FrankeNavigationNode;
  apiEndpoint: string;
  visible = false;
  currentTabNumber = 0;

  navigationTabsElement;
  tabsHeaderElement;
  tabsParent;
  productsLength;

  node$: Observable<FrankeNavigationNode> = this.navigationNodeService.getNavigationNode(
    this.componentData.data$
  );

  constructor(
    router: Router,
    protected navigationRouter: Router,
    renderer: Renderer2,
    elemRef: ElementRef<any>,
    private brandsService: BrandsService,
    protected occConfig: OccConfig,
    protected winRef: WindowRef,
    // required to change theme after changing brand
    private themeService: FrankeThemeService,
    protected windowSizeUtils: WindowSizeUtils,
    protected cms: CmsService,
    protected componentData: CmsComponentData<CmsNavigationComponent>,
    protected navigationNodeService: FrankeNavigationNodeService, hamburgerMenuService: HamburgerMenuService
  ) {
    super(router, renderer, elemRef, hamburgerMenuService, winRef);
    this.apiEndpoint = this.occConfig.backend.occ.baseUrl;
  }

  ngAfterViewInit(): void {
    this.tabsHeaderElement = this.winRef.document.getElementsByClassName(
      'tabs'
    )[0].parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
    this.tabsParent = this.winRef.document.getElementsByClassName(
      'tabs'
    )[0].parentElement;
    this.navigationTabsElement = this.winRef.document.getElementsByClassName(
      'tabs'
    )[0];

    this.isDesktop$.subscribe((isDesktop) => {
      if (!isDesktop) {
        if (this.tabsHeaderElement.classList.contains('header')) {
          this.navigationTabsElement.remove();
        }
      } else {
        this.tabsParent.appendChild(this.navigationTabsElement);
      }
    });
    this.node$.subscribe((nodeData) => {
      this.productsLength = nodeData?.children[1]?.children?.length;
    });
  }

  setCurrentBrand(code: string): void {
    this.brandsService.setCurrentBrand(code);
    const currentTab = this.winRef.document.getElementsByClassName(
      'tab-title-' + this.currentTabNumber
    )[0];
    this.hideNavTab(currentTab);
    this.visible = false;
    this.reloadComponent();
  }

  reloadComponent(): void {
    this.cms.refreshLatestPage();
    this.navigationRouter.routeReuseStrategy.shouldReuseRoute = () => false;
    this.navigationRouter.onSameUrlNavigation = 'reload';
    this.navigationRouter.navigate(['/']);
  }

  showNavTab(navTab: any): void {
    navTab.children[1].classList.add('menu-active');
    navTab.classList.add('tab-active');
    navTab.classList.remove('tab-style');

    this.winRef.document.body.classList.add('nav-menu-is-open');
  }

  hideNavTab(navTab: any): void {
    navTab.children[1].classList.remove('menu-active');
    navTab.classList.remove('tab-active');
    navTab.classList.add('tab-style');
    this.winRef.document.body.classList.remove('nav-menu-is-open');
  }

  toggleTab(tabNumber: number, child: any): void {
    if (this.visible && tabNumber !== this.currentTabNumber) {
      const previousTab = this.winRef.document.getElementsByClassName(
        'tab-title-' + this.currentTabNumber
      )[0];
      this.hideNavTab(previousTab);
      this.visible = !this.visible;
    }

    this.currentTabNumber = tabNumber;
    const currentTab = this.winRef.document.getElementsByClassName(
      'tab-title-' + this.currentTabNumber
    )[0];

    if (tabNumber === 2) {
      const productTab = currentTab.children[1]
        .firstElementChild as HTMLElement;
      if (this.productsLength === 8) {
        productTab.style.maxWidth = '812px';
      } else if (this.productsLength > 8 && this.productsLength < 11) {
        productTab.style.maxWidth = '1015px';
      } else if (this.productsLength > 11 && this.productsLength < 13) {
        productTab.style.maxWidth = '1218px';
      }
    }

    // tslint:disable-next-line: prefer-const
    let navBarListener = (event) => {
      if (!this.childOf(event.target)) {
        if (this.currentTabNumber > 0) {
          this.hideNavTab(currentTab);
          this.visible = false;
          this.winRef.document.removeEventListener('click', navBarListener);
        }
      }
    };

    if (typeof currentTab.children[1] !== 'undefined') {
      this.visible = !this.visible;
      if (this.visible) {
        this.showNavTab(currentTab);
        this.winRef.document.addEventListener('click', navBarListener);
      } else {
        this.hideNavTab(currentTab);
        this.currentTabNumber = 0;
      }
    }
  }

  childOf(node: any): boolean {
    const tabs = this.winRef.document.getElementsByClassName('tabs')[0];

    let child = node;

    while (child !== null) {
      if (child === tabs) {
        return true;
      }
      child = child.parentNode;
    }
    return false;
  }

  hasLink(child: any): void {
    return child.title !== 'Brands' && child.title !== 'Products'
      ? child.url
      : null;
  }

}
