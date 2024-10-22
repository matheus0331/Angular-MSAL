import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {
  AccountInfo,
  AuthenticationResult,
  BrowserConfigurationAuthError,
  EventType,
  InteractionType,
  StringUtils
} from '@azure/msal-browser';
import {Inject, Injectable} from '@angular/core';
import {MSAL_INTERCEPTOR_CONFIG, MsalInterceptorConfiguration, MsalService} from '@azure/msal-angular';
import {
  AuthActions,
  AuthStorageService,
  BaseSiteService,
  CurrencyService,
  LanguageService,
  OCC_USER_ID_CURRENT,
  StateWithClientAuth,
  UserIdService
} from '@spartacus/core';
import {TimeUtils} from '../../utils/time-utils';
import {Store} from '@ngrx/store';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import {environment} from '../../../../environments/environment';
import {UserAccountFacade} from '@spartacus/user/account/root';
import isProduction from '../../../configs/runtime-env';
import {WindowStorageService} from '@core/services/window-storage/window-storage.service';

export const ACCESS_TOKEN = 'access_token';
export const REDIRECT_TOKEN = 'redirect_token';

@Injectable()
export class ExtendedMsalInterceptor implements HttpInterceptor {
  token: string | null = null;
  private enableLogging = true;

  constructor(
    @Inject(MSAL_INTERCEPTOR_CONFIG)
    private msalInterceptorConfig: MsalInterceptorConfiguration,
    private authService: MsalService,
    private userIdService: UserIdService,
    private store: Store<StateWithClientAuth>,
    private authStorageService: AuthStorageService,
    private storage: WindowStorageService,
    private userAccountFacade: UserAccountFacade,
    private baseSiteService: BaseSiteService,
    private languageService: LanguageService,
    private currencyService: CurrencyService
  ) {
    this.log('[ExtendedMsalInterceptor] Initializing interceptor...');

    // 1. Keep logged-in users logged in by copying tokens from localStorage to cookies
    this.copyTokensToCookies();
    this.log('[ExtendedMsalInterceptor] Tokens copied to cookies.');

    this.token = this.getAccessToken();
    if (this.token) {
      this.log('[ExtendedMsalInterceptor] Access token found.');
      const {exp} = jwtDecode<JwtPayload>(this.token);
      if (!TimeUtils.isTokenExpired(String(exp), (this.authService.instance as any).config.system.tokenRenewalOffsetSeconds)) {
        this.log('[ExtendedMsalInterceptor] Token is valid and not expired.');
        this.setRedirectToken();
        this.userIdService.setUserId(OCC_USER_ID_CURRENT);
        this.store.dispatch(new AuthActions.Login());
        this.authStorageService.setItem(ACCESS_TOKEN, this.token);
        this.setAccessToken(this.token);
        this.updateUserContext();
      } else {
        this.log('[ExtendedMsalInterceptor] Token is expired.');
      }
    }

    const accounts = this.authService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.log('[ExtendedMsalInterceptor] Setting active account.');
      this.authService.instance.setActiveAccount(accounts[0]);
    }

