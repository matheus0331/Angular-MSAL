import {Component} from '@angular/core';
import {CmsComponentWithChildren, CmsService} from '@spartacus/core';
import {CmsComponentData, CurrentProductService, ProductDetailsTabComponent} from '@spartacus/storefront';
import {Observable} from 'rxjs';

import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';
import {DownloadProductDocumentsService} from 'src/app/core/services/download-product-documents/download-product-documents.service';
import {Router} from '@angular/router';

import {FrankeClientServiceScrollService} from 'src/app/core/services/franke-client-service-scroll/franke-client-service-scroll.service';
import {FrankeProduct} from '@shared/models/franke-order';

@Component({
  selector: 'app-product-downloads-tab',
  templateUrl: './product-downloads-tab.component.html',
  styleUrls: ['./product-downloads-tab.component.scss'],
})
export class ProductDownloadsTabComponent extends ProductDetailsTabComponent {
  openById = {};
  productDownloads$: Observable<any> = this.currentProductService
    .getProduct()
    .pipe(
      map((product: FrankeProduct) => {
        return this.downloadProductDocumentsService.createGroups(product);
      })
    );

  constructor(
    protected currentProductService: CurrentProductService,
    private router: Router,
    private clientServiceScrollService: FrankeClientServiceScrollService,
    protected downloadProductDocumentsService: DownloadProductDocumentsService,
    protected componentData: CmsComponentData<CmsComponentWithChildren>,
    protected cmsService: CmsService,
  ) {
    super(currentProductService, componentData, cmsService);
    this.openById['panel-description'] = true;
  }

  handleChange(event: NgbPanelChangeEvent): void {
    this.openById[event.panelId] = event.nextState;
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
