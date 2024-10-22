import {Component} from '@angular/core';
import {CmsService} from '@spartacus/core';
import {CmsComponentData} from '@spartacus/storefront';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {FrankeBannerComponent} from 'src/app/shared/models/franke-cms';

@Component({
  selector: 'app-home-banner-carousel',
  templateUrl: './home-banner-carousel.component.html',
  styleUrls: ['./home-banner-carousel.component.scss'],
})
export class HomeBannerCarouselComponent {
  slidesPath =
    'body > app-root > cx-storefront > main > cx-page-layout > cx-page-slot.Section1.has-components > app-home-banner-carousel > app-franke-carousel > div.carousel-panel.size-1 > div';
  indicatorsPath =
    'body > app-root > cx-storefront > main > cx-page-layout > cx-page-slot.Section1.has-components > app-home-banner-carousel > app-franke-carousel > div.indicators > button';

  frankeBannerComponent$: Observable<FrankeBannerComponent> = this.componentData
    .data$;

  private componentData$: Observable<FrankeBannerComponent> = this.componentData.data$.pipe(
    filter(Boolean)
  );

  items$: Observable<
    Observable<FrankeBannerComponent>[]
  > = this.componentData$.pipe(
    map((data) => data.frankeCollectionComponents?.trim().split(' ') ?? []),
    map((uid) =>
      uid.map((component) =>
        this.cmsService.getComponentData<FrankeBannerComponent>(component)
      )
    )
  );

  constructor(
    private componentData: CmsComponentData<FrankeBannerComponent>,
    private cmsService: CmsService
  ) {
  }
}
