import {Component} from '@angular/core';
import {SearchboxComponent} from '../searchbox/searchbox.component';
import {CmsComponentData, SearchBoxComponent} from '@spartacus/storefront';
import {FrankeSearchResultsComponent} from 'src/app/shared/components/franke-search-results/franke-search-results.component';
import {FrankeSearchBoxComponentService} from 'src/app/core/services/franke-search-box/franke-search-box-component.service';
import {CmsSearchBoxComponent, RoutingService, WindowRef} from '@spartacus/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [SearchBoxComponent, SearchboxComponent],
})
export class SearchResultsComponent extends FrankeSearchResultsComponent {
  constructor(
    protected searchboxComponent: SearchboxComponent,
    searchBoxComponentService: FrankeSearchBoxComponentService,
    componentData: CmsComponentData<CmsSearchBoxComponent>,
    winRef: WindowRef,
    routingService: RoutingService
  ) {
    super(searchBoxComponentService, componentData, winRef, routingService);
  }
}
