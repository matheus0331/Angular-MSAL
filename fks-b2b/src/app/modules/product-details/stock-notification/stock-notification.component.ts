import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, first, tap} from 'rxjs/operators';
import {GlobalMessageService, GlobalMessageType, Product, TranslationService} from '@spartacus/core';
import {FrankeOrderNotificationService} from 'src/app/core/services/franke-order-notification/franke-order-notification.service';
import {CurrentProductService} from '@spartacus/storefront';

@Component({
  selector: 'app-stock-notification',
  templateUrl: './stock-notification.component.html',
  styleUrls: ['./stock-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockNotificationComponent {

  product: Product;
  product$: Observable<Product> = this.currentProductService.getProduct().pipe(
    filter((product) => Boolean(product)),
    tap((product) => this.product = product)
  );

  constructor(
    private globalMessageService: GlobalMessageService,
    private translationService: TranslationService,
    private frankeOrderNotificationService: FrankeOrderNotificationService,
    private currentProductService: CurrentProductService
  ) {
  }

  get isLoading$(): Observable<boolean> {
    return this.frankeOrderNotificationService.updatingStochNotification$;
  }

  toogleProductStockNotification(createNotification: boolean = true): void {
    this.frankeOrderNotificationService
      .toogleProductStockNotification(this.product.code, createNotification)
      .subscribe((active: boolean) => {
        // Manually updating backInStockNotification becase we are not using the store and cms backinstock components
        // Should be removed if we change to cms component
        this.product.backInStockNotification = active;
        if (!createNotification) {
          this.onStopNotificaitonSuccess();
        }
      });
  }

  private onStopNotificaitonSuccess(): void {
    this.translationService
      .translate('stockNotification.unsubscribeSuccess')
      .pipe(first())
      .subscribe((text) =>
        this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_INFO)
      );
  }
}
