import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LaunchDialogService} from '@spartacus/storefront';
import {FrankeOrderEntry} from 'src/app/shared/models/franke-order';
import {NgbUtilsService} from 'src/app/shared/utils/ngb-utils';
import {Subject} from 'rxjs';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {FrankeCartService} from 'src/app/core/services/franke-cart/franke-cart.service';
import {ProductAvailabilityService} from 'src/app/core/services/product-availability/product-availability.service';
import {take, takeUntil} from 'rxjs/operators';
import {BaseSiteService, OccEndpointsService} from '@spartacus/core';
import {ExtendedBaseStore} from 'src/app/shared/models/misc';
import {FRANKE_LAUNCH_CALLER} from '@shared/models/augmented-core';
import {EventsTrackerService} from '@core/services/events-tracker/events-tracker.service';
import {AlternativeProduct} from '@shared/models/alternative-products';

@Component({
  selector: 'app-shopping-cart-alternative-products-overlay-button',
  templateUrl:
    './shopping-cart-alternative-products-overlay-button.component.html',
  styleUrls: [
    './shopping-cart-alternative-products-overlay-button.component.scss',
  ],
})
export class ShoppingCartAlternativeProductsOverlayButtonComponent
  implements OnInit, OnDestroy {
  @Input() entry: FrankeOrderEntry;

  deliveryDate: Date;

  destroyed$ = new Subject<boolean>();

  showAlternativesInCart: boolean;

  constructor(
    private launchDialogService: LaunchDialogService,
    private ngbUtilsService: NgbUtilsService,
    private frankeCartService: FrankeCartService,
    protected productAvailabilityService: ProductAvailabilityService,
    private storeService: BaseSiteService,
    private http: HttpClient,
    private endpoint: OccEndpointsService,
    private cd: ChangeDetectorRef,
    private eventsTrackerService: EventsTrackerService
  ) {
  }

  ngOnInit(): void {
    this.setDeliveryDate();

    this.storeService.getActive().subscribe((store) => {
      this.http
        .get<ExtendedBaseStore>(this.endpoint.buildUrl(`/basestores/${store}`))
        .subscribe((data) => {
          this.showAlternativesInCart = data.showAlternativesInCart;
          this.cd.detectChanges();
          this.cd.detach();
        });

    });
  }

  setDeliveryDate(): void {
    this.productAvailabilityService.deliveryDate$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((date: NgbDate) => {
        this.deliveryDate = this.ngbUtilsService.generateDateFromNgbDate(date);
      });
  }

  handleActionClick(product: AlternativeProduct): void {
    this.frankeCartService.handleReplaceEntry(this.entry, product.FUN);
  }

  openAlternativeProductsModal(content: any): void {
    this.eventsTrackerService.sendAlternativeProductsEvent(this.entry?.product);
    const dialog = this.launchDialogService.openDialog(FRANKE_LAUNCH_CALLER.ALTERNATIVE_PRODUCTS,
      null, content, {
        productCode: this.entry?.product?.code,
        actionButtonLabel: 'cartAlternativeProducts.replaceCartItem',
        actionButtonAction: this.handleActionClick,
        ref: this
      });
    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
