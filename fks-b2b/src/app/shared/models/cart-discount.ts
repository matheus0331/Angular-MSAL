import { Price } from '@spartacus/core';

export interface CartDiscount {
  amount?: number;
  type?: string;
  price?: Price;
  title?: string;
}
