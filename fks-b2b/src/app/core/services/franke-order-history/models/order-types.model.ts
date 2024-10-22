export enum ORDER_TYPES {
  ORDERS = 'B2B,ZBB,ZEO,ZOR',
  QUOTES = 'ZQT',
  RETURNS = 'ZRE',
}

export interface OrderType {
  key: string;
  tranaslationKey: string;
  value: string;
}

export const OrderTypesList: OrderType[] = Object.entries(ORDER_TYPES).map(
  ([key, value]) => ({
    key,
    tranaslationKey: `orderHistory.${key.toLowerCase()}`,
    value,
  })
);
