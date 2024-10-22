import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {
  Address,
  B2BUnit,
  BaseSiteService,
  EntitiesModel,
  GlobalMessageService,
  OccEndpointsService,
  TranslationService,
  User,
  UserAddressService,
  UserCostCenterService
} from '@spartacus/core';
import {OrgUnitService} from '@spartacus/organization/administration/core';
import {Card} from '@spartacus/storefront';
import {combineLatest, Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {ExtendedBaseStore} from 'src/app/shared/models/misc';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {ActiveCartFacade} from '@spartacus/cart/base/root';
import {UserAccountFacade} from '@spartacus/user/account/root';
import {CheckoutDeliveryAddressFacade, CheckoutDeliveryModesFacade} from '@spartacus/checkout/base/root';
import {CheckoutStepService} from '@spartacus/checkout/base/components';
import {CheckoutCostCenterFacade, CheckoutPaymentTypeFacade} from '@spartacus/checkout/b2b/root';
import {B2BCheckoutDeliveryAddressComponent, CardWithAddress} from '@spartacus/checkout/b2b/components';

// this sets the maximum number of addresses that can be manually added from within the shipping address component
const maxManualAddresses = 5;

@Component({
  selector: 'app-extended-shipping-address',
  templateUrl: './extended-shipping-address.component.html',
  styleUrls: ['./extended-shipping-address.component.scss'],
  providers: [WindowSizeUtils],
})
export class ExtendedShippingAddressComponent
  extends B2BCheckoutDeliveryAddressComponent
  implements OnInit, OnDestroy {
  user$: Observable<User>;
  unit$: Observable<B2BUnit>;
  orgUid: string;
  disableDeliveryAddressChanges: boolean;
  manuallyAddedAddresses: number;
  isMobileOrTable$ = this.windowSizeUtils.match(
    MediaBreakpoint.MOBILE_OR_TABLET
  );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    protected windowSizeUtils: WindowSizeUtils,
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryAddressFacade,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService,
    protected store: Store,
    protected userAccountFacade: UserAccountFacade,
    private storeService: BaseSiteService,
    private http: HttpClient,
    private endpoint: OccEndpointsService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected paymentTypeService: CheckoutPaymentTypeFacade,
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterService: CheckoutCostCenterFacade,
    protected orgUnitService: OrgUnitService,
    protected globalMessageService: GlobalMessageService,
  ) {
    super(
      userAddressService,
      checkoutDeliveryService,
      activatedRoute,
      translation,
      activeCartFacade,
      checkoutStepService,
      checkoutDeliveryModesFacade,
      globalMessageService,
      checkoutCostCenterService,
      paymentTypeService,
      userCostCenterService
    );
  }

  // TODO: maybe check
  // @ts-ignore
  get cards$(): Observable<CardWithAddress[]> {
    this.checkoutStepService.resetSteps();
    return combineLatest([
      this.getSupportedAddresses(),
      this.selectedAddress$,
      this.translation.translate('checkoutAddress.defaultShippingAddress'),
      this.translation.translate('checkoutAddress.shipToThisAddress'),
      this.translation.translate('addressCard.selected'),
    ]).pipe(
      tap(([addresses, selected]) => this.selectDefaultAddress(addresses, selected)),
      map(([addresses, selected, textDefault, textShipTo, textSelected]) =>
        (addresses as any).map((address) => ({
          address,
          card: this.getCardContent(address, selected, textDefault, textShipTo, textSelected),
        }))
      )
    );
  }

  get isLoading$(): Observable<boolean> {
    return of(!this.orgUnitService.getLoadingStatus(this.orgUid));
  }

  // This method is a copy from ShippingAddressComponent
  // only difference is "else if (addresses.length > 0)" statement to select

  ngOnInit(): void {
    localStorage.setItem('isOrderProcessing', 'false'); // Store the processing state in localStorage

    this.document.querySelector('cx-page-layout.MultiStepCheckoutSummaryPageTemplate')?.classList?.remove('franke-review-order');
    this.storeService.getActive().subscribe((store) => {
      this.http
        .get<ExtendedBaseStore>(this.endpoint.buildUrl(`/basestores/${store}`))
        .subscribe((data) => {
          this.disableDeliveryAddressChanges = data.disableDeliveryAddressChanges;
        });
    });
    // this compares the total shipping addresses and the addresses coming from SAP, determining how many have been manually added
    this.cards$.pipe(
      switchMap((allAddresses) => {
        return this.getSapAddresses().pipe(
          map((sapAddresses) => {
            this.manuallyAddedAddresses = allAddresses.length - sapAddresses.length;
            if (this.manuallyAddedAddresses >= maxManualAddresses) {
              this.disableDeliveryAddressChanges = true;
            }
          })
        );
      })
    ).subscribe();
  }

  // 1st address if there is no default address
  selectDefaultAddress(addresses: Address[], selected: Address): void {
    if (
      !this.doneAutoSelect &&
      addresses &&
      addresses.length &&
      (!selected || Object.keys(selected).length === 0)
    ) {
      if (this.isAccountPayment) {
        if (addresses.length === 1) {
          this.selectAddress(addresses[0]);
        }
      } else {
        selected = addresses.find((address) => address.defaultAddress);
        if (selected) {
          this.selectAddress(selected);
        } else if (addresses.length > 0) {
          this.selectAddress(addresses[0]);
        }
      }
      this.doneAutoSelect = true;
    }
  }

  selectAddress(address: Address): void {
    this.checkoutDeliveryService.setDeliveryAddress(address);
    this.checkoutStepService.resetSteps();
  }

  getCardContent(
    address: Address,
    selected: any,
    textDefaultShippingAddress: string,
    textShipToThisAddress: string,
    textSelected: string
  ): Card {
    const actions: { name: string; event: string }[] = [];
    if (!(selected?.id === address?.id)) {
      actions.push({name: textShipToThisAddress, event: 'send'});
    }
    if (selected?.id === undefined && address.defaultAddress) {
      selected = address;
    }

    return {
      title: address.defaultAddress ? textDefaultShippingAddress : '',
      textBold: this.getCardAddressNameContent(address),
      text: [
        address.line1 + ' ' + address.line2,
        address.town + ', ' + address.country.isocode,
        address.postalCode,
        address.phone,
      ],
      actions,
      header: selected && selected?.id === address?.id ? textSelected : '',
    };
  }

  getCardAddressNameContent(address: Address): string {
    return address.companyName ? address.companyName : `${address.firstName} ${address.lastName}`;
  }

  getSupportedAddresses(): Observable<Address[]> {
    this.user$ = this.userAccountFacade.get();
    return this.user$.pipe(
      switchMap((user: User) => {
        this.orgUid = user.orgUnit.uid;
        return this.orgUnitService.getAddresses(user.orgUnit.uid)
          .pipe(
            map((value: EntitiesModel<Address>) => value.values.filter((address: Address) => address.shippingAddress))
          );
      })
    );
  }

  /**
   * this function returns only the shipping addresses that are coming from SAP.
   */
  getSapAddresses(): Observable<Address[]> {
    this.user$ = this.userAccountFacade.get();
    return this.user$.pipe(
      switchMap((user: User) => {
        this.orgUid = user.orgUnit.uid;
        return this.orgUnitService.getAddresses(user.orgUnit.uid)
          .pipe(
            map((value: EntitiesModel<Address>) => value.values.filter((address: Address) => address.shippingAddress && address.sapAddress))
          );
      })
    );
  }

  addAddress(address: Address): void {
    if (Boolean(address)) {
      this.addressFormOpened = false;
      this.manuallyAddedAddresses++;
      if (this.manuallyAddedAddresses >= maxManualAddresses) {
        this.disableDeliveryAddressChanges = true;
      }
      this.userAccountFacade.get()
        .subscribe((user: User) => {
          this.orgUnitService.createAddress(user.orgUnit.uid, address);
          if (address.defaultAddress === true) {
            this.selectAddress(address);
          }
        })
        .unsubscribe();
    }
  }

  next(): void {
    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }


}

