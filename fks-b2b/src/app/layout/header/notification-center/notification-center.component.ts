import {Component, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {LanguageService, RoutingService} from '@spartacus/core';
import {BehaviorSubject, interval, Subscription} from 'rxjs';
import {filter, first} from 'rxjs/operators';
import {FrankeOrderNotificationService} from 'src/app/core/services/franke-order-notification/franke-order-notification.service';
import {FrankeOrderNotification} from 'src/app/shared/models/franke-order-notification';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
})
export class NotificationCenterComponent implements OnDestroy {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);
  isMenuOpen$ = new BehaviorSubject(false);

  counterSub: Subscription;
  counter = interval(300000);

  allNotificationsSub: Subscription;
  allNotifications$: BehaviorSubject<FrankeOrderNotification[]> = new BehaviorSubject(null);

  unreadNotificationsSub: Subscription;
  unreadNotifications$: BehaviorSubject<FrankeOrderNotification[]> = new BehaviorSubject(null);
  userIdSub: Subscription;
  languageSub: Subscription;

  constructor(
    protected windowSizeUtils: WindowSizeUtils,
    private eRef: ElementRef,
    private orderNotificationService: FrankeOrderNotificationService,
    private languageService: LanguageService,
    protected routing: RoutingService
  ) {
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
            this.getAllNotifications();
            this.getUnreadNotifications();
          });
          // makes the request once when started and every time the language changes
          this.languageSub = this.languageService.getActive().subscribe(() => {
            this.getAllNotifications();
            this.getUnreadNotifications();
          });
        }
      });
  }

  @HostListener('document:click', ['$event']) onClick(event): void {
    this.isMenuOpen$
      .subscribe((isOpen: boolean) => {
        if (isOpen && !this.eRef.nativeElement.contains(event.target)) {
          this.toggleMenu();
        }
      })
      .unsubscribe();
  }

  readNotification(notification: FrankeOrderNotification): void {
    this.orderNotificationService.readNotification(notification);
    setTimeout(() => {
      this.getAllNotifications();
    }, 1000);
    this.toggleMenu();
  }

  getAllNotifications(): void {
    this.allNotificationsSub = this.orderNotificationService
      .getAllNotifications()
      .subscribe((notifications) => {
        if (notifications.length > 0) {
          this.allNotifications$.next(notifications);
        }
      });
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

  toggleMenu(): void {
    this.isMenuOpen$
      .subscribe((value: boolean) => {
        this.isMenuOpen$ = new BehaviorSubject(!value);
        this.unreadNotifications$.next(null);
        this.orderNotificationService.notificationsRead$.next(false);
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
    if (this.counterSub) {
      this.counterSub.unsubscribe();
    }
    if (this.allNotificationsSub) {
      this.allNotificationsSub.unsubscribe();
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
