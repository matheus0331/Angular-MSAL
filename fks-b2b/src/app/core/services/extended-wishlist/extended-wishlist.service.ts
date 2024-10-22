import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {GlobalMessageService, GlobalMessageType, OCC_USER_ID_ANONYMOUS, OccEndpointsService, UserIdService} from '@spartacus/core';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {UserAccountFacade} from '@spartacus/user/account/root';
import {CartActions, getCartIdByUserId, StateWithMultiCart} from '@spartacus/cart/base/core';
import {Cart, MultiCartFacade, OrderEntry} from '@spartacus/cart/base/root';
import {WishListFacade} from '@spartacus/cart/wish-list/root';

const USER = 'current';
const GET_WISHLIST = 'users/' + USER + '/wishlists';
const ADD_ENTRY_WISHLIST = 'users/' + USER + '/wishlists/entries';
const REMOVE_ENTRY_WISHLIST = 'users/' + USER + '/wishlists/entries';

@Injectable({
  providedIn: 'root',
})
export class ExtendedWishlistService extends WishListFacade {
  constructor(
    private store: Store<StateWithMultiCart>,
    private userAccountFacade: UserAccountFacade,
    private multiCartService: MultiCartFacade,
    private userIdService: UserIdService,
    private http: HttpClient,
    private occEndpointService: OccEndpointsService,
    private globalMessageService: GlobalMessageService
  ) {
    super();
  }

  createWishList(userId: string, name?: string, description?: string): void {
  }


  createWishList2(wishlist: Cart, userId: string): void {
    if (wishlist) {
      this.store.dispatch(
        new CartActions.SetCartData({
          cart: wishlist,
          cartId: getCartIdByUserId(wishlist, userId),
        })
      );
    }
  }

  public getWishList(): Observable<Cart> {
    return combineLatest([
      this.getWishListId(),
      this.userAccountFacade.get(),
      this.userIdService.getUserId(),
    ]).pipe(
      distinctUntilChanged(),
      tap(([_, user, userId]) => {
        if (
          userId !== OCC_USER_ID_ANONYMOUS &&
          Boolean(user) &&
          Boolean(user.customerId)
        ) {
          this.getWishlistOcc().subscribe((wishlist) => {
            this.createWishList2(wishlist, userId);
          });
        }
      }),
      filter(([wishListId]) => Boolean(wishListId)),
      switchMap(([wishListId]) => {
        return this.multiCartService.getCart(wishListId);
      })
    );
  }

  loadWishList(userId: string, customerId: string): void {
  }

  addEntry(productCode: string): void {
    this.addEntryToWishlistOcc(productCode)
      .pipe(
        switchMap(() => {
          this.globalMessageService.add(
            {key: 'addToWishList.addToWishlistSuccessfully'},
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
          return this.getWishList();
        }),
        catchError((errMsg) => {
          this.globalMessageService.add(
            {key: 'addToWishList.addToWishlistFailed'},
            GlobalMessageType.MSG_TYPE_ERROR
          );
          return of([]);
        })
      )
      .subscribe();
  }

  removeEntry(entry: OrderEntry): void {
    this.removeEntryFromWishlistOcc(entry)
      .pipe(switchMap(() => this.getWishList()))
      .subscribe();
  }

  getWishListLoading(): Observable<boolean> {
    // @ts-ignore
    return this.getWishListId().pipe(
      switchMap((wishListId) =>
        this.multiCartService
          .isStable(wishListId)
          .pipe(map((stable) => !stable))
      )
    );
  }

  getWishListId(): Observable<string> {
    return of('default');
  }

  getWishlistOcc(): Observable<Cart> {
    return this.http.get<Cart>(this.occEndpointService.buildUrl(GET_WISHLIST));
  }

  addEntryToWishlistOcc(productCode: string): Observable<Cart> {
    return this.http.post(
      this.occEndpointService.buildUrl(ADD_ENTRY_WISHLIST) +
      '?code=' +
      productCode,
      {}
    );
  }

  removeEntryFromWishlistOcc(orderEntry: OrderEntry): Observable<any> {
    return this.http.delete(
      this.occEndpointService.buildUrl(
        REMOVE_ENTRY_WISHLIST + '/' + orderEntry.product.code
      )
    );
  }

}
