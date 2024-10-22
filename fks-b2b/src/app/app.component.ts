import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MsalBroadcastService, MsalService} from '@azure/msal-angular';
import {AuthenticationResult, EventMessage, EventType} from '@azure/msal-browser';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {BaseSiteService, CurrencyService, LanguageService, WindowRef} from '@spartacus/core';
import {Subject} from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';
import {prodConfig, qaConfig} from './configs/msal-config';
import {BrandsService} from '@core/services/brands/brands.service';
import {FrankeGoogleTagManagerService} from '@core/services/franke-google-tag-manager/franke-google-tag-manager.service';
import {UserAccountFacade} from '@spartacus/user/account/root';

import {CartActions} from '@spartacus/cart/base/core';
import {isProd} from './configs/runtime-env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'franke';
  destroyed$ = new Subject<boolean>();

  constructor(
    private gtmService: FrankeGoogleTagManagerService,
    private router: Router,
    private brandsService: BrandsService,
    private userAccountFacade: UserAccountFacade,
    private baseSiteService: BaseSiteService,
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private windowRef: WindowRef,
    private updates$: Actions,
    private store: Store,
    private route: ActivatedRoute,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
  ) {
    this.userAccountFacade
      .get()
      .pipe(
        filter((user) => !!user?.registrationSite?.uid),
        take(1)
      )
      .subscribe((user) => {
        this.windowRef.nativeWindow.history.pushState(
          '',
          '',
          this.windowRef.nativeWindow.location.pathname
        );
        this.baseSiteService.setActive(user.registrationSite.uid);
        this.languageService.setActive(user.language.isocode);
        this.currencyService.setActive(user.currency.isocode);
        this.brandsService.getBrands();
      });
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url,
        };
        this.gtmService.pushTag(gtmTag);
      }
    });
    this.updates$
      .pipe(
        ofType(
          ...[
            CartActions.CART_ADD_ENTRY_SUCCESS,
          ]
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.store.dispatch(new CartActions.ClearCartState());
      });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.has('brand')) {
        this.brandsService.setCurrentBrand(params.get('brand'));
      }
    });

    this.broadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((result) => {
        const b2cPolicies = isProd
          ? prodConfig.b2cPolicies.names.forgotPassword
          : qaConfig.b2cPolicies.names.forgotPassword;
        // We need to reject id tokens that were not issued with the default sign-in policy.
        // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
        // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
        if (
          ((result.payload as AuthenticationResult).idTokenClaims as any)
            .acr === b2cPolicies
        ) {
          return this.authService.logout();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
