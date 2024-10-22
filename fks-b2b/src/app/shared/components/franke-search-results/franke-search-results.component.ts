import {Component, Input} from '@angular/core';
import {CmsSearchBoxComponent, RoutingService, WindowRef} from '@spartacus/core';
import {CmsComponentData, SearchBoxComponent} from '@spartacus/storefront';
import {Observable} from 'rxjs';
import {FrankeSearchBoxComponentService} from 'src/app/core/services/franke-search-box/franke-search-box-component.service';

interface SearchResults {
  message?: string;
  products?: any[];
  suggestions?: string[];
  typoSuggestions?: string[];
  total?: number;
}

@Component({
  selector: 'app-franke-search-results',
  templateUrl: './franke-search-results.component.html',
  styleUrls: ['./franke-search-results.component.scss'],
})
export class FrankeSearchResultsComponent extends SearchBoxComponent {
  @Input() visible: boolean;
  @Input() searchInput: any;
  productImgPlaceholder = '../../../../assets/imgs/productImgPlaceholder.jpeg';
  results$: Observable<SearchResults>;

  constructor(
    searchBoxComponentService: FrankeSearchBoxComponentService,
    componentData: CmsComponentData<CmsSearchBoxComponent>,
    winRef: WindowRef,
    routingService: RoutingService
  ) {
    super(searchBoxComponentService, componentData, winRef, routingService);
  }
}
