import {Component, HostListener, OnDestroy, OnInit, ViewContainerRef,} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {GlobalMessageService, GlobalMessageType, RoutingService, TranslationService,} from '@spartacus/core';
import {LAUNCH_CALLER, LaunchDialogService} from '@spartacus/storefront';
import {Subscription} from 'rxjs';
import {EventsTrackerService} from 'src/app/core/services/events-tracker/events-tracker.service';
import {ActiveCartFacade} from '@spartacus/cart/base/root';
import {CheckoutPlaceOrderComponent} from '@spartacus/checkout/base/components';
import {ORDER_TYPE, OrderFacade} from '@spartacus/order/root';

@Component({
  selector: 'app-franke-place-order',
  templateUrl: './franke-place-order.component.html',
  styleUrls: ['./franke-place-order.component.scss'],
})
export class FrankePlaceOrderComponent
  extends CheckoutPlaceOrderComponent
  implements OnInit, OnDestroy {
  checkoutSubmitForm: UntypedFormGroup = this.fb.group({
    termsAndConditions: [false],
  });
  isSubmitting = false;
  currentOrderType: ORDER_TYPE;
  private frankeSubscription: Subscription = new Subscription();

  constructor(
    protected orderFacade: OrderFacade,
    protected routingService: RoutingService,
    protected fb: UntypedFormBuilder,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    private globalMessages: GlobalMessageService,
    private translation: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    private eventsTrackerService: EventsTrackerService
  ) {
    super(orderFacade, routingService, fb, launchDialogService, vcr);
  }

  ngOnInit(): void {
    this.preventPageUnload(); // Disable page reloads
    const isOrderProcessing = localStorage.getItem('isOrderProcessing');
    this.preventPageUnload(); // Disable page reloads
    if (isOrderProcessing === 'true') {
      this.isSubmitting = true; // Disable the form and button if an order is being processed
    }

    // Subscribe to order details to handle errors and other order-related updates
    this.frankeSubscription.add(
      this.orderFacade.getOrderDetails().subscribe((order) => {
        if (order?.orderPlacementStatus === 'ERROR') {
          this.translation
            .translate('checkoutReview.checkoutError')
            .subscribe((translation) => {
              this.globalMessages.add(
                translation,
                GlobalMessageType.MSG_TYPE_ERROR
              );
            });
        }
      })
    );
  }

  submitForm(): void {
    if (this.isSubmitting) {
      return; // Prevent further action if already submitting
    }

    this.isSubmitting = true; // Set flag to true to disable button
    localStorage.setItem('isOrderProcessing', 'true'); // Store the processing state in localStorage

    // Call the super method to proceed with order submission
    super.submitForm();

    // Assuming you are calling super.submitForm() to submit the form,
    // you should handle success and error cases inside that method or use callbacks.
    // For this example, we assume it’s handled there, so no changes are made directly.
  }

  ngOnDestroy(): void {
    this.frankeSubscription.unsubscribe();
    this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
    this.allowPageUnload(); // Re-enable page unload on component destroy
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.isSubmitting) {
      $event.preventDefault();
      $event.returnValue = ''; // Modern browsers ignore the custom message, setting it to an empty string
    }
  }

  private preventPageUnload(): void {
    window.addEventListener('beforeunload', this.unloadNotification.bind(this));
  }

  private allowPageUnload(): void {
    window.removeEventListener(
      'beforeunload',
      this.unloadNotification.bind(this)
    );
  }
}
