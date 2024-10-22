import {Component, ElementRef, EventEmitter, Input, Output, ViewChild,} from '@angular/core';
import {CmsSearchBoxComponent, RoutingService, WindowRef} from '@spartacus/core';
import {CmsComponentData, SearchBoxComponent, SearchBoxComponentService,} from '@spartacus/storefront';

@Component({
  selector: 'app-franke-search-box',
  templateUrl: './franke-search-box.component.html',
  styleUrls: ['./franke-search-box.component.scss'],
})
/*  implements OnInit, OnDestroy */
export class FrankeSearchBoxComponent extends SearchBoxComponent {
  @Output() value = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<any>();
  @Output() startFocus = new EventEmitter<any>();
  @Input() searchText: string;
  @ViewChild('searchInput') searchInputRef: ElementRef<HTMLInputElement>;

  constructor(
    searchBoxComponentService: SearchBoxComponentService,
    componentData: CmsComponentData<CmsSearchBoxComponent>,
    routingService: RoutingService,
    protected winRef: WindowRef
  ) {
    super(searchBoxComponentService, componentData, winRef, routingService);
    this.config = {
      minCharactersBeforeRequest: 1,
      displayProducts: true,
      displaySuggestions: true,
      maxProducts: 200,
      maxSuggestions: 10,
      displayProductImages: true,
    };
  }

  emitValue(value): void {
    this.value.emit(value);
  }

  emitToggle(value): void {
    this.toggle.emit(value);
  }

  emitFocus(value): void {
    this.startFocus.emit(value);
  }
}
