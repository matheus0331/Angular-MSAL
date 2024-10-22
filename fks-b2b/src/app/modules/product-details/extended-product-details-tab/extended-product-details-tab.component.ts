import {Component} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {CmsComponentWithChildren, CmsService, OccConfig, ProductScope} from '@spartacus/core';
import {CmsComponentData, CurrentProductService, ProductDetailsTabComponent} from '@spartacus/storefront';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {FrankeClientServiceScrollService} from 'src/app/core/services/franke-client-service-scroll/franke-client-service-scroll.service';
import {groupBy} from '@modules/utils/groupby';

@Component({
  selector: 'app-extended-product-details-tab',
  templateUrl: './extended-product-details-tab.component.html',
  styleUrls: ['./extended-product-details-tab.component.scss'],
})
export class ExtendedProductDetailsTabComponent extends ProductDetailsTabComponent {
  openById = {};
  productAtributes$: Observable<any> = this.currentProductService
    .getProduct(ProductScope.ATTRIBUTES)
    .pipe(
      map((product) => {
        if (product.classifications) {
          const features: any[] = product.classifications
            .map((classifications) => classifications?.features)
            .reduce((acc, curr) => [...acc, ...curr], []);

          const groupedFeatures = groupBy(
            features,
            (a) => a.groupLabel
          );

          delete groupedFeatures.undefined;
          let groupedFeatureGroups = groupBy(
            features,
            (attribute) => attribute.group
          );

          delete groupedFeatureGroups.undefined;

          const groupedPerformances = groupBy(
            features.filter((element: any) => element.style === 'graph'),
            (attribute) => attribute.name
          );

          function replaceValue(item: any): void {
            item[1].forEach((element: any) => {
              if (element.style === 'graph') {
                groupedFeatures[item[0]] = Object.entries(groupedPerformances);
              }
            });
          }

          groupedFeatureGroups = Object.entries(groupedFeatureGroups);
          Object.entries(groupedFeatures).map((item) => replaceValue(item));

          let i = -1;

          return Object.keys(groupedFeatures).map((key: any) => {
            i++;
            return {
              groupLabel: key,
              features: groupedFeatures[key],
              group: groupedFeatureGroups[i][0],
            };
          });
        }
        return {};
      })
    );

  constructor(
    protected currentProductService: CurrentProductService,
    protected occConfig: OccConfig,
    private router: Router,
    private clientServiceScrollService: FrankeClientServiceScrollService,
    protected componentData: CmsComponentData<CmsComponentWithChildren>,
    protected cmsService: CmsService
  ) {
    super(currentProductService, componentData, cmsService);
    this.openById['panel-description'] = true;
  }

  handleChange(event: NgbPanelChangeEvent): void {
    this.openById[event.panelId] = event.nextState;
  }

  getProductSymbolUrl(symbolUrl: string): string {
    return this.occConfig.backend.occ.baseUrl + symbolUrl;
  }

  processLinks(event: any): void {
    const element: HTMLElement = event.target;
    const link = element.getAttribute('href');
    const linkClass = element.getAttribute('class');
    if (link) {
      if (link.startsWith('/')) {
        event.preventDefault();
        if (linkClass) {
          if (linkClass.toString() === 'form') {
            this.router.navigateByUrl(link);
            this.clientServiceScrollService.activateScroll(
              this.router.url,
              'scroll-section-contact-form'
            );
          }
        }
        this.router.navigateByUrl(link);
      }
    }
  }
}
