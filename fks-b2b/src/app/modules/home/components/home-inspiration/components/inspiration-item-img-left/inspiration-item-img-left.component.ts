import {Component, Input} from '@angular/core';
import {OccConfig} from '@spartacus/core';
import {FrankeProductCategoryInspirationCmsComponent} from 'src/app/shared/models/franke-cms';

@Component({
  selector: 'app-inspiration-item-img-left',
  templateUrl: './inspiration-item-img-left.component.html',
  styleUrls: ['./inspiration-item-img-left.component.scss'],
})
export class InspirationItemImgLeftComponent {
  @Input() inspirationItem: FrankeProductCategoryInspirationCmsComponent;
  apiEndpoint: string;

  constructor(protected occConfig: OccConfig) {
    this.apiEndpoint = this.occConfig.backend.occ.baseUrl;
  }
}
