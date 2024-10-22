import {Component} from '@angular/core';
import {FacetListComponent} from '@spartacus/storefront';

@Component({
  selector: 'app-quick-filters',
  templateUrl: './quick-filters.component.html',
  styleUrls: ['./quick-filters.component.scss'],
})
export class QuickFiltersComponent extends FacetListComponent {
}
