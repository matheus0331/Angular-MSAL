import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {CmsComponentData, CurrentProductService, LaunchDialogService} from '@spartacus/storefront';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {AddToCartFeedbackService} from 'src/app/core/services/add-to-cart-feedback/add-to-cart-feedback.service';
import {ConfigurableProductsService} from 'src/app/core/services/configurable-products/configurable-products.service';
import {ExtendedAddToCartComponent} from 'src/app/modules/shared/components/extended-add-to-cart/extended-add-to-cart.component';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {EventsTrackerService} from 'src/app/core/services/events-tracker/events-tracker.service';
import {ActiveCartFacade} from '@spartacus/cart/base/root';
import {CmsAddToCartComponent, EventService} from '@spartacus/core';

@Component({
  selector: 'app-button-add-to-cart',
  templateUrl: './button-add-to-cart.component.html',
  styleUrls: ['./button-add-to-cart.component.scss'],
  providers: [WindowSizeUtils],
})
export class ButtonAddToCartComponent
  extends ExtendedAddToCartComponent
  implements OnInit, OnDestroy {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);
  private addToCartSub: Subscription;

  constructor(
    launchDialogService: LaunchDialogService,
    currentProductService: CurrentProductService,
    cd: ChangeDetectorRef,
    cd2: ChangeDetectorRef,
    activeCartFacade: ActiveCartFacade,
    configurableProductService: ConfigurableProductsService,
    protected addToCartFeedback: AddToCartFeedbackService,
    protected windowSizeUtils: WindowSizeUtils,
    protected updates$: Actions,
    protected eventsTrackerService: EventsTrackerService,
    protected eventService: EventService,
    protected component: CmsComponentData<CmsAddToCartComponent>,
  ) {
    super(
      currentProductService,
      cd,
      cd2,
      activeCartFacade,
      configurableProductService,
      addToCartFeedback,
      eventService,
      component,
      eventsTrackerService,
      updates$
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.addToCartFeedback.onAddToCartAction();
  }

  ngOnDestroy(): void {
    if (this.addToCartSub) {
      this.addToCartSub.unsubscribe();
    }

    this.addToCartFeedback.clearSubscriptions();
  }

  frankeAddToCart(): void {
    const quantity = this.addToCartForm.get('quantity').value;
    if (!this.productCode || quantity <= 0) {
      return;
    }
    this.addToCartSub = this.activeCartService
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        this.activeCartService.addEntry(this.productCode, quantity);
        this.sendAddProductToCartEvent(quantity);
      });
  }

  sendAddProductToCartEvent(quantity: number): void {
    this.eventsTrackerService.sendAddProductToCartEvent(this.product, quantity);
  }
}
