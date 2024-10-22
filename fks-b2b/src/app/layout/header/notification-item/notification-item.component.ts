import {Component, Input} from '@angular/core';
import {FrankeOrderNotification, FrankeOrderNotificationTypes} from 'src/app/shared/models/franke-order-notification';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent {
  @Input() notification: FrankeOrderNotification;
  notificationTypes = FrankeOrderNotificationTypes;
}

