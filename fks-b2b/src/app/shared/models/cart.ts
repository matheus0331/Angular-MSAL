import {Address, Price} from '@spartacus/core';
import { Cart } from '@spartacus/cart/base/root';
import { CartDiscount } from './cart-discount';

interface BackendMessage {
  message?: string;
  number?: string;
  severity?: string;
}

declare module '@spartacus/cart/base/root' {
  export interface Cart {
    totalCatalogPrice?: Price;
    customerPONumber?: string;
    billingAddress?: Address;
    orderRequestedDate?: Date;
    discounts?: CartDiscount[];
    backendMessages?: BackendMessage[];
  }
}

export interface CartReplaceItem {
  entryNumber: number;
  productCode: string;
}
