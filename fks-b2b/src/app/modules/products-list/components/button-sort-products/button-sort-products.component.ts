import {Component} from '@angular/core';
import {SortingComponent} from '@spartacus/storefront';

@Component({
  selector: 'app-button-sort-products',
  templateUrl: './button-sort-products.component.html',
  styleUrls: ['./button-sort-products.component.scss'],
})
export class ButtonSortProductsComponent extends SortingComponent {
}
