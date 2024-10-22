import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {CmsAddToCartComponent, EventService, GlobalMessageActions, Product} from '@spartacus/core';
import {CmsComponentData, CurrentProductService} from '@spartacus/storefront';
import {BehaviorSubject, Subject} from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';
import {AddToCartFeedbackService} from 'src/app/core/services/add-to-cart-feedback/add-to-cart-feedback.service';
import {ConfigurableProductsService} from 'src/app/core/services/configurable-products/configurable-products.service';
import {ActiveCartFacade} from '@spartacus/cart/base/root';
import {AddToCartComponent} from '@spartacus/cart/base/components/add-to-cart';
import {EventsTrackerService} from '@core/services/events-tracker/events-tracker.service';

@Component({
  selector: 'app-extended-add-to-cart',
  templateUrl: './extended-add-to-cart.component.html',
  styleUrls: ['./extended-add-to-cart.component.scss'],
})
export class ExtendedAddToCartComponent
  extends AddToCartComponent
  implements OnInit, OnDestroy {
  hasPrice = false;
  showSpinner$ = new BehaviorSubject(false);
  destroyed$ = new Subject<boolean>();

  @Input() wishlist: boolean;

  constructor(
    currentProductService: CurrentProductService,
    cd: ChangeDetectorRef,
    private cd2: ChangeDetectorRef,
    activeCartFacade: ActiveCartFacade,
    private configurableProductService: ConfigurableProductsService,
    protected addToCartFeedback: AddToCartFeedbackService,
    protected eventService: EventService,
    protected component: CmsComponentData<CmsAddToCartComponent>,
    protected eventsTrackerService: EventsTrackerService,
    protected updates$: Actions
  ) {
    super(currentProductService, cd, activeCartFacade,
      component, eventService);
  }

  ngOnInit(): void {
    this.showSpinner$.next(false);

    if (this.product) {
      this.hasPrice = !!this.product?.price;
      this.productCode = this.product.code;
      this.quantity = 1;
      this.cd2.markForCheck();
    } else if (this.productCode) {
      this.quantity = 1;
      this.cd2.markForCheck();
    } else {
      this.subscription = this.currentProductService
        .getProduct()
        .pipe(filter(Boolean))
        .subscribe((prod: Product) => {
          this.product = prod;
          this.productCode = prod.code;
          this.hasPrice = !!prod?.price;
          this.quantity = 1;
          this.cd2.markForCheck();
        });
    }

    this.addToCartFeedback.onAddToCartAction();

    this.updates$
      .pipe(
        ofType(GlobalMessageActions.ADD_MESSAGE),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.showSpinner$.next(false);
      });
  }

  addProductToCart(): void {
    const quantity = this.addToCartForm.get('quantity').value;
    if (!this.productCode || quantity <= 0) {
      return;
    }

    if (this.productCode === this.configurableProductService.productCode) {
      this.configurableProductService.setQuantity(quantity);
      this.configurableProductService.postVariants('current', 'current');
    } else {
      this.activeCartService
        .getEntries()
        .pipe(take(1))
        .subscribe((entries) => {
          this.activeCartService.addEntry(this.productCode, quantity);
          this.sendAddProductToCartEvent(quantity);
        });
    }
  }

  sendAddProductToCartEvent(quantity: number): void {
    this.eventsTrackerService.sendAddProductToCartEvent(this.product, quantity);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.destroyed$.next(true);
    this.destroyed$.complete();

    this.addToCartFeedback.clearSubscriptions();
  }
}
