import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '@spartacus/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {filter, first} from 'rxjs/operators';

import {FrankeOrderNotificationService} from 'src/app/core/services/franke-order-notification/franke-order-notification.service';
import {UserAccountFacade} from '@spartacus/user/account/root';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  userSub: Subscription;

  notificationsStatusSub: Subscription;
  notificationsStatus$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private userAccountFacade: UserAccountFacade,
    private location: Location,
    private orderNotificationService: FrankeOrderNotificationService
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.userAccountFacade.get();
    this.userSub = this.user$
      // checks first if the uid is defined
      .pipe(filter((user) => user.uid !== undefined))
      // gets the first value to avoid multiple requests
      .pipe(first())
      .subscribe((user) => {
        if (user.uid) {
          this.notificationsStatusSub = this.orderNotificationService
            .getNotificationsStatus()
            .subscribe((status) => {
              this.notificationsStatus$.next(status);
            });
        }
      });
  }

  toggleNotifications(): void {
    this.notificationsStatus$.next(!this.notificationsStatus$.value);
    this.orderNotificationService.updateNotificationsStatus(this.notificationsStatus$.value);
  }

  ngOnDestroy(): void {
    if (this.notificationsStatusSub) {
      this.notificationsStatusSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
