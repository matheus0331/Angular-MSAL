import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Address,
  BaseSiteService,
  EntitiesModel,
  GlobalMessageService,
  OccEndpointsService,
  TranslationService,
  User,
  UserAddressService
} from '@spartacus/core';
import {OrgUnitService} from '@spartacus/organization/administration/core';
import {combineLatest, Observable, of, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserAccountFacade} from '@spartacus/user/account/root';
import {CheckoutDeliveryAddressFacade} from '@spartacus/checkout/base/root';
import {ExtendedBaseStore} from '@shared/models/misc';
import {AddressBookComponent, AddressBookComponentService} from '@spartacus/user/profile/components';

@Component({
  selector: 'app-extended-address-book',
  templateUrl: './extended-address-book.component.html',
  styleUrls: ['./extended-address-book.component.scss'],
})
export class ExtendedAddressBookComponent
  extends AddressBookComponent
  implements OnInit, OnDestroy {
  orgUID: string;
  private subscription: Subscription;
  private hideAddButton: boolean;

  constructor(
    public addressBookService: AddressBookComponentService,
    protected translation: TranslationService,
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryAddressFacade,
    protected userAccountFacade: UserAccountFacade,
    protected orgUnitService: OrgUnitService,
    protected globalMessageService: GlobalMessageService,
    private storeService: BaseSiteService,
    private http: HttpClient,
    private endpoint: OccEndpointsService
  ) {
    super(
      addressBookService,
      translation,
      globalMessageService
    );
  }

  ngOnInit(): void {
    this.subscription = this.userAccountFacade.get().subscribe((user: User) => {
      this.addressesStateLoading$ = of(false);
      this.orgUID = user.orgUnit.uid;
      this.addresses$ = this.orgUnitService
        .getAddresses(user.orgUnit.uid)
        .pipe(map((value: EntitiesModel<Address>) => value.values));
    });

    this.storeService.getActive().subscribe((store) => {
      this.http
        .get<ExtendedBaseStore>(this.endpoint.buildUrl(`/basestores/${store}`))
        .subscribe((data) => {
          this.hideAddButton = data.disableDeliveryAddressChanges;
        });
    });
  }

  addAddressSubmit(address: Address): void {
    this.showAddAddressForm = false;
    this.orgUnitService.createAddress(this.orgUID, address);
  }

  editAddressSubmit(address: Address): void {
    this.showEditAddressForm = false;
    this.orgUnitService.updateAddress(
      this.orgUID,
      this.currentAddress.id,
      address
    );
  }

  deleteAddress(addressId: string): void {
    this.orgUnitService.deleteAddress(this.orgUID, addressId);
    this.checkoutDeliveryService.clearCheckoutDeliveryAddress();
  }

  getCardContent(
    address: Address
  ): Observable<{
    textBold: string;
    text: string[];
    actions: {
      name: string;
      event: string;
    }[];
    header: string;
    deleteMsg: string;
  }> {
    return combineLatest([
      this.translation.translate('addressCard.default'),
      this.translation.translate('addressCard.setAsDefault'),
      this.translation.translate('common.delete'),
      this.translation.translate('common.edit'),
      this.translation.translate('addressBook.areYouSureToDeleteAddress'),
    ]).pipe(
      map(
        ([
           defaultText,
           setAsDefaultText,
           textDelete,
           textEdit,
           textVerifyDeleteMsg,
         ]) => {
          const actions: { name: string; event: string }[] = [];
          if (!address.defaultAddress) {
            actions.push({name: setAsDefaultText, event: 'default'});
          }
          if (!address.sapAddress && !this.hideAddButton) {
            actions.push({name: textEdit, event: 'edit'});
            actions.push({name: textDelete, event: 'delete'});
          }

          return {
            textBold: this.getCardAddtessNameContent(address),
            text: [
              address.line1 + ' ' + address.line2,
              address.town + ', ' + address.country.isocode,
              address.postalCode,
              address.phone,
            ],
            actions,
            header: address.defaultAddress ? `✓ ${defaultText}` : '',
            deleteMsg: textVerifyDeleteMsg,
          };
        }
      )
    );
  }

  getCardAddtessNameContent(address: Address): string {
    return address.companyName ? address.companyName : `${address.firstName} ${address.lastName}`;
  }

  setAddressAsDefault(address?: Address): void {

    this.orgUnitService.updateAddress(this.orgUID, address.toString(), {
      ...address,
      defaultAddress: true,
    });
    this.checkoutDeliveryService.clearCheckoutDeliveryAddress();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
