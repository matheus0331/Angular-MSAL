export interface FrankeOrderNotification {
  code?: string;
  read?: boolean;
  prettyTime?: string;
  text?: string;
  type?: string;
}

export enum FrankeOrderNotificationTypes {
  BACK_IN_STOCK = 'backInStock',
  ORDER_STATUS = 'orderStatus',
}
