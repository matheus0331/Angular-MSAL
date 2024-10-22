import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseSiteService, Image, OccEndpointsService} from '@spartacus/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {FrankeCartService} from 'src/app/core/services/franke-cart/franke-cart.service';
import {ProductAvailabilityService} from 'src/app/core/services/product-availability/product-availability.service';
import {FrankeOrderEntry} from 'src/app/shared/models/franke-order';
import {ExtendedBaseStore} from 'src/app/shared/models/misc';
import {EventsTrackerService} from 'src/app/core/services/events-tracker/events-tracker.service';
import {ActiveCartFacade, Cart} from '@spartacus/cart/base/root';
import {MultiCartService} from '@spartacus/cart/base/core';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss'],
})
export class ShoppingCartItemComponent implements OnInit, OnDestroy {
  @Input() entry: FrankeOrderEntry;

  cart$: Observable<Cart>;
  cartSub: Subscription;

  firstQuantityAvailable$: BehaviorSubject<string> = new BehaviorSubject('');
  nextDateAvailable$: BehaviorSubject<string> = new BehaviorSubject('');
  hasAvailability$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  availabilityError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  availabilityCheckDisabledInCart$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  totalQuantityAvailable;
  quantityWithoutInfo$: BehaviorSubject<number> = new BehaviorSubject(0);

  productAvailabilitySub: Subscription;
  notifySub: Subscription;
  availabilityCheckDisabledInCart: boolean;

  constructor(
    private http: HttpClient,
    private endpoint: OccEndpointsService,
    private storeService: BaseSiteService,
    protected activeCartFacade: ActiveCartFacade,
    protected multiCartService: MultiCartService,
    protected productAvailabilityService: ProductAvailabilityService,
    private frankeCartService: FrankeCartService,
    private eventsTrackerService: EventsTrackerService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.cart$ = this.activeCartFacade.getActive();
    this.notifySub = this.productAvailabilityService.notifyObservable$.subscribe(
      (res) => {
        if (res?.refresh) {
          this.quantityWithoutInfo$.next(0);
          this.totalQuantityAvailable = 0;

          const deliveryDate = `${res.date.year}-${res.date.month}-${res.date.day}`;

          this.productAvailabilitySub = this.productAvailabilityService
            .getAvailability(
              this.entry?.product?.code,
              this.entry?.quantity,
              deliveryDate
            )
            .subscribe((availabilities) => {
              if (availabilities.length) {
                this.availabilityError$.next(false);

                this.storeService.getActive().subscribe((store) => {
                  this.http
                    .get<ExtendedBaseStore>(
                      this.endpoint.buildUrl(`/basestores/${store}`)
                    )
                    .subscribe((data) => {
                      this.availabilityCheckDisabledInCart$.next(
                        data.availabilityCheckDisabledInCart === true
                      );

                      for (const availability of availabilities) {
                        this.totalQuantityAvailable +=
                          availability.availableQty;
                      }

                      this.quantityWithoutInfo$.next(
                        this.entry?.quantity - this.totalQuantityAvailable
                      );

                      if (
                        availabilities[0].requiredDate ===
                        availabilities[0].estimatedDate
                      ) {
                        availabilities.length > 1
                          ? this.hasAvailability$.next(false)
                          : this.hasAvailability$.next(true);

                        this.firstQuantityAvailable$.next(
                          availabilities[0].availableQty
                        );
                        for (let i = 1; i < availabilities.length; i++) {
                          this.nextDateAvailable$.next(
                            this.formatDate(availabilities[i].estimatedDate)
                          );
                        }
                      } else {
                        this.firstQuantityAvailable$.next('0');
                        this.hasAvailability$.next(false);

                        for (const availability of availabilities) {
                          this.nextDateAvailable$.next(
                            this.formatDate(availability.estimatedDate)
                          );
                        }
                      }
                      this.cd.detectChanges();
                      this.cd.detach();
                    });
                });

                this.productAvailabilityService.notify.next(null);
              } else {
                this.availabilityError$.next(true);
                this.productAvailabilityService.notify.next(null);
              }
            });
        }
      }
    );
  }

  formatDate(date: string): string {
    return date.replace(/(\d{4})(\d{2})(\d{2})/g, '$3/$2/$1');
  }

  onChange(
    entryNumber: number,
    event?: { target: { value: number } },
    currentNumber?: number,
    valueToAddOrSub?: number
  ): void {
    if (event) {
      this.activeCartFacade.updateEntry(entryNumber, event.target.value);
    } else {
      this.activeCartFacade.updateEntry(
        entryNumber,
        currentNumber + valueToAddOrSub
      );
    }
    this.frankeCartService.getActiveCart().pipe(take(1)).subscribe(cart => {
      this.sendRemoveProductFromCartEvent(cart);
    });

    this.cartSub = this.cart$.subscribe((cart) => {

      if (cart?.entries?.length < 1) {
        this.frankeCartService.putAdditionalCartInfo({
          customerPONumber: '',
          orderRequestedDate: '',
        });
      }
    });
    this.frankeCartService.loadCart(true);
  }

  sendRemoveProductFromCartEvent(cart: Cart): void {
    this.eventsTrackerService.sendRemoveProductFromCartEvent(
      this.entry.product, this.entry.totalPrice.value, cart.totalPriceWithTax.value
    );
  }

  getThumbnailFormatImage(productImages: Image): Image {
    if (productImages) {
      return (productImages as Image[]).find(
        (img) => img.format === 'thumbnail'
      );
    }
    return productImages;
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
    if (this.productAvailabilitySub) {
      this.productAvailabilitySub.unsubscribe();
    }
    if (this.notifySub) {
      this.notifySub.unsubscribe();
    }
  }
}
