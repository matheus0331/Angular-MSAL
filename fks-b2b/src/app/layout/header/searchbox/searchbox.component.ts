import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {CmsSearchBoxComponent, RoutingService, SearchboxService, Translatable, WindowRef} from '@spartacus/core';
import {CmsComponentData, SearchBoxComponentService} from '@spartacus/storefront';
import {Subscription} from 'rxjs';

import {FrankeSearchBoxComponent} from 'src/app/shared/components/franke-search-box/franke-search-box.component';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
  providers: [WindowSizeUtils],
})
export class SearchboxComponent
  extends FrankeSearchBoxComponent
  implements OnInit, OnDestroy {
  searchInput: any;
  visible = false;
  isMobile$ = this.windowSizeUtils.match(MediaBreakpoint.MOBILE);
  private routeSub: Subscription;

  constructor(
    private searchboxService: SearchboxService,
    searchBoxComponentService: SearchBoxComponentService,
    componentData: CmsComponentData<CmsSearchBoxComponent>,
    winRef: WindowRef,
    routingService: RoutingService,
    private router: Router,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    super(searchBoxComponentService, componentData, routingService, winRef);
  }

  ngOnInit(): void {
    this.visible = false;

    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.visible) {
        this.toggleSearch();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  onChanged(searchInput: any): void {
    this.searchInput = searchInput;
  }

  toggleSearch(): void {
    const searchBar = this.winRef.document.getElementsByClassName(
      'search-bar'
    )[0];
    const searchInput = this.winRef.document.querySelector(
      'input[aria-label="search"]'
    );

    // tslint:disable-next-line: prefer-const
    let searchListener = (event) => {
      if (!this.childOf(event.target)) {
        if (!this.childOf(event.target) && this.visible) {
          this.removeFocus(searchInput);
          this.hideSearchBar(searchBar);
          this.visible = !this.visible;
          this.clearSearchInput(searchInput);
          this.searchboxService.clearResults();
          this.winRef.document.removeEventListener('click', searchListener);
        }
      }
    };

    this.visible = !this.visible;
    if (this.visible) {
      this.showSearchBar(searchBar);
      this.setFocus(searchInput);
      this.winRef.document.addEventListener('click', searchListener);
    } else {
      this.removeFocus(searchInput);
      this.hideSearchBar(searchBar);
    }
    this.clearSearchInput(searchInput);
    this.searchboxService.clearResults();
  }

  hideSearchBar(searchBar: any): void {
    searchBar.classList.add('hidden');
  }

  showSearchBar(searchBar: any): void {
    searchBar.classList.remove('hidden');
  }

  setFocus(searchInput: any): void {
    searchInput.focus();
  }

  removeFocus(searchInput: any): void {
    searchInput.blur();
    this.winRef.document.body.classList.remove('searchbox-is-active');
  }

  clearSearchInput(searchInput: any): void {
    this.clear(searchInput);
  }

  openSearchBox(searchInput: any, searchBar: any, searchListener: any): void {
    this.setFocus(searchInput);
    this.winRef.document.addEventListener('click', searchListener);
  }

  closeSearchBox(searchInput: any, searchBar: any): void {
    this.removeFocus(searchInput);
  }

  clearSearchBox(searchInput: any): void {
    this.clearSearchInput(searchInput);
    this.searchboxService.clearResults();
  }

  childOf(node: any): boolean {
    const searchBar = this.winRef.document.getElementsByClassName(
      'search-bar'
    )[0];
    const searchResults = this.winRef.document.getElementsByClassName(
      'search-results'
    )[0];
    const searchBox = this.winRef.document.getElementsByClassName(
      'search-box'
    )[0];

    let child = node;

    while (child !== null) {
      if (
        child === searchBar ||
        child === searchResults ||
        child === searchBox
      ) {
        return true;
      }
      child = child.parentNode;
    }
    return false;
  }

  displaySearchText(isMobile: boolean): Translatable | string {
    return isMobile
      ? {key: 'searchBox.searchBarMobileText'}
      : {key: 'searchBox.searchBarText'};
  }
}
