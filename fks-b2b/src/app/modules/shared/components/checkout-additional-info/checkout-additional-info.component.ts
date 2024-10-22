import {Component, OnDestroy} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ActiveCartFacade} from '@spartacus/cart/base/root';
import {RoutingService} from '@spartacus/core';
import {addBusinessDays, addDays, differenceInDays, isAfter} from 'date-fns';
import {Observable, Subscription} from 'rxjs';
import {EventsTrackerService} from 'src/app/core/services/events-tracker/events-tracker.service';
import {FrankeCartService} from 'src/app/core/services/franke-cart/franke-cart.service';
import {ProductAvailabilityService} from 'src/app/core/services/product-availability/product-availability.service';
import {BASE_STORES} from 'src/app/shared/shared/basestores';
import {CustomDateParserFormatter} from '../../../utils/custom-date-parser-formatter-utils';
import {CheckoutStepService} from '@spartacus/checkout/base/components';

export function forbiddenNameValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (!control.value) {
    return null;
  }
  const {year, month, day} = control.value;
  const dateToCheck = new Date(year, month, day);
  const today = new Date();
  return isAfter(addDays(today, 7), dateToCheck)
    ? {range: {value: control.value}}
    : null;
}

@Component({
  selector: 'app-checkout-additional-info',
  templateUrl: './checkout-additional-info.component.html',
  styleUrls: ['./checkout-additional-info.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
  ],
})
export class CheckoutAdditionalInfoComponent implements OnDestroy {
  cart$: Observable<{ [k: string]: any }>;
  currentCart: Subscription;

  startCheckoutRoute = 'checkoutShippingAddress';
  continueShoppingRoute = '/';

  inputPlaceholder = 'P01233454655657';
  datePlaceholder = 'DD/MM/YYYY';

  displayMonths = 1;
  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'hidden';

  fromDate: NgbDate;
  dayGap = 6;
  toDate: NgbDate | null = null;
  isDisabled: NgbDate;
  isWeekend: (date: NgbDateStruct) => boolean;

  additionalInfoForm: UntypedFormGroup = this.fb.group({
    deliveryDate: [null, [Validators.required, forbiddenNameValidator]],
    orderNumber: ['', Validators.required],
  });

  constructor(
    protected calendar: NgbCalendar,
    protected ngbDate: NgbDateParserFormatter,
    protected activeCartFacade: ActiveCartFacade,
    public checkoutStepService: CheckoutStepService,
    public activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    private frankeCartService: FrankeCartService,
    protected routingService: RoutingService,
    protected availabilityService: ProductAvailabilityService,
    private eventsTrackerService: EventsTrackerService
  ) {
    this.cart$ = this.activeCartFacade.getActive();

    this.currentCart = this.cart$.subscribe((cart) => {
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', this.dayGap);
      let country: string;
      let disableWeekendDelivery;
      Object.keys(BASE_STORES).forEach((key) => {
        if (cart.site === BASE_STORES[key].baseStore) {
          country = key;
          disableWeekendDelivery = BASE_STORES[key].disableWeekendDelivery;
          if (key === 'fr' || key === 'pl' || key === 'ch') {
            const franceDays = differenceInDays(
              addBusinessDays(new Date(), BASE_STORES[key].days),
              new Date()
            );
            this.dayGap = franceDays;
            this.toDate = calendar.getNext(
              calendar.getToday(),
              'd',
              this.dayGap
            );
          } else {
            this.dayGap = BASE_STORES[key].days;
            this.toDate = calendar.getNext(
              calendar.getToday(),
              'd',
              this.dayGap
            );
          }
        }
      });

      this.isDisabled = this.toDate;
      if (disableWeekendDelivery) {
        const weekendDays = [6, 7];
        this.isWeekend = (date: NgbDateStruct) => {
          const weekDay = calendar.getWeekday(new NgbDate(date.year, date.month, date.day));
          return weekendDays.includes(weekDay);
        };

        while (this.isWeekend(this.toDate)) {
          this.toDate = calendar.getNext(
            this.toDate,
            'd',
            1
          );
        }
      }
      const deliveryDate = this.additionalInfoForm.get('deliveryDate');
      deliveryDate.setValue(this.toDate);

      if (cart.customerPONumber) {
        this.additionalInfoForm
          .get('orderNumber')
          .setValue(cart.customerPONumber);
      }
      this.refreshProductAvailabilityCheck();
    });
  }

  refreshProductAvailabilityCheck(): void {
    const deliveryDate = this.additionalInfoForm.get('deliveryDate').value;
    this.availabilityService.notifyCartItem({
      refresh: true,
      date: deliveryDate,
    });
  }

  ngOnDestroy(): void {
    if (this.cart$) {
      this.currentCart.unsubscribe();
    }
  }

  isRange(date: NgbDate): boolean {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date)
    );
  }

  isInside(date: NgbDate): boolean {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  public clearDateInput(): void {
    this.additionalInfoForm.get('deliveryDate').reset();
  }

  proceedToCheckout(): void {
    this.additionalInfoForm.markAllAsTouched();
    if (this.additionalInfoForm.valid) {
      const {orderNumber, deliveryDate} = this.additionalInfoForm.value;
      const formatedDeliveryDate =
        new Date(
          deliveryDate.year,
          deliveryDate.month - 1,
          deliveryDate.day,
          12
        )
          .toISOString()
          .split('.')[0] + 'Z';
      this.frankeCartService.putAdditionalCartInfo({
        customerPONumber: orderNumber,
        orderRequestedDate: formatedDeliveryDate,
      });

      this.routingService.go('checkout/shipping-address').catch(e => e);
    }
  }
}