    this.authService.instance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && (event.payload as any).account) {
        this.log('[ExtendedMsalInterceptor] Login success, setting active account.');
        const account = (event.payload as any).account;
        this.authService.instance.setActiveAccount(account);
        window.location.reload();
      }
    });

    if (typeof window !== 'undefined') {
      this.log('[ExtendedMsalInterceptor] Handling redirect observable.');
      this.authService.handleRedirectObservable().subscribe({
        next: (result: AuthenticationResult) => {
          if (result) {
            this.log('[ExtendedMsalInterceptor] Redirect result received, setting tokens and updating user data.');
            this.setRedirectToken();
            this.authService.instance.setActiveAccount(result.account);
            this.userIdService.setUserId(OCC_USER_ID_CURRENT);
            this.store.dispatch(new AuthActions.Login());
            this.authService.instance.getActiveAccount();
            this.updateUserContext();
            this.removeHashFromUrl();
          } else {
            this.log('[ExtendedMsalInterceptor] No result from redirect.');
            this.handleRedirectWithoutResult();
          }
        },
        error: (err) => {
          this.log('[ExtendedMsalInterceptor] Error during login:', err);
          this.redirectToDefaultPage();
        },
      });
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.log('[ExtendedMsalInterceptor] Intercepting HTTP request:', req.url);

    if (typeof window === 'undefined') {
      this.log('[ExtendedMsalInterceptor] No window object available, skipping interception.');
      return next.handle(req);
    }

    if ((this.authService.instance as any).isBrowserEnvironment) {
      if (
        this.msalInterceptorConfig.interactionType !== InteractionType.Popup &&
        this.msalInterceptorConfig.interactionType !== InteractionType.Redirect
      ) {
        this.log('[ExtendedMsalInterceptor] Invalid interaction type provided.');
        throw new BrowserConfigurationAuthError(
          'invalid_interaction_type',
          'Invalid interaction type provided to MSAL Interceptor. InteractionType.Popup, InteractionType.Redirect must be provided in the msalInterceptorConfiguration'
        );
      }

      this.log('[ExtendedMsalInterceptor] MSAL Interceptor activated.');
      const scopes = this.getScopesForEndpoint(req.url);

      let account: AccountInfo;
      if (!!this.authService.instance.getActiveAccount()) {
        this.log('[ExtendedMsalInterceptor] Active account found.');
        account = this.authService.instance.getActiveAccount();
      } else {
        this.log('[ExtendedMsalInterceptor] No active account, falling back to first available account.');
        account = this.authService.instance.getAllAccounts()[0];
      }

      if (!scopes || scopes.length === 0) {
        this.log('[ExtendedMsalInterceptor] No scopes found for this endpoint.');
        return next.handle(req);
      }

      let expired = false;
      if (this.token !== null) {
        const {exp} = jwtDecode<JwtPayload>(this.token);
        expired = TimeUtils.isTokenExpired(String(exp), (this.authService.instance as any).config.system.tokenRenewalOffsetSeconds);
      }

      if (this.token === null || expired) {
        this.log('[ExtendedMsalInterceptor] Token is missing or expired, attempting to acquire a new token.');
        return this.authService
          .acquireTokenSilent({
            ...this.msalInterceptorConfig.authRequest,
            scopes,
            account,
          })
          .pipe(
            catchError(() => {
              this.log('[ExtendedMsalInterceptor] Silent token acquisition failed, redirecting.');
              const redirectStartPage = window.location.href;
              return this.authService.acquireTokenRedirect({
                ...this.msalInterceptorConfig.authRequest,
                scopes,
                redirectStartPage,
              });
            }),
            switchMap((result: AuthenticationResult) => {
              this.log('[ExtendedMsalInterceptor] Token acquired successfully, setting authorization headers.');
              this.token = result.accessToken;
              this.setAccessToken(result.accessToken);

              setCookie(ACCESS_TOKEN, result.accessToken, 1);

              const headers = req.headers.set('Authorization', `Bearer ${result.accessToken}`);
              const requestClone = req.clone({headers});
              return next.handle(requestClone);
            })
          );
      } else {
        this.log('[ExtendedMsalInterceptor] Token is valid, setting authorization headers.');
        const headers = req.headers.set('Authorization', `Bearer ${this.token}`);
        const requestClone = req.clone({headers});
        return next.handle(requestClone);
      }
    }
  }

  private setAccessToken(token: string): void {
    this.log('[ExtendedMsalInterceptor] Setting access token.');
    setCookie(ACCESS_TOKEN, token, 1);
  }

  private getAccessToken(): string | null {
    this.log('[ExtendedMsalInterceptor] Retrieving access token from cookies.');
    return getCookie(ACCESS_TOKEN);
  }

  private removeHashFromUrl(): void {
    this.log('[ExtendedMsalInterceptor] Removing hash fragments from URL.');
    if (window.location.hash) {
      const cleanUrl = window.location.href.split('#')[0];
      window.history.replaceState(null, '', cleanUrl);
    }
  }

  private copyTokensToCookies(): void {
    this.log('[ExtendedMsalInterceptor] Copying tokens from localStorage to cookies.');
    const localAccessToken = this.storage.getItemFromLocalStorage(ACCESS_TOKEN);
    const localRedirectToken = this.storage.getItemFromLocalStorage(REDIRECT_TOKEN);

    if (localAccessToken) {
      setCookie(ACCESS_TOKEN, localAccessToken, 1);
    }
    if (localRedirectToken) {
      setCookie(REDIRECT_TOKEN, localRedirectToken, 1);
    }
  }

  private getScopesForEndpoint(endpoint: string): Array<string> | null {
    this.log('[ExtendedMsalInterceptor] Getting scopes for endpoint:', endpoint);
    const protectedResourcesArray = Array.from(this.msalInterceptorConfig.protectedResourceMap.keys());
    const keyMatchesEndpointArray = protectedResourcesArray.filter((key) => {
        return StringUtils.matchPattern(key, endpoint);
    });

    if (keyMatchesEndpointArray.length > 0) {
        const keyForEndpoint = keyMatchesEndpointArray[0];
        if (keyForEndpoint) {
            const scopes = this.msalInterceptorConfig.protectedResourceMap.get(keyForEndpoint);
            return scopes as Array<string>; // Type assertion here
        }
    }
  }

  private handleRedirectWithoutResult(): void {
    this.log('[ExtendedMsalInterceptor] Handling redirect without result.');
    if (window.location.href.includes('#state=') || window.location.href.includes('#client_info')) {
      this.setRedirectToken();
      this.store.dispatch(new AuthActions.Login());
    }
    if (environment.production && getCookie(REDIRECT_TOKEN) === null) {
      this.redirectToDefaultPage();
    }
    this.removeHashFromUrl();
  }

  private updateUserContext(): void {
    this.log('[ExtendedMsalInterceptor] Updating user context.');
    this.userAccountFacade
      .get()
      .pipe(
        filter((user) => !!user?.registrationSite?.uid),
        take(1)
      )
      .subscribe((user) => {
        this.log('[ExtendedMsalInterceptor] User context updated. Setting site, language, and currency.');
        this.baseSiteService.setActive(user.registrationSite.uid);
        this.languageService.setActive(user.language.isocode);
        this.currencyService.setActive(user.currency.isocode);
      });
  }

  private redirectToDefaultPage(): void {
    this.log('[ExtendedMsalInterceptor] Redirecting to default page.');
    if (getCookie(REDIRECT_TOKEN) === null) {
      isProduction()
        ? (window.location.href = 'https://b2b-portal.franke.com')
        : (window.location.href = 'https://b2b-portal.franke.com/main/en/test.html');
    }
  }

  private setRedirectToken(): void {
    this.log('[ExtendedMsalInterceptor] Setting redirect token.');
    setCookie(REDIRECT_TOKEN, 'true', 1);
  }

  private log(...messages: any[]): void {
    if (this.enableLogging) {
      console.log(...messages);
    }
  }
}

// Utility functions for managing cookies
function setCookie(name: string, value: string, days: number): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;SameSite=None;domain=${window.location.hostname}`;
}

function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.indexOf(nameEQ) === 0) {
      return trimmedCookie.substring(nameEQ.length);
    }
  }
  return null;
}
