import {Component, OnInit} from '@angular/core';
import {BannerComponent, CmsComponentData} from '@spartacus/storefront';
import {Observable} from 'rxjs';
import {FrankeBannerNotification, FrankeBannerNotificationTypes} from 'src/app/shared/models/franke-banner-notification';
import {CmsService, SemanticPathService} from '@spartacus/core';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.scss'],
})
export class NotificationBannerComponent
  extends BannerComponent
  implements OnInit {
  text: string;
  cssClass: string;
  data$: Observable<FrankeBannerNotification> = this.component.data$;

  constructor(componentData: CmsComponentData<FrankeBannerNotification>,
              protected urlService: SemanticPathService,
              protected cmsService: CmsService) {

    super(componentData, urlService, cmsService);
  }

  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.text = data.componentText;
      // settting css classes based on the following mapping:
      // -  Promotion-Style: SAGE
      // -  Informational-Style: WHEAT
      // -  Communication-Style: ROSEMARY
      if (data.notificationType === FrankeBannerNotificationTypes.PROMOTION) {
        this.cssClass = 'sage';
      }
      if (
        data.notificationType === FrankeBannerNotificationTypes.INFORMATIONAL
      ) {
        this.cssClass = 'wheat';
      }
      if (
        data.notificationType === FrankeBannerNotificationTypes.COMMUNICATION
      ) {
        this.cssClass = 'rosemary';
      }
    });
  }
}
