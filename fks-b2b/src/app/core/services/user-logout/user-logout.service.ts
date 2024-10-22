import {Injectable} from '@angular/core';
import {MsalService} from '@azure/msal-angular';
import {UserIdService} from '@spartacus/core';
import {WindowStorageService} from '../window-storage/window-storage.service';
import {ACCESS_TOKEN, REDIRECT_TOKEN} from '@core/interceptors/extended-msal/extended-msal.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UserLogoutService {
  constructor(
    private msalService: MsalService,
    private userIdService: UserIdService,
    private windowStorageService: WindowStorageService
  ) {
  }

  logout(): void {
    this.windowStorageService.clearLocalStorage();
    this.windowStorageService.clearSessionStorage();
    // Clear cookies
    deleteCookie(ACCESS_TOKEN);
    deleteCookie(REDIRECT_TOKEN);
    this.userIdService.clearUserId();
    this.msalService.logout();
  }
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; Max-Age=-99999999; path=/;domain=${window.location.hostname}`;
}

