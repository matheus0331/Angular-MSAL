import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FrankeCartService} from 'src/app/core/services/franke-cart/franke-cart.service';
import {Cart} from '@spartacus/cart/base/root';
import {CheckoutStepService} from '@spartacus/checkout/base/components';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
})
export class CheckoutSummaryComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;

  constructor(
    public activatedRoute: ActivatedRoute,
    private frankeCartService: FrankeCartService,
    protected checkoutStepService: CheckoutStepService,
  ) {
  }

  get isLoading$(): Observable<boolean> {
    return this.frankeCartService.getActiveCartLoading();
  }

  get isUpdating$(): Observable<boolean> {
    return this.frankeCartService.getIsUpdatingCart();
  }

  ngOnInit(): void {
    this.frankeCartService.loadCart(false);
    this.cart$ = this.frankeCartService.getActiveCart();
  }

  shouldShowAdditionalInfoForm(): Observable<boolean> {
    return this.activatedRoute.url.pipe(
      map((url) => !!url.find((segment) => segment.toString().includes('cart')))
    );
  }

  ngOnDestroy(): void {
  }
}
