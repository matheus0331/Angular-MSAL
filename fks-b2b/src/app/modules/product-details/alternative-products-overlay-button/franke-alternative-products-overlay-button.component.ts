import {AlternativeProduct} from '@shared/models/alternative-products';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CmsComponentData, CurrentProductService, LaunchDialogService} from '@spartacus/storefront';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {FrankeAlternativeProductsOverlayButton as OverlayButton} from '../../../shared/models/franke-cms';
import {FrankeCurrentProductService} from '@core/services/franke-current-product-service/franke-current-product-service';
import {FrankeAlternativeProductsService} from '@core/services/franke-alternative-products/franke-alternative-products.service';
import {FRANKE_LAUNCH_CALLER} from '@shared/models/augmented-core';
import {EventsTrackerService} from '@core/services/events-tracker/events-tracker.service';

@Component({
  selector: 'app-franke-alternative-products-overlay-button',
  templateUrl: './franke-alternative-products-overlay-button.component.html',
  styleUrls: ['./franke-alternative-products-overlay-button.component.scss'],
})
export class FrankeAlternativeProductsOverlayButtonComponent
  extends CmsComponentData<OverlayButton>
  implements OnInit, OnDestroy {
  productCode: string;
  destroyed$ = new Subject<boolean>();
  @ViewChild('open') openElement: ElementRef;

  constructor(
    protected frankeCurrentProductService: FrankeCurrentProductService,
    private frankeAlternativeProductsService: FrankeAlternativeProductsService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    private eventsTrackerService: EventsTrackerService,
    private currentProductService: CurrentProductService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setProductCode();
  }

  setProductCode(): void {
    this.frankeCurrentProductService
      .getProductCode()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((code) => {
        this.productCode = code;
      });
  }

  openAlternativeProductsModal(actionButtonLabelStr: string): void {
    this.currentProductService.getProduct().subscribe((product) => {
      this.eventsTrackerService.sendAlternativeProductsEvent(product);
    });
    const dialog = this.launchDialogService.openDialog(FRANKE_LAUNCH_CALLER.ALTERNATIVE_PRODUCTS,
      this.openElement,
      this.vcr,
      {
        productCode: this.productCode,
        actionButtonLabel: actionButtonLabelStr
      });
    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  handleActionClick(product: AlternativeProduct): void {
    this.launchDialogService.closeDialog('No reason');
    this.frankeAlternativeProductsService.goToProduct(product.FUN);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
