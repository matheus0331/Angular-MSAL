import {Component, OnDestroy} from '@angular/core';
import {LanguageService, WindowRef} from '@spartacus/core';
import {HamburgerMenuComponent, HamburgerMenuService} from '@spartacus/storefront';
import {BehaviorSubject, interval, Subscription} from 'rxjs';
import {filter, first} from 'rxjs/operators';
import {FrankeOrderNotificationService} from 'src/app/core/services/franke-order-notification/franke-order-notification.service';
import {FrankeOrderNotification} from 'src/app/shared/models/franke-order-notification';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-franke-hamburger-menu',
  templateUrl: './franke-hamburger-menu.component.html',
  styleUrls: ['./franke-hamburger-menu.component.scss'],
  providers: [WindowSizeUtils],
})
export class FrankeHamburgerMenuComponent
  extends HamburgerMenuComponent
  implements OnDestroy {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  unreadNotificationsSub: Subscription;
  unreadNotifications$: BehaviorSubject<
    FrankeOrderNotification[]
  > = new BehaviorSubject(null);
  userIdSub: Subscription;
  languageSub: Subscription;

  counterSub: Subscription;
  counter = interval(300000);

  constructor(
    hamburgerMenuService: HamburgerMenuService,
    protected windowSizeUtils: WindowSizeUtils,
    protected winRef: WindowRef,
    private orderNotificationService: FrankeOrderNotificationService,
    private languageService: LanguageService
  ) {
    super(hamburgerMenuService);

    this.userIdSub = this.orderNotificationService.userUID
      // checks first if the uid is defined
      .pipe(filter((data) => data !== undefined))
      // gets the first value to avoid multiple requests
      .pipe(first())
      .subscribe((userUID) => {
        // double check if the UID exists
        if (userUID) {
          // makes the request every 5 minutes if notifications are on
          this.counterSub = this.counter.subscribe(() => {
            this.getUnreadNotifications();
          });
          // makes the request once when started and every time the language changes
          this.languageSub = this.languageService.getActive().subscribe(() => {
            this.getUnreadNotifications();
          });
        }
      });

    this.orderNotificationService.notificationsRead$.subscribe(
      (notificationsStatus) => {
        if (!notificationsStatus) {
          this.unreadNotifications$.next(null);
        }
      }
    );
  }

  getUnreadNotifications(): void {
    this.unreadNotificationsSub = this.orderNotificationService
      .getUnreadNotifications()
      .subscribe((notifications) => {
        notifications.length > 0
          ? this.unreadNotifications$.next(notifications)
          : this.unreadNotifications$.next(null);
      });
  }

  ngOnDestroy(): void {
    if (this.counterSub) {
      this.counterSub.unsubscribe();
    }
    if (this.unreadNotificationsSub) {
      this.unreadNotificationsSub.unsubscribe();
    }
    if (this.languageSub) {
      this.languageSub.unsubscribe();
    }
    if (this.userIdSub) {
      this.userIdSub.unsubscribe();
    }
  }
}
