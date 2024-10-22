import {Component, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Translatable} from '@spartacus/core';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {EventsTrackerService} from 'src/app/core/services/events-tracker/events-tracker.service';
import {ActiveCartFacade, Cart} from '@spartacus/cart/base/root';
import {CheckoutStepService} from '@spartacus/checkout/base/components';

@Component({
  selector: 'app-cart-navigation-buttons',
  templateUrl: './cart-navigation-buttons.component.html',
  styleUrls: ['./cart-navigation-buttons.component.scss'],
})
export class CartNavigationButtonsComponent implements OnDestroy {
  @Input() deliveryDate: any;
  @Input() orderNumber: string;
  currentStepIndex: number;
  currentCart: Cart;
  activeSubscriptions$: Subscription;

  constructor(
    public checkoutStepService: CheckoutStepService,
    public activatedRoute: ActivatedRoute,
    protected activeCartFacade: ActiveCartFacade,
    private eventsTrackerService: EventsTrackerService
  ) {
    this.activeSubscriptions$ = new Subscription();
    this.setCurrentStep();
    this.setCurrentCart();
  }

  setCurrentCart(): void {
    this.activeSubscriptions$
      .add(this.activeCartFacade.getActive().subscribe((cart: Cart) => this.currentCart = cart));
  }

  setCurrentStep(): void {
    this.activeSubscriptions$
      .add(this.checkoutStepService.activeStepIndex$.subscribe((stepIndex: number) => this.currentStepIndex = stepIndex + 1));
  }

  proceed(): void {
    this.checkoutStepService.next(this.activatedRoute);
  }

  shouldShowNavButtons(): Observable<boolean> {
    return this.activatedRoute.url.pipe(
      map(
        (url) =>
          !!url.find((segment) => !!segment.toString().includes('shipping-address') || !!segment.toString().includes('billing-address'))
      )
    );
  }

  previousButtonText(): Observable<Translatable> {
    return this.activatedRoute.url.pipe(
      map((url) => {
        if (
          url.find((segment) => !!segment.toString().includes('shipping-address'))
        ) {
          return {key: 'checkout.backToCart'};
        } else if (
          url.find((segment) => !!segment.toString().includes('billing-address'))
        ) {
          return {key: 'checkout.back'};
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.activeSubscriptions$?.unsubscribe();
  }
}
