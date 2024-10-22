import {Injectable} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {GlobalMessageService, GlobalMessageType} from '@spartacus/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CartActions} from '@spartacus/cart/base/core';

export const CART_ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
export const CART_ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';
export const CART_UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
export const CART_UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

@Injectable({
  providedIn: 'root',
})
export class AddToCartFeedbackService {
  destroyed$ = new Subject<boolean>();

  constructor(
    private actions$: Actions,
    private globalMessages: GlobalMessageService
  ) {
  }

  clearSubscriptions(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onAddToCartAction(
    hasNoPrice?: boolean,
    purchasable?: BehaviorSubject<boolean>
  ): void {
    this.actions$
      .pipe(
        ofType<
          | CartActions.CartAddEntrySuccess
          | CartActions.CartAddEntryFail
          | CartActions.CartUpdateEntrySuccess
          | CartActions.CartUpdateEntryFail
        >(
          CART_ADD_ENTRY_SUCCESS,
          CART_ADD_ENTRY_FAIL,
          CART_UPDATE_ENTRY_SUCCESS,
          CART_UPDATE_ENTRY_FAIL
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe((x) => {
        if (x.type === CART_ADD_ENTRY_SUCCESS) {
          this.globalMessages.add({key: 'addToCart.addToCartSuccessfully'}, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        } else if (x.type === CART_ADD_ENTRY_FAIL && x.payload.error?.details[0]?.message === 'This product cannot be ordered anymore, please check alternative products.') {
          this.globalMessages.add({key: 'productSummary.cannotBuyAnymore'}, GlobalMessageType.MSG_TYPE_ERROR);
        } else if (x.type === CART_ADD_ENTRY_FAIL) {
          hasNoPrice && purchasable.getValue() === true
            ? this.globalMessages.add({key: 'productSummary.unrecognizedError'}, GlobalMessageType.MSG_TYPE_ERROR)
            : this.globalMessages.add({key: 'addToCart.addToCartFailed'}, GlobalMessageType.MSG_TYPE_ERROR);
        } else if (x.type === CART_UPDATE_ENTRY_SUCCESS) {
          this.globalMessages.add({key: 'addToCart.itemsIncrementedInYourCart'}, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        } else if (x.type === CART_UPDATE_ENTRY_FAIL) {
          this.globalMessages.add({key: 'addToCart.addToCartFailed'}, GlobalMessageType.MSG_TYPE_ERROR);
        }
      });
  }
}
