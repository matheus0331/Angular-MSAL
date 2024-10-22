import {Component, Input} from '@angular/core';
import {OccConfig} from '@spartacus/core';
import {FrankeProductCategoryInspirationCmsComponent} from 'src/app/shared/models/franke-cms';

@Component({
  selector: 'app-inspiration-item-large-img',
  templateUrl: './inspiration-item-large-img.component.html',
  styleUrls: ['./inspiration-item-large-img.component.scss'],
})
export class InspirationItemLargeImgComponent {
  @Input() inspirationItem: FrankeProductCategoryInspirationCmsComponent;
  apiEndpoint: string;

  constructor(protected occConfig: OccConfig) {
    this.apiEndpoint = this.occConfig.backend.occ.baseUrl;
  }
}
