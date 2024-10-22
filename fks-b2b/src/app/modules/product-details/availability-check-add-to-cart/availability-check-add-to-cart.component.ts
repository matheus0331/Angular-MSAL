import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Actions, ofType} from '@ngrx/effects';
import {
  CmsAddToCartComponent,
  EventService,
  GlobalMessageActions,
  GlobalMessageService,
  GlobalMessageType,
  Product
} from '@spartacus/core';
import {CmsComponentData, CurrentProductService} from '@spartacus/storefront';
import {AddToCartComponent} from '@spartacus/cart/base/components/add-to-cart';
import {addBusinessDays, addDays, differenceInDays, isAfter} from 'date-fns';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';
import {AddToCartFeedbackService} from 'src/app/core/services/add-to-cart-feedback/add-to-cart-feedback.service';
import {ConfigurableProductsService} from 'src/app/core/services/configurable-products/configurable-products.service';
import {ProductAvailabilityService} from 'src/app/core/services/product-availability/product-availability.service';
import {CustomDateParserFormatter} from '../../utils/custom-date-parser-formatter-utils';
import {BASE_STORES} from 'src/app/shared/shared/basestores';
import {EventsTrackerService} from 'src/app/core/services/events-tracker/events-tracker.service';
import {UserAccountFacade} from '@spartacus/user/account/root';
import {ActiveCartFacade} from '@spartacus/cart/base/root';

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
  selector: 'app-availability-check-add-to-cart',
  templateUrl: './availability-check-add-to-cart.component.html',
  styleUrls: ['./availability-check-add-to-cart.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
  ],
})
export class AvailabilityCheckAddToCartComponent
  extends AddToCartComponent
  implements OnInit, OnDestroy {
  hasPrice = false;
  showSpinner$ = new BehaviorSubject(false);
  destroyed$ = new Subject<boolean>();

  @Input() wishlist: boolean;

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

  userSub: Subscription;

  firstQuantityAvailable;
  firstDateAvailable;
  intimeAvailable = false;

  nextQuantityAvailable = [];
  nextDateAvailable = [];

  totalQuantityAvailable;
  quantityWithoutInfo;

  loadingAvailability$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  hasAvailability$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  outOfStock$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  availabilityError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isPurchasable: BehaviorSubject<boolean> = new BehaviorSubject(false);

  availabilityCheckForm: UntypedFormGroup = this.fb.group({
    deliveryDate: [null, [Validators.required, forbiddenNameValidator]],
  });

  constructor(
    currentProductService: CurrentProductService,
    protected eventService: EventService,
    cd: ChangeDetectorRef,
    private cd2: ChangeDetectorRef,
    activeCartFacade: ActiveCartFacade,
    private configurableProductService: ConfigurableProductsService,
    protected addToCartFeedback: AddToCartFeedbackService,
    protected updates$: Actions,
    protected fb: UntypedFormBuilder,
    private userAccountFacade: UserAccountFacade,
    protected calendar: NgbCalendar,
    protected ngbDate: NgbDateParserFormatter,
    private productAvailabilityService: ProductAvailabilityService,
    private globalMessages: GlobalMessageService,
    private eventsTrackerService: EventsTrackerService,
    protected component: CmsComponentData<CmsAddToCartComponent>,
  ) {
    super(currentProductService, cd, activeCartFacade, component, eventService);
    this.userSub = this.userAccountFacade
      .get()
      .pipe(
        filter((user) => !!user?.registrationSite?.uid),
        take(1)
      )
      .subscribe((user) => {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', this.dayGap);
        let country: string;
        let disableWeekendDelivery;

        Object.keys(BASE_STORES).forEach((key) => {
          if (user.registrationSite.uid === BASE_STORES[key].baseStore) {
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
        const deliveryDate = this.availabilityCheckForm.get('deliveryDate');
        deliveryDate.setValue(this.toDate);
        const quantity = this.addToCartForm.get('quantity');
        quantity.setValue(1);
      });
  }



  ngOnInit(): void {
    this.showSpinner$.next(false);
    this.intimeAvailable = false;
    if (this.product) {
      this.hasPrice = this.product?.price ? true : false;
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
          this.hasPrice = prod?.price ? true : false;
          this.quantity = 1;
          this.cd2.markForCheck();
          this.isPurchasable.next(true);

          this.activeCartService
            .getEntry(this.productCode)
            .subscribe((entry) => {
              if (entry) {
                this.addToCartForm.setValue({quantity: entry.quantity});
              }

              if (!this.hasPrice && this.product.purchasable) {
                this.globalMessages.add(
                  {key: 'productSummary.unrecognizedError'},
                  GlobalMessageType.MSG_TYPE_ERROR
                );
                return;
              }
            });
        });
    }

    this.addToCartFeedback.onAddToCartAction(
      !this.hasPrice,
      this.isPurchasable
    );

    this.updates$
      .pipe(
        ofType(GlobalMessageActions.ADD_MESSAGE),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.showSpinner$.next(false);
      });
  }

  formatDate(date: string): string {
    return date.replace(/(\d{4})(\d{2})(\d{2})/g, '$3/$2/$1');
  }

  checkAvailability(): void {
    this.firstQuantityAvailable = undefined;
    this.firstDateAvailable = undefined;
    this.nextDateAvailable = [];
    this.nextQuantityAvailable = [];
    this.quantityWithoutInfo = 0;
    this.totalQuantityAvailable = 0;

    const quantity = this.addToCartForm.get('quantity').value;
    const deliveryDate = this.availabilityCheckForm.get('deliveryDate').value;

    this.loadingAvailability$.next(true);
    this.hasAvailability$.next(false);
    this.availabilityError$.next(false);
    this.outOfStock$.next(false);
    this.eventsTrackerService.sendCheckAvailabilityEvent(this.product);
    this.productAvailabilityService
      .checkAvailabilityPDP(this.productCode, quantity, deliveryDate)
      .subscribe((availabilities) => {
        if (availabilities.length) {
          this.loadingAvailability$.next(false);
          this.hasAvailability$.next(true);
          this.availabilityError$.next(false);

          for (const availability of availabilities) {
            this.totalQuantityAvailable += availability.availableQty;
          }

          this.quantityWithoutInfo = quantity - this.totalQuantityAvailable;
          // check if there is availability today
          if (
            availabilities[0].requiredDate === availabilities[0].estimatedDate
          ) {
            this.intimeAvailable = true;
            this.firstDateAvailable = availabilities[0].estimatedDate;
            this.outOfStock$.next(false);
            this.firstQuantityAvailable = availabilities[0].availableQty;
            if ( availabilities.length === 1 && !this.firstQuantityAvailable) {
              for (let i = 0; i < availabilities.length; i++) {
                this.nextDateAvailable.push(availabilities[i].estimatedDate);
                this.nextQuantityAvailable.push(availabilities[i].availableQty);
              }
            }
            if ( availabilities.length > 1 && this.firstQuantityAvailable) {
              for (let i = 1; i < availabilities.length; i++) {
                this.nextDateAvailable.push(availabilities[i].estimatedDate);
                this.nextQuantityAvailable.push(availabilities[i].availableQty);
              }
            }
            if ( availabilities.length > 1 && !this.firstQuantityAvailable) {
              for (let i = 0; i < availabilities.length; i++) {
                this.nextDateAvailable.push(availabilities[i].estimatedDate);
                this.nextQuantityAvailable.push(availabilities[i].availableQty);
              }
            }
          }
          // if there is no availability today
          else {
            this.outOfStock$.next(true);
            for (const availability of availabilities) {
              this.nextDateAvailable.push(availability.estimatedDate);
              this.nextQuantityAvailable.push(availability.availableQty);
            }
          }
        } else {
          this.loadingAvailability$.next(false);
          this.hasAvailability$.next(false);
          this.availabilityError$.next(true);
          this.outOfStock$.next(false);
        }
      });
  }

  addProductToCart(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.showSpinner$.next(true);
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
          let flag = true;
          for (const entry of entries) {
            if (entry.product.code === this.productCode) {
              this.activeCartService.updateEntry(entry.entryNumber, quantity);
              flag = false;
            }
          }
          // TODO: check what this does
          // this.numberOfEntriesBeforeAdd = entries.length;
          if (flag) {
            this.activeCartService.addEntry(this.productCode, quantity);
          }
          this.sendAddProductToCartEvent(quantity);
        });
    }
  }

  sendAddProductToCartEvent(quantity: number): void {
    this.eventsTrackerService.sendAddProductToCartEvent(this.product, quantity);
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
    this.availabilityCheckForm.get('deliveryDate').reset();
  }

  verifyDate(dateToVerify: string, days: number): string {
    days = days + 1;
    return isAfter(new Date(dateToVerify), addDays(new Date(), days))
      ? dateToVerify
      : addDays(new Date(), days).toISOString();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    this.destroyed$.next(true);
    this.destroyed$.complete();

    this.addToCartFeedback.clearSubscriptions();
  }
}
