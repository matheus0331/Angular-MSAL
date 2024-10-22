import {Injectable} from '@angular/core';
import {BaseSiteService, CurrencyService, LanguageService, Product} from '@spartacus/core';
import {FrankeGoogleTagManagerService} from './../franke-google-tag-manager/franke-google-tag-manager.service';
import {EventIdentifier, EventTypes} from './models';
import {Cart} from '@spartacus/cart/base/root';
import {CheckoutStepService} from '@spartacus/checkout/base/components';
import {EcommerceEvent, EcommerceEventItem} from '@core/services/events-tracker/models/ecommerce-event.model';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Order} from '@spartacus/order/root';

@Injectable({
  providedIn: 'root',
})
export class EventsTrackerService {
  constructor(
    private spartacusBaseSiteService: BaseSiteService,
    private spartacusLanguageService: LanguageService,
    private spartacusCurrencyService: CurrencyService,
    private gtmService: FrankeGoogleTagManagerService,
    public checkoutStepService: CheckoutStepService
  ) {
  }

  sendAddProductToCartEvent(product: Product, quantity: number = 1): void {
    this.sendEvents(EventTypes.ADD_TO_CART, this.createEcommerceEventParam([product], quantity));
  }

  sendAddProductToWishlistEvent(product: Product, quantity: number = 1): void {
    this.sendEvents(EventTypes.ADD_TO_WISHLIST, this.createEcommerceEventParam([product], quantity));
  }

  sendRemoveProductFromCartEvent(product: Product, entryPrice: number, totalPrice: number): void {
    const event = this.createEcommerceEventParam([product]);
    event.value = totalPrice;
    event.items[0].price = entryPrice;
    this.sendEvents(EventTypes.REMOVE_FROM_CART, event);
  }

  sendProductDetailImpressionEvent(product: Product): void {
    this.sendEvents(EventTypes.VIEW_ITEM, this.createEcommerceEventParam([product]));
  }

  sendPurchaseEvent(cart: Cart, order: Order): void {
    const event = this.createEcommerceEventParam(this.cartToProducts(cart), -1, cart);
    event.transaction_id = order.code;
    event.value = order.totalPriceWithTax.value;
    this.sendEvents(EventTypes.PURCHASE, event);
  }

  sendCheckAvailabilityEvent(product: Product): void {
    this.sendEvents(EventTypes.CHECK_AVAILABILITY, this.createEcommerceEventParam([product]));
  }

  sendAlternativeProductsEvent(product: Product): void {
    this.sendEvents(EventTypes.ALTERNATIVE_PRODUCTS, this.createEcommerceEventParam([product]));
  }

  sendViewCartEvent(cart: Cart): void {
    if (cart.entries) {
      this.sendEvents(EventTypes.VIEW_CART, this.createEcommerceEventParam(this.cartToProducts(cart), -1, cart));
    }
  }

  sendSubmitContactUsEvent(): void {
    this.sendEvents(EventTypes.SUBMIT_CONTACT_US, null);
  }

  sendEvents(eventType: EventTypes, ecommerce: EcommerceEvent): void {
    this.gtmService.pushTag({[EventIdentifier]: null});
    const event = {
      event: eventType,
      [EventIdentifier]: ecommerce
    };
    this.gtmService.pushTag(event);
  }

  getCurrentCurrency(): Observable<string> {
    return this.spartacusCurrencyService.getActive();
  }

  private cartToProducts(cart: Cart): any {
    return cart.entries.map((e) => ({
      code: e.product.code,
      name: e.product.name,
      brands: e.product.brands,
      families: e.product.families,
      price: e.totalPrice,
      discount: 0,
      averageRating: e.quantity
    }));
  }

  private createEcommerceEventParam(products: Product[], quantityParam: number = 1, cart: Cart = null): EcommerceEvent {
    const event: EcommerceEvent = {
      currency: products[0]?.price?.currencyIso,
      value: products[0]?.price?.value,
      items: products.map((product): EcommerceEventItem => ({
        item_id: product.code,
        item_name: product.name,
        item_brand: product.brands ? product.brands[0]?.name : '',
        item_category: product.families ? product.families[0]?.name : '',
        price: product.price?.value,
        discount: 0, // no product level discount
        quantity: quantityParam > -1 ? quantityParam : product.averageRating
      }))
    };
    if (cart !== null) {
      event.value = cart.totalPriceWithTax?.value;
      event.transaction_id = cart.code;
      event.tax = cart.totalTax?.value;
      event.shipping = cart.deliveryCost?.value;
    }
    this.getCurrentCurrency()
      .pipe(take(1))
      .subscribe((currencyCode: string) => {
        event.currency = currencyCode;
      });
    return event;
  }
}
