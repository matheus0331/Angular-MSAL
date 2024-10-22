import {Component} from '@angular/core';
import {BreakpointService, ProductFacetNavigationComponent} from '@spartacus/storefront';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-products-list-filters',
  templateUrl: './products-list-filters.component.html',
  styleUrls: ['./products-list-filters.component.scss'],
  providers: [WindowSizeUtils],
})
export class ProductsListFiltersComponent extends ProductFacetNavigationComponent {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  constructor(
    breakpointService: BreakpointService,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    super(breakpointService);
  }
}
