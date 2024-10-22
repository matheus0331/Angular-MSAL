import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {
  Address,
  AddressValidation,
  Country,
  EntitiesModel,
  ErrorModel,
  GlobalMessageService,
  GlobalMessageType,
  Region,
  TranslationService,
  User,
  UserAddressService,
} from '@spartacus/core';
import {OrgUnitService} from '@spartacus/organization/administration/core';
import {LaunchDialogService} from '@spartacus/storefront';
import {Subscription} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {UserAccountFacade} from '@spartacus/user/account/root';
import {AddressFormComponent} from '@spartacus/user/profile/components';
import {UserProfileFacade} from '@spartacus/user/profile/root';

@Component({
  selector: 'app-address-form',
  templateUrl: './extended-address-form.component.html',
  styleUrls: ['./extended-address-form.component.scss'],
})
export class ExtendedAddressFormComponent
  extends AddressFormComponent
  implements OnInit, OnDestroy {
  addressForm: UntypedFormGroup = this.fb.group({
    country: this.fb.group({
      isocode: [null, Validators.required],
    }),
    titleCode: [null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    town: ['', Validators.required],
    region: this.fb.group({
      isocode: [null, Validators.required],
    }),
    postalCode: ['', Validators.required],
    phone: '',
    defaultAddress: [false],
  });
  private userSub: Subscription;

  constructor(
    protected fb: UntypedFormBuilder,
    protected userAccountFacade: UserAccountFacade,
    protected userAddressService: UserAddressService,
    protected globalMessageService: GlobalMessageService,
    protected userProfileFacade: UserProfileFacade,
    protected launchDialogService: LaunchDialogService,
    protected translationService: TranslationService,
    protected orgUnitService: OrgUnitService
  ) {
    super(
      fb,
      userAddressService,
      globalMessageService,
      translationService,
      launchDialogService,
      userProfileFacade
    );
  }

  ngOnInit(): void {
    // Fetching countries
    this.countries$ = this.userAddressService.getDeliveryCountries().pipe(
      tap((countries: Country[]) => {
        if (Object.keys(countries).length === 0) {
          this.userAddressService.loadDeliveryCountries();
        }
      })
    );

    // Fetching titles
    this.titles$ = this.userProfileFacade.getTitles();

    // Fetching regions
    this.regions$ = this.selectedCountry$.pipe(
      switchMap((country) => this.userAddressService.getRegions(country)),
      tap((regions: Region[]) => {
        const regionControl = this.addressForm.get('region.isocode');
        if (regions && regions.length > 0) {
          regionControl.enable();
        } else {
          regionControl.disable();
        }
      })
    );


    if (this.addressData && Object.keys(this.addressData).length !== 0) {
      this.addressForm.patchValue(this.addressData);

      this.countrySelected(this.addressData.country);
      if (this.addressData.region) {
        this.regionSelected(this.addressData.region);
      }
    }

    this.userSub = this.userAccountFacade.get().subscribe((user: User) => {
      this.addresses$ = this.orgUnitService
        .getAddresses(user.orgUnit.uid)
        .pipe(map((value: EntitiesModel<Address>) => value.values));
    });
  }

  toggleDefaultAddress(): void {
    if (this.addressData?.defaultAddress === false) {
      this.addressData.defaultAddress = true;
    }
    if (this.addressData?.defaultAddress === true) {
      this.addressData.defaultAddress = false;
    }
  }

  ngOnDestroy(): void {
    // this.checkoutDeliveryService.clearAddressVerificationResults();


    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }


  protected handleAddressVerificationResults(results: AddressValidation): void {
    // verify the new added address
    if (results.decision === 'FAIL') {
      // this.checkoutDeliveryService.clearAddressVerificationResults();
    } else if (results.decision === 'ACCEPT') {
      if (this.addressForm.value.defaultAddress === true) {
        this.setAsDefaultField = true;
      }
      this.submitAddress.emit(this.addressForm.value);
    } else if (results.decision === 'REJECT') {
      // TODO: Workaround: allow server for decide is titleCode mandatory (if yes, provide personalized message)
      if (
        results.errors.errors.some(
          (error: ErrorModel) => error.subject === 'titleCode'
        )
      ) {
        this.globalMessageService.add(
          {key: 'addressForm.titleRequired'},
          GlobalMessageType.MSG_TYPE_ERROR
        );
      } else {
        this.globalMessageService.add(
          {key: 'addressForm.invalidAddress'},
          GlobalMessageType.MSG_TYPE_ERROR
        );
      }
      // this.checkoutDeliveryService.clearAddressVerificationResults();
    } else if (results.decision === 'REVIEW') {
      this.openSuggestedAddress(results);
    }
  }
}
