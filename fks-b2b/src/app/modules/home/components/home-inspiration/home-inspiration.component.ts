import {Component, Input} from '@angular/core';

import {FrankeProductCategoryInspirationCmsComponent} from 'src/app/shared/models/franke-cms';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-home-inspiration',
  templateUrl: './home-inspiration.component.html',
  styleUrls: ['./home-inspiration.component.scss'],
  providers: [WindowSizeUtils],
})
export class HomeInspirationComponent {
  @Input() frankeCmsInspiration: FrankeProductCategoryInspirationCmsComponent;
  @Input() inspirationItems: FrankeProductCategoryInspirationCmsComponent;
  isTableOrDesktop$ = this.windowSizeUtils.match(
    MediaBreakpoint.TABLET_OR_DESKTOP
  );

  constructor(protected windowSizeUtils: WindowSizeUtils) {
  }
}
