import {Component} from '@angular/core';
import {CmsBannerComponent, CmsService, OccConfig, SemanticPathService} from '@spartacus/core';
import {BannerComponent, CmsComponentData} from '@spartacus/storefront';
import {Observable} from 'rxjs';

import {Brand} from 'src/app/shared/models/brand';
import {BrandsService} from 'src/app/core/services/brands/brands.service';

@Component({
  selector: 'app-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
})
export class HeaderLogoComponent extends BannerComponent {
  currentBrand$: Observable<Brand> = this.brandsService.currentBrand$.asObservable();
  apiEndpoint: string;

  constructor(
    component: CmsComponentData<CmsBannerComponent>,
    protected brandsService: BrandsService,
    protected occConfig: OccConfig,
    protected urlService: SemanticPathService,
    protected cmsService: CmsService
  ) {
    super(component, urlService, cmsService);
    this.apiEndpoint = this.occConfig.backend.occ.baseUrl;
  }
}
