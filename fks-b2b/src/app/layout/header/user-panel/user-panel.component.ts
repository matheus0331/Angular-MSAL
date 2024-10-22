import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {User, WindowRef} from '@spartacus/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {UserLogoutService} from 'src/app/core/services/user-logout/user-logout.service';

import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {UserAccountFacade} from '@spartacus/user/account/root';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  providers: [WindowSizeUtils],
})
export class UserPanelComponent implements OnInit {
  user$: Observable<User>;
  isMenuOpen$ = new BehaviorSubject(false);
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  constructor(
    private userAccountFacade: UserAccountFacade,
    private eRef: ElementRef,
    private winRef: WindowRef,
    private userLogoutService: UserLogoutService,
    protected windowSizeUtils: WindowSizeUtils
  ) {
  }

  @HostListener('document:click', ['$event']) onClick(event): void {
    this.isMenuOpen$
      .subscribe((isOpen: boolean) => {
        if (
          isOpen &&
          !this.winRef.document
            .getElementsByClassName('user')[0]
            .contains(event.target)
        ) {
          this.toggleMenu();
        }
      })
      .unsubscribe();
  }

  ngOnInit(): void {
    this.user$ = this.userAccountFacade.get();
  }

  toggleMenu(): void {
    this.isMenuOpen$
      .subscribe((value: boolean) => {
        this.isMenuOpen$ = new BehaviorSubject(!value);
      })
      .unsubscribe();
  }

  ssoLogout(event: Event): void {
    event.preventDefault();
    this.userLogoutService.logout();
  }
}
