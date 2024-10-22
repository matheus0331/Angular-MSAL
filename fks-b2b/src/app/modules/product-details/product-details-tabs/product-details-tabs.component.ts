import {Component, OnInit} from '@angular/core';
import {FrankeProduct} from '@shared/models/franke-order';
import {CmsService, CMSTabParagraphContainer, WindowRef} from '@spartacus/core';
import {CmsComponentData, CurrentProductService, TabParagraphContainerComponent} from '@spartacus/storefront';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-product-details-tabs',
  templateUrl: './product-details-tabs.component.html',
  styleUrls: ['./product-details-tabs.component.scss'],
})
export class ProductDetailsTabsComponent
  extends TabParagraphContainerComponent
  implements OnInit {
  product$: Observable<FrankeProduct> = this.currentProductService.getProduct();

  constructor(
    componentData: CmsComponentData<CMSTabParagraphContainer>,
    cmsService: CmsService,
    protected currentProductService: CurrentProductService,
    winRef?: WindowRef
  ) {
    super(componentData, cmsService, winRef);
    this.product$.subscribe((p) => {
      if (p.bundleTemplates) {
        const c = {
          components: 'ProductDownloadsTabComponent',
          typeCode: 'CMSTabParagraphContainer',
          uid: 'TabPanelContainer'
        };
        this.componentData.data$ = of(c);
      }
    });
  }

  ngOnInit(): void {

  }
}
