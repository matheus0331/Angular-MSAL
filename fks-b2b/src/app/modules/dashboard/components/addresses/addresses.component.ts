import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {
  Address,
  BaseSiteService,
  EntitiesModel,
  GlobalMessageService,
  OccEndpointsService,
  TranslationService,
  User
} from '@spartacus/core';
import {OrgUnitService} from '@spartacus/organization/administration/core';
import {of, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {ExtendedBaseStore} from 'src/app/shared/models/misc';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {UserAccountFacade} from '@spartacus/user/account/root';
import {AddressBookComponent, AddressBookComponentService} from '@spartacus/user/profile/components';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  providers: [WindowSizeUtils],
})
export class AddressesComponent extends AddressBookComponent implements OnInit {
  public hideAddButton: boolean;
  orgUID: string;
  isTabletOrDesktop$ = this.windowSizeUtils.match(
    MediaBreakpoint.TABLET_OR_DESKTOP
  );
  private subscription: Subscription;

  constructor(
    public addressBookService: AddressBookComponentService,
    protected translation: TranslationService,
    protected globalMessageService: GlobalMessageService,
    protected userAccountFacade: UserAccountFacade,
    protected orgUnitService: OrgUnitService,
    protected windowSizeUtils: WindowSizeUtils,
    private storeService: BaseSiteService,
    private http: HttpClient,
    private endpoint: OccEndpointsService
  ) {
    super(
      addressBookService,
      translation,
      globalMessageService,
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
        .subscribe((data) => this.hideAddButton = data.disableDeliveryAddressChanges);
    });
  }
}
