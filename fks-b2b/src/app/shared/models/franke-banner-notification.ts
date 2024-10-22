import { CmsComponent } from '@spartacus/core';

export interface FrankeBannerNotification extends CmsComponent {
  componentText?: string;
  notificationType?: FrankeBannerNotificationTypes;
}

export enum FrankeBannerNotificationTypes {
  PROMOTION = 'promotion',
  INFORMATIONAL = 'informational',
  COMMUNICATION = 'communication',
}
