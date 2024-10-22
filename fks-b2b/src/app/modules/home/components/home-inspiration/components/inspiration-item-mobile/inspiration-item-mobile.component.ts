import {Component, Input} from '@angular/core';
import {OccConfig} from '@spartacus/core';
import {FrankeProductCategoryInspirationCmsComponent} from 'src/app/shared/models/franke-cms';

@Component({
  selector: 'app-inspiration-item-mobile',
  templateUrl: './inspiration-item-mobile.component.html',
  styleUrls: ['./inspiration-item-mobile.component.scss'],
})
export class InspirationItemMobileComponent {
  @Input() inspirationItem: FrankeProductCategoryInspirationCmsComponent;
  apiEndpoint: string;

  constructor(protected occConfig: OccConfig) {
    this.apiEndpoint = this.occConfig.backend.occ.baseUrl;
  }
}
