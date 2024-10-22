import {Component, ElementRef, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {LaunchDialogService} from '@spartacus/storefront';
import {FrankeOrderDetailsService} from '@core/services/franke-order-details/franke-order-details.service';
import {FrankeOrderDetails} from '@shared/models/franke-order';
import {AlternativeProduct} from 'src/app/shared/models/alternative-products';
import {FRANKE_LAUNCH_CALLER} from '@shared/models/augmented-core';
import {take} from 'rxjs/operators';
import {EventsTrackerService} from '@core/services/events-tracker/events-tracker.service';

@Component({
  selector: 'app-order-detail-alternative-products-overlay-button',
  templateUrl:
    './order-detail-alternative-products-overlay-button.component.html',
  styleUrls: [
    './order-detail-alternative-products-overlay-button.component.scss',
  ],
})
export class OrderDetaiAlternativeProductsOverlayButtonComponent {

  @Input() order: FrankeOrderDetails;

  @ViewChild('alternativeProductsDialog') alternativeProductsDialog: ViewContainerRef;
  @ViewChild('replaceProductDialog') replaceProductDialog: ViewContainerRef;
  @ViewChild('open') openElement: ElementRef;
  selectedForReplacement: AlternativeProduct = null;

  constructor(
    private launchDialogService: LaunchDialogService,
    private frankeOrderDetailsServicervice: FrankeOrderDetailsService,
    private eventsTrackerService: EventsTrackerService
  ) {
  }

  get deliveryDate(): Date {
    // we receive a "originalDeliveryDate" from the backend in the field "frozenDeliveryDate"
    const originalDeliveryDate = this.order.frozenDeliveryDate.replace(
      // this transorms 20230422 into 2023-04-22
      /(\d{4})(\d{2})(\d{2})/g,
      '$1-$2-$3'
    );
    // when requesting alternatives availability however, we need to return alternatives for the correct delivery date
    // which means do not ask for alternatives in the past even if the item was supposed to have been delivered (here we send today's date)
    // if originalDeliveryDate < today ? requestDate = today : requestDate = originalDeliveryDate
    const requestDate = new Date(originalDeliveryDate);
    if (requestDate < new Date()) {
      return new Date();
    }
    return requestDate;
  }

  handleActionClick(alternativeProduct: AlternativeProduct): void {
    this.selectedForReplacement = alternativeProduct;
    this.launchDialogService.closeDialog('No reason');
    this.openReplaceProductModal();
  }

  handleReplaceActionClick(replace: boolean): void {
    if (!replace) {
      this.selectedForReplacement = null;
    } else {
      this.frankeOrderDetailsServicervice.handleReplaceItemInOrder({
        productCode: this.selectedForReplacement.FUN,
        salesItem: this.order.item,
      });
    }
    this.launchDialogService.closeDialog('Close');
  }

  openAlternativeProductsModal(): void {
    this.selectedForReplacement = null;
    this.eventsTrackerService.sendAlternativeProductsEvent(this.order?.product);
    const dialog = this.launchDialogService.openDialog(FRANKE_LAUNCH_CALLER.ALTERNATIVE_PRODUCTS,
      null, this.alternativeProductsDialog, {productCode: this.order.product.code});
    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  openReplaceProductModal(): void {
    const dialog = this.launchDialogService.openDialog(FRANKE_LAUNCH_CALLER.REPLACE_PRODUCTS, null,
      this.replaceProductDialog);
    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
}
