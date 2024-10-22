import {HttpClient} from '@angular/common/http';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseSiteService, Image, OccEndpointsService} from '@spartacus/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ProductAvailabilityService} from 'src/app/core/services/product-availability/product-availability.service';
import {FrankeOrderEntry} from 'src/app/shared/models/franke-order';
import {ExtendedBaseStore} from 'src/app/shared/models/misc';
import {ActiveCartFacade} from '@spartacus/cart/base/root';

@Component({
  selector: 'app-shopping-cart-grid-item',
  templateUrl: './shopping-cart-grid-item.component.html',
  styleUrls: ['./shopping-cart-grid-item.component.scss'],
})
export class ShoppingCartGridItemComponent implements OnInit, OnDestroy {
  @Input() entry: FrankeOrderEntry;

  firstQuantityAvailable$: BehaviorSubject<string> = new BehaviorSubject('');
  nextDateAvailable$: BehaviorSubject<string> = new BehaviorSubject('');
  hasAvailability$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  availabilityError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  availabilityCheckDisabledInCart$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  productAvailabilitySub: Subscription;
  notifySub: Subscription;

  constructor(
    private http: HttpClient,
    private endpoint: OccEndpointsService,
    private storeService: BaseSiteService,
    protected activeCartFacade: ActiveCartFacade,
    protected productAvailabilityService: ProductAvailabilityService
  ) {
  }

  ngOnInit(): void {
    this.notifySub = this.productAvailabilityService.notifyObservable$.subscribe(
      (res) => {
        if (res?.refresh) {
          const deliveryDate = `${res.date.year}-${res.date.month}-${res.date.day}`;
          this.storeService.getActive().subscribe((store) => {
            this.http
              .get<ExtendedBaseStore>(
                this.endpoint.buildUrl(`/basestores/${store}`)
              )
              .subscribe((data) => {
                this.availabilityCheckDisabledInCart$.next(
                  data.availabilityCheckDisabledInCart === true
                );

                this.productAvailabilitySub = this.productAvailabilityService
                  .getAvailability(
                    this.entry?.product?.code,
                    this.entry?.quantity,
                    deliveryDate
                  )
                  .subscribe((availabilities) => {
                    if (availabilities.length) {
                      this.availabilityError$.next(false);

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

                      this.productAvailabilityService.notify.next(null);
                    } else {
                      this.availabilityError$.next(true);
                      this.productAvailabilityService.notify.next(null);
                    }
                  });
              });
          });
        }
      }
    );
  }

  formatDate(date: string): string {
    return date.replace(/(\d{4})(\d{2})(\d{2})/g, '$3/$2/$1');
  }

  getThumbnailFormatImage(productImages: Image): Image {
    if (productImages) {
      return (productImages as Image[]).find(
        (img) => img.format === 'thumbnail'
      );
    }
    return productImages;
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
  }

  ngOnDestroy(): void {
    if (this.productAvailabilitySub) {
      this.productAvailabilitySub.unsubscribe();
    }
    if (this.notifySub) {
      this.notifySub.unsubscribe();
    }
  }
}
