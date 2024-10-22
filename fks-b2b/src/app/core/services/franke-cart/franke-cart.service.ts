import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {GlobalMessageService, GlobalMessageType, OccEndpointsService} from '@spartacus/core';
import {BehaviorSubject, Observable, Observer} from 'rxjs';
import {AdditionalCartInfo} from '../../../shared/models/franke-shopping-cart';
import {share, take} from 'rxjs/operators';
import {CartActions, StateWithMultiCart} from '@spartacus/cart/base/core';
import {ActiveCartFacade, Cart, OrderEntry} from '@spartacus/cart/base/root';

import {CartReplaceItem} from '@shared/models/cart';

@Injectable({
  providedIn: 'root',
})
export class FrankeCartService {
  protected activeCart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    null
  );
  protected activeCartEntries$: BehaviorSubject<
    OrderEntry[]
  > = new BehaviorSubject<OrderEntry[]>(null);
  protected activeCartLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  protected isUpdatingCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private http: HttpClient,
    private occEndpointService: OccEndpointsService,
    private store: Store<StateWithMultiCart>,
    private activeCartFacade: ActiveCartFacade,
    private globalMessageService: GlobalMessageService
  ) {
  }

  putAdditionalCartInfo(additionalCartInfo: AdditionalCartInfo): void {
    this.http
      .put(
        this.occEndpointService.buildUrl(
          '/users/current/carts/current/additionalCartInfo'
        ),
        additionalCartInfo
      )
      .subscribe(() => {
        this.store.dispatch(
          new CartActions.LoadCart({
            userId: 'current',
            cartId: 'current',
          })
        );
      });
  }

  // TODO handle http error, check if spartacus has any services to manage http errors
  loadCart(updateSap: boolean = false): Cart {
    this.activeCartLoading$.next(true);
    let cartRef;
    this.getCart(updateSap)
      .pipe(share())
      .subscribe(
        (cart: Cart) => {
          this.setActiveCart(cart);
          cartRef = cart;
          if (cart.backendMessages && cart.backendMessages.length > 0) {
            this.globalMessageService.add(
              {key: 'httpHandlers.validationErrors.invalid.sessionCart'},
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        },
        () =>
          this.globalMessageService.add(
            {key: 'httpHandlers.validationErrors.invalid.sessionCart'},
            GlobalMessageType.MSG_TYPE_ERROR
          ),
        () => this.activeCartLoading$.next(!updateSap)
      );
    return cartRef;
  }

  setActiveCart(cart: Cart): void {
    this.activeCart$.next(cart);
    this.activeCartEntries$.next(cart.entries);
  }

  getActiveCartLoading(): Observable<boolean> {
    return this.activeCartLoading$;
  }

  getIsUpdatingCart(): Observable<boolean> {
    return this.isUpdatingCart$;
  }

  // Use this in case the value changes and need to be reflated on updates, example: remove product to cart
  // Call loadCart() to initialize value
  // If just need to get cart use getCart() method
  getActiveCart(): Observable<Cart> {
    return this.activeCart$;
  }

  getActiveCartEntries(): Observable<OrderEntry[]> {
    return this.activeCartEntries$;
  }

  handleReplaceEntry({entryNumber}: OrderEntry, productCode: string): void {
    this.isUpdatingCart$.next(true);
    this.replaceEntryInCart({entryNumber, productCode}).subscribe(
      (_cart) => {
        this.loadCart(true);
        this.isUpdatingCart$.next(false);
        this.globalMessageService.add(
          {key: 'cartAlternativeProducts.cartItemReplacedSuccessfully'},
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      },
      () => {
        this.loadCart(true);
        this.isUpdatingCart$.next(false);
        this.globalMessageService.add(
          {key: 'cartAlternativeProducts.cartItemReplacedError'},
          GlobalMessageType.MSG_TYPE_ERROR
        );
      }
    );
  }

  replaceEntryInCart({
                       entryNumber,
                       productCode,
                     }: CartReplaceItem): Observable<Cart> {
    return new Observable((observer: Observer<Cart>) => {
      this.activeCartFacade
        .getActiveCartId()
        .pipe(take(1))
        .subscribe((cartId) => {
          this.http
            .put<Cart>(
              this.occEndpointService.buildUrl(
                '/users/current/carts/current/change'
              ),
              {entryNumber, productCode}
            )
            .subscribe(
              (cart) => {
                observer.next(cart);
                observer.complete();
              },
              (err) => {
                observer.error(err);
              }
            );
        });
    });
  }

  getCart(updateSap: boolean = false): Observable<Cart> {
    const updateSapParam = updateSap ? 'true' : 'false';
    return this.http.get(
      this.occEndpointService.buildUrl(
        `/users/current/carts/current?updateSap=${updateSapParam}&fields=FULL`
      )
    );
  }
}
