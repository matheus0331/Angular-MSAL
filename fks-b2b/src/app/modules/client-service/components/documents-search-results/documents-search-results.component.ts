import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CmsSearchBoxComponent, Product, RoutingService, WindowRef} from '@spartacus/core';
import {CmsComponentData, SearchBoxComponent} from '@spartacus/storefront';
import {FrankeSearchBoxComponentService} from 'src/app/core/services/franke-search-box/franke-search-box-component.service';
import {FrankeSearchBoxComponent} from 'src/app/shared/components/franke-search-box/franke-search-box.component';
import {FrankeSearchResultsComponent} from 'src/app/shared/components/franke-search-results/franke-search-results.component';
import {DocumentsSearchComponent} from '../documents-search/documents-search.component';

@Component({
  selector: 'app-documents-search-results',
  templateUrl: './documents-search-results.component.html',
  styleUrls: ['./documents-search-results.component.scss'],
  providers: [SearchBoxComponent, DocumentsSearchComponent],
})
export class DocumentsSearchResultsComponent extends FrankeSearchResultsComponent {
  @Input() searchInputRef: FrankeSearchBoxComponent;
  @Output() product = new EventEmitter<Product>();

  constructor(
    protected documentsSearchComponent: DocumentsSearchComponent,
    searchBoxComponentService: FrankeSearchBoxComponentService,
    componentData: CmsComponentData<CmsSearchBoxComponent>,
    routingService: RoutingService,
    winRef: WindowRef
  ) {
    super(searchBoxComponentService, componentData, winRef, routingService);
  }

  emitProduct(product): void {
    this.product.emit(product);
  }

  closeResults(): void {
    this.clear(this.searchInputRef.searchInputRef.nativeElement);
  }
}
