import {Component, ElementRef, Renderer2} from '@angular/core';
import {FacetListComponent} from '@spartacus/storefront';
import {FrankeFacetService} from 'src/app/core/services/franke-facet/franke-facet.service';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-facets-filters',
  templateUrl: './facets-filters.component.html',
  styleUrls: ['./facets-filters.component.scss'],
  providers: [WindowSizeUtils],
})
export class FacetsFiltersComponent extends FacetListComponent {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  constructor(
    facetService: FrankeFacetService,
    elementRef: ElementRef,
    renderer: Renderer2,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    super(facetService, elementRef, renderer);
  }
}
