import {Component, Input} from '@angular/core';
import {OccConfig} from '@spartacus/core';
import {FrankeProductCategoryInspirationCmsComponent} from 'src/app/shared/models/franke-cms';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-inspiration-item-img-right',
  templateUrl: './inspiration-item-img-right.component.html',
  styleUrls: ['./inspiration-item-img-right.component.scss'],
  providers: [WindowSizeUtils],
})
export class InspirationItemImgRightComponent {
  @Input() inspirationItem: FrankeProductCategoryInspirationCmsComponent;
  apiEndpoint: string;
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  constructor(
    protected occConfig: OccConfig,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    this.apiEndpoint = this.occConfig.backend.occ.baseUrl;
  }

  imgSource(): string {
    return this.apiEndpoint + this.inspirationItem.image.url;
  }
}
