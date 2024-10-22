import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  Address,
  EntitiesModel,
  OccEndpointsService,
  TranslationService,
  User,
  UserAddressService,
  UserCostCenterService
} from '@spartacus/core';
import {OrgUnitService} from '@spartacus/organization/administration/core';
import {Card} from '@spartacus/storefront';
import {combineLatest, Observable, of, Subscription} from 'rxjs';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {CheckoutStepService} from '@spartacus/checkout/base/components';
import {UserAccountFacade} from '@spartacus/user/account/root';
import {CardWithAddress} from '@spartacus/checkout/b2b/components';
import {CheckoutCostCenterFacade, CheckoutPaymentTypeFacade} from '@spartacus/checkout/b2b/root';
import {ActiveCartFacade, Cart} from '@spartacus/cart/base/root';
import {CheckoutPaymentFacade} from '@spartacus/checkout/base/root';
import {FrankeCartService} from 'src/app/core/services/franke-cart/franke-cart.service';

@Component({
  selector: 'app-franke-billing-address',
  templateUrl: './franke-billing-address.component.html',
  styleUrls: ['./franke-billing-address.component.scss'],
  providers: [WindowSizeUtils],
})
export class FrankeBillingAddressComponent implements OnInit, OnDestroy {
  forceLoader = false; // this helps with smoother steps transition
  doSelectDefaultAdd = false;
  selectedAddress: Address;
  doneAutoSelect = false;
  isAccountPayment = false;
  orgUid: string;
  isMobileOrTable$ = this.windowSizeUtils.match(
    MediaBreakpoint.MOBILE_OR_TABLET
  );
  protected subscriptions = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    protected windowSizeUtils: WindowSizeUtils,
    protected userAddressService: UserAddressService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService,
    protected userAccountFacade: UserAccountFacade,
    protected orgUnitService: OrgUnitService,
    private http: HttpClient,
    private endpoint: OccEndpointsService,
    protected userCostCenterService?: UserCostCenterService,
    protected checkoutPaymentTypeFacade?: CheckoutPaymentTypeFacade,
    protected checkoutCostCenterService?: CheckoutCostCenterFacade,
    protected checkoutPaymentFacade?: CheckoutPaymentFacade,
    private frankeCartService?: FrankeCartService
  ) {
  }

  get isGuestCheckout(): boolean {
    let b;
    this.activeCartFacade.isGuestCart().subscribe(e => b = e.valueOf());
    return b;
  }

  get backBtnText(): string {
    return this.checkoutStepService.getBackBntText(this.activatedRoute);
  }

  get isLoading$(): Observable<boolean> {
    return this.userAddressService.getAddressesLoading();
  }

  get selectedAddress$(): Observable<Address> {
    return of(this.selectedAddress);
  }

  get cards$(): Observable<CardWithAddress[]> {
    return combineLatest([
      this.getSupportedAddresses(),
      this.selectedAddress$,
      this.translation.translate('checkoutAddress.defaultShippingAddress'),
      this.translation.translate('checkoutAddress.selectInvoiceAddress'),
      this.translation.translate('addressCard.selected'),
    ]).pipe(
      tap(([addresses, selected]) => this.selectDefaultAddress(addresses, selected)),
      map(([addresses, selected, textDefault, textShipTo, textSelected]) =>
        (addresses as any).map((address: Address) => ({
          address,
          card: this.getCardContent(address, selected, textDefault, textShipTo, textSelected),
        }))
      )
    );
  }

  getSupportedAddresses(): Observable<Address[]> {
    return this.userAccountFacade.get().pipe(
      switchMap((user: User) => {
        this.orgUid = user.orgUnit.uid;
        return this.orgUnitService.getAddresses(user.orgUnit.uid).pipe(
          map((value: EntitiesModel<Address>) => {
            const billingAddress = value.values.filter((address: Address) => address.billingAddress);

            if (!this.selectedAddress) {
              this.selectedAddress = billingAddress[0];
              this.selectAddress(this.selectedAddress);
            }

            return billingAddress;
          })
        );
      })
    );
  }

  selectDefaultAddress(addresses: Address[], selected: Address): void {
    let cartAdd;
    this.activeCartFacade.getActive().subscribe((cart: Cart) => {
      cartAdd = cart.billingAddress;
      if (!this.doneAutoSelect && cartAdd) {
        this.selectedAddress = cartAdd;
        this.doneAutoSelect = true;
      }
    });
    if (this.doSelectDefaultAdd && !this.doneAutoSelect && addresses && addresses.length &&
      (!selected || Object.keys(selected).length === 0)) {
      if (this.isAccountPayment) {
        if (addresses.length === 1) {
          this.selectAddress(addresses[0]);
        }
      } else {
        selected = addresses.find((address) => address.defaultAddress);
        if (selected) {
          this.selectAddress(selected);
        }
      }
      this.doneAutoSelect = true;
    }
  }

  ngOnInit(): void {
    localStorage.setItem('isOrderProcessing', 'false'); // Store the processing state in localStorage

    let activeBillingAdd;
    this.doSelectDefaultAdd = true;
    this.activeCartFacade.getActive().subscribe((cart: Cart) => {
      activeBillingAdd = cart.billingAddress;
    });
    if (activeBillingAdd) {
      this.doSelectDefaultAdd = false;
      this.selectAddress(activeBillingAdd);
    } else {
    }
    this.document.querySelector('cx-page-layout.MultiStepCheckoutSummaryPageTemplate')?.classList?.remove('franke-review-order');

    if (this.checkoutPaymentTypeFacade && this.userCostCenterService && this.checkoutCostCenterService) {
      this.subscriptions.add(
        this.checkoutPaymentTypeFacade
          .isAccountPayment()
          .pipe(distinctUntilChanged())
          .subscribe((isAccount) => (this.isAccountPayment = isAccount))
      );
    }

    if (!this.isGuestCheckout && !this.isAccountPayment) {
      this.userAddressService.loadAddresses();
    }
  }

  getCardContent(
    address: Address,
    selected: any,
    textDefaultShippingAddress: string,
    textShipToThisAddress: string,
    textSelected: string
  ): Card {
    return {
      title: address.defaultAddress ? textDefaultShippingAddress : '',
      textBold: this.getCardAddressNameContent(address),
      text: [
        address.line1 + ' ' + address.line2,
        address.town + ', ' + address.country.isocode,
        address.postalCode,
        address.phone,
      ],
      actions: [{name: textShipToThisAddress, event: 'send'}],
      header: selected && selected.id === address.id ? textSelected : '',
    };
  }

  getCardAddressNameContent(address: Address): string {
    return address.companyName ? address.companyName : `${address.firstName} ${address.lastName}`;
  }

  selectAddress(address: Address): void {
    const paymentDetails = {billingAddress: address};

    this.http.put<any>(this.endpoint.buildUrl(`/orgUsers/current/carts/current/addresses/billing?updateSap=false&addressId=${address.id}`), {})
      .subscribe(x => {
        this.activeCartFacade.reloadActiveCart();
      });


    this.checkoutPaymentFacade.createPaymentDetails(paymentDetails);
    this.checkoutPaymentFacade.setPaymentDetails(paymentDetails);
    this.selectedAddress = address;
  }

  next(): void {
    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
