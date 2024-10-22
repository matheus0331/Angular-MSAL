import { Address } from '@spartacus/core';

declare module '@spartacus/core' {
  export interface Address {
    billingAddress?: boolean;
    sapAddress?: boolean;
  }
}
