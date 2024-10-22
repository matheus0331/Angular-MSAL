import {
  Address,
  Price,
  Product,
} from '@spartacus/core';
import { Brand, ProductFamily } from './brand';
import { CartDiscount } from './cart-discount';
import { ORDER_TYPES } from '@core/services/franke-order-history/models/order-types.model';
import {OrderEntry} from '@spartacus/cart/base/root';
import {OrderHistory, OrderHistoryList} from '@spartacus/order/root';

export enum ORDER_DELIVERY_STATUS {
  ORDER_ACKNOWLEDGED = 'A',
  ORDER_CONFIRMED = 'B',
  DELIVERY_CREATED = 'C',
  PICKED = 'D',
  SHIPPED = 'E',
  DELIVERED = 'F',
}

export enum FRANKE_ORDER_STATUS {
  ORDER_ACKNOWLEDGED = 'AA',
  ORDER_CONFIRMED = 'BB',
  DELIVERY_CREATED = 'CC',
  PICKED = 'DD',
  SHIPPED = 'EE',
  DELIVERED = 'FF',
}

export interface FrankeOrderEntry extends OrderEntry {
  product?: FrankeProduct;
  ecoTax?: FrankeEcoTax;
  catalogPrice?: { formattedValue?: string };
  discounts?: CartDiscount[];
}
export interface FrankeProduct extends Product {
  brands?: Brand[];
  families?: ProductFamily[];
  bundleTemplates?: [{
    products?: FrankeProduct[];
  }];
}

export interface FrankeEcoTax {
  currencyIso?: string;
  formattedValue?: string;
  priceType?: string;
  value?: number;
}

export interface FrankeOrderHistory extends OrderHistory {
  code?: string;
  purchaseOrderNumber?: string;
  guid?: string;
  placed?: Date;
  deliveryDate?: Date;
  status?: string;
  statusDisplay?: string;
  condensedStatus?: string;
  total?: Price;
  customerReference?: string;
  orderTypeText?: string;
  orderType?: string;
  salesDocType?: ORDER_TYPES;
}

export interface FrankeOrderHistoryList extends OrderHistoryList {
  results?: FrankeOrderHistory[];
}

export interface FrankeOrderDetails {
  custmaterial?: string;
  deliveryDate?: string;
  frozenDeliveryDate?: string;
  deliveredQuantity?: string;
  description?: string;
  docCurrency?: string;
  item?: string;
  itemCategory?: string;
  material?: string;
  netPrice?: string;
  netValue?: string;
  oldMatlNumber?: string;
  orderQuantity?: string;
  orderStatus?: FRANKE_ORDER_STATUS;
  plant?: string;
  product?: FrankeProduct;
  salesUnit?: string;
}

export interface FrankeReplaceItemInOrder {
  orderCode?: string;
  productCode: string;
  salesItem: string;
}

export interface FrankeOrderInvoices {
  invoiceNumber?: string;
  lineItem?: string;
  documentDate?: number[];
  currency?: string;
  reference?: string;
  amount?: string;
  taxAmount?: string;
  text?: string;
  name?: string;
  orderNumber?: string;
  purchaseOrder?: string;
}

interface BackendMessage {
  message?: string;
  number?: string;
  severity?: string;
}

declare module '@spartacus/order/root' {
  export interface Order {
    orderPlacementStatus?: string;
    totalCatalogPrice?: Price;
    totalAdditionalFees?: Price;
    billingAddress?: Address;
    backendMessages?: BackendMessage[];
  }
  export interface ReplenishmentOrder {
    orderPlacementStatus?: string;
  }
}
