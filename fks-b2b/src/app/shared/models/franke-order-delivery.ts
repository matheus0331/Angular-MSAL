import { ICONS } from '@shared/components/icons/icons.component';

export enum ORDER_IDEM_DELIVERY_STATUS {
  PICKED_UP = 'A',
  PARTIALLY_PICKED_UP = 'B',
  DELIVERED = 'C',
  EXCEPTION = 'D',
}

export enum ORDER_DELIVERY_STATUS {
  IN_PROCESS = 'DAA',
  DELIVERED = 'DBB',
}

export interface FrankeOrderDeliveryTrack {
  carrier: string;
  deliveryCode: string;
  deliveryDate: string;
  deliveryQty: number;
  deliveryStatus?: ORDER_DELIVERY_STATUS;
  itemNumber: string;
  productCode: string;
  productDescription: string;
  trackingNumber?: string;
  trackingStatus?: ORDER_IDEM_DELIVERY_STATUS;
  trackingTime: string;
  trackingUrl?: string;
}

export interface FrankeOrderDelivery {
  city?: string;
  deliveryEntries: FrankeOrderDeliveryTrack[];
  name?: string;
  postalCode?: string;
  salesDocument?: string;
  street?: string;
  street2?: string;
}

// Not part of the API

export interface FrankeOrderStatusDisplayValues {
  icon: string;
  translationKey: string;
  color: string;
}

export type FrankeOrderItemDeliveryStatus = {
  [value in ORDER_IDEM_DELIVERY_STATUS]: FrankeOrderStatusDisplayValues;
};

export const frankeOrderItemDeliveryStatus: FrankeOrderItemDeliveryStatus = {
  [ORDER_IDEM_DELIVERY_STATUS.PICKED_UP]: {
    icon: ICONS.FA_ARROW_RIGHT_CIRCLE,
    translationKey: 'orderDetails.tracking.itemStatus.pickedUp',
    color: 'warning',
  },
  [ORDER_IDEM_DELIVERY_STATUS.PARTIALLY_PICKED_UP]: {
    icon: ICONS.FA_ARROW_RIGHT_CIRCLE,
    translationKey: 'orderDetails.tracking.itemStatus.partiallyPickedUp',
    color: 'warning',
  },
  [ORDER_IDEM_DELIVERY_STATUS.DELIVERED]: {
    icon: ICONS.FA_CHECK_CIRCLE,
    translationKey: 'orderDetails.tracking.itemStatus.delivered',
    color: 'success',
  },
  [ORDER_IDEM_DELIVERY_STATUS.EXCEPTION]: {
    icon: ICONS.FA_EXCLAMATION_CIRCLE,
    translationKey: 'orderDetails.tracking.itemStatus.exception',
    color: 'danger',
  },
};

export type FrankeOrderDeliveryStatus = {
  [value in ORDER_DELIVERY_STATUS]: FrankeOrderStatusDisplayValues;
};

export const frankeOrderDeliveryStatus: FrankeOrderDeliveryStatus = {
  [ORDER_DELIVERY_STATUS.IN_PROCESS]: {
    icon: ICONS.FA_ARROW_RIGHT_CIRCLE,
    translationKey: 'orderDetails.tracking.deliveryStatus.inProcess',
    color: 'warning',
  },
  [ORDER_DELIVERY_STATUS.DELIVERED]: {
    icon: ICONS.FA_CHECK_CIRCLE,
    translationKey: 'orderDetails.tracking.deliveryStatus.delivered',
    color: 'success',
  },
};
