import {Component, OnInit} from '@angular/core';
import {CmsService, OccConfig} from '@spartacus/core';
import {CmsComponentData} from '@spartacus/storefront';
import {Observable} from 'rxjs';
import {FrankeBannerComponent} from '../../models/franke-cms';
import {WindowMoveUtils} from '../../utils/window-move-utils';

@Component({
  selector: 'app-franke-banner-collection',
  templateUrl: './franke-banner-collection.component.html',
  styleUrls: ['./franke-banner-collection.component.scss'],
  providers: [WindowMoveUtils],
})
export class FrankeBannerCollectionComponent
  extends CmsComponentData<FrankeBannerComponent>
  implements OnInit {
  frankeBannerComponent$: Observable<FrankeBannerComponent> = this.componentData
    .data$;
  apiEndpoint = this.occConfig.backend.occ.baseUrl;

  constructor(
    protected cmsService: CmsService,
    protected componentData: CmsComponentData<FrankeBannerComponent>,
    protected occConfig: OccConfig,
    protected windowMoveUtils: WindowMoveUtils
  ) {
    super();
  }

  ngOnInit(): void {
    this.windowMoveUtils.goToTop();
  }
}
