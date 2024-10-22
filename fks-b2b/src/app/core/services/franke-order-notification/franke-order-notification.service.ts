import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalMessageService, GlobalMessageType, OccEndpointsService} from '@spartacus/core';
import {BehaviorSubject, Observable, Observer, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {FrankeOrderNotification, FrankeOrderNotificationTypes} from 'src/app/shared/models/franke-order-notification';
import {UserAccountFacade} from '@spartacus/user/account/root';

@Injectable({
  providedIn: 'root',
})
export class FrankeOrderNotificationService {
  userUID: BehaviorSubject<string> = new BehaviorSubject(null);
  notificationsRead$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  notificationsBaseUrl = 'users/current/notifications';
  updatingStochNotification$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private occEndpointService: OccEndpointsService,
    protected navigationRouter: Router,
    private userAccountFacade: UserAccountFacade,
    protected globalMessageService: GlobalMessageService,
  ) {
    this.userAccountFacade.get().subscribe((user) => this.userUID.next(user?.uid));
  }

  getAllNotifications(unreadOnly: boolean = false): Observable<FrankeOrderNotification[]> {
    const url: string = this.occEndpointService.buildUrl(`${this.notificationsBaseUrl}?unreadOnly=${unreadOnly}`);

    return this.http.get<FrankeOrderNotification[]>(url).pipe(catchError((e) => of([])));
  }

  getUnreadNotifications(): Observable<FrankeOrderNotification[]> {
    return this.getAllNotifications(true);
  }

  getNotificationsStatus(): Observable<boolean> {
    const url: string = this.occEndpointService.buildUrl(`${this.notificationsBaseUrl}/status`);

    return this.http.get<boolean>(url).pipe(catchError((e) => of(false)));
  }

  readNotification(notification: FrankeOrderNotification): void {
    this.navigateToRouteByNotification(notification);

    if (!notification.read) {
      const url: string = this.occEndpointService.buildUrl(`${this.notificationsBaseUrl}/${notification.type}/${notification.code}`);

      this.http.post<any>(url, {read: true}).subscribe();
    }
  }

  navigateToRouteByNotification(notification: FrankeOrderNotification): void {
    const notificationRoute: string = this.getNavigateToRouteByNotification(notification);

    if (notificationRoute) {
      this.navigationRouter.navigate([notificationRoute]);
    }
  }

  getNavigateToRouteByNotification(notification: FrankeOrderNotification): string {
    switch (notification.type) {
      case FrankeOrderNotificationTypes.BACK_IN_STOCK:
        return `/product/${notification.code}`;
      case FrankeOrderNotificationTypes.ORDER_STATUS:
        return `/my-account/order/${notification.code}`;
      default:
        return '';
    }
  }

  updateNotificationsStatus(status: boolean): void {
    const url: string = this.occEndpointService.buildUrl(`${this.notificationsBaseUrl}/status?enabled=${status}`);

    this.http.post<any>(url, {}).subscribe();
  }

  toogleProductStockNotification(productCode: string, createNotification: boolean = true): Observable<boolean> {
    const url: string = this.occEndpointService.buildUrl(`/products/${productCode}/backInStockNotification?active=${createNotification}`);

    this.updatingStochNotification$.next(true);

    return new Observable((observer: Observer<any>) => {
      this.http.post<any>(url, {}).subscribe(
        () => {
          this.updatingStochNotification$.next(false);
          observer.next(createNotification);
          observer.complete();
        },
        (err) => {
          this.updatingStochNotification$.next(!createNotification);
          this.globalMessageService.add({key: 'httpHandlers.validationErrors.invalid.sessionCart'}, GlobalMessageType.MSG_TYPE_ERROR);
          observer.error(err);
        }
      );
    });
  }
}
