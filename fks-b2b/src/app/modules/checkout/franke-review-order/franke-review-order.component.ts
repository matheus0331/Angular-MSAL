import {DOCUMENT} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Address, Image, TranslationService, UserCostCenterService} from '@spartacus/core';
import {format} from 'date-fns';
import {Observable, of, Subscription} from 'rxjs';
import {FrankeCartService} from 'src/app/core/services/franke-cart/franke-cart.service';
import {FrankeOrderEntry} from 'src/app/shared/models/franke-order';
import {B2BCheckoutReviewSubmitComponent} from '@spartacus/checkout/b2b/components';
import {ActiveCartFacade} from '@spartacus/cart/base/root';
import {CheckoutDeliveryAddressFacade, CheckoutDeliveryModesFacade, CheckoutPaymentFacade} from '@spartacus/checkout/base/root';
import {CheckoutStepService} from '@spartacus/checkout/base/components';
import {CheckoutCostCenterFacade, CheckoutPaymentTypeFacade} from '@spartacus/checkout/b2b/root';
import {UserAccountFacade} from '@spartacus/user/account/root';
import {map} from 'rxjs/operators';
import {OrderDetailsService} from '@spartacus/order/components';

@Component({
  selector: 'app-franke-review-order',
  templateUrl: './franke-review-order.component.html',
  styleUrls: ['./franke-review-order.component.scss'],
})
export class FrankeReviewOrderComponent extends B2BCheckoutReviewSubmitComponent implements OnInit, OnDestroy {
  reference$: Observable<string>;
  deliveryDate$: Observable<string>;
  invoiceAddress$: Observable<Address>;
  subscription: Subscription;

  constructor(
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected orderDetailsService: OrderDetailsService,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected translation: TranslationService,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected userCostCenterService: UserCostCenterService,
    protected store: Store,
    protected userAccountFacade: UserAccountFacade,
    protected translationService: TranslationService,
    private frankeCartService: FrankeCartService,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(checkoutDeliveryAddressFacade, checkoutPaymentFacade, activeCartFacade, translationService, checkoutStepService,
      checkoutDeliveryModesFacade, checkoutPaymentTypeFacade, checkoutCostCenterFacade, userCostCenterService);

    const addi = this.frankeCartService.getActiveCart().pipe(
      map(cart => cart.billingAddress));

    this.subscription = this.activeCartFacade.getActive()
      .subscribe((cart: any) => {
        this.invoiceAddress$ = of(cart?.billingAddress);
        this.reference$ = of(cart.customerPONumber);
        this.checkoutPaymentFacade.getPaymentDetailsState()
          .subscribe((details) => {
            if (details?.data?.billingAddress) {
              this.invoiceAddress$ = of(details.data.billingAddress);
            } else {
              this.invoiceAddress$ = of(cart?.billingAddress);
            }
          });
        if (cart?.orderRequestedDate) {
          this.deliveryDate$ = of(
            format(
              new Date(
                new Date(cart.orderRequestedDate).getUTCFullYear(),
                new Date(cart.orderRequestedDate).getUTCMonth(),
                new Date(cart.orderRequestedDate).getUTCDate()
              ),
              'dd/MM/yyyy'
            )
          );
        }
      });
  }

  get entries$(): Observable<FrankeOrderEntry[]> {
    return this.frankeCartService.getActiveCartEntries();
  }

  get isLoading$(): Observable<boolean> {
    return this.frankeCartService.getActiveCartLoading();
  }

  ngOnInit(): void {
    this.frankeCartService.loadCart(true);
    this.document.querySelector('cx-page-layout.MultiStepCheckoutSummaryPageTemplate')?.classList?.add('franke-review-order');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.document.querySelector('cx-page-layout.MultiStepCheckoutSummaryPageTemplate')?.classList?.remove('franke-review-order');
  }

  getThumbnailFormatImage(productImages: Image): Image {
    if (productImages) {
      return (productImages as Image[]).find(
        (img) => img.format === 'thumbnail'
      );
    }
    return null;
  }
}
