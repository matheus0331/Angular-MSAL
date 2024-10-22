import {CheckoutStepType} from '@spartacus/checkout/base/root';

declare module '@spartacus/checkout/base/root' {
  export const enum  CheckoutStepType {
    BILLING_ADDRESS = 'billingAddress',
    SHIPPING_ADDRESS = 'shippingAddress'
  }
}
