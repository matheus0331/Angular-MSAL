import {RoutesConfig, RoutingConfig} from '@spartacus/core';

export const defaultStorefrontRoutesConfig: RoutesConfig = {
  wishlist: {
    paths: ['/my-account/favorites', 'favorites'],
  },
  updateProfile: {
    paths: ['/my-account/profile'],
  },
  addressBook: {
    paths: ['/my-account/address-book', 'address-book'],
  },
  paymentDetails: {
    paths: ['/my-account/payment-details', 'payment-details'],
  },
  dashboard: {
    paths: ['/my-account/dashboard'],
  },
  checkout: {
    paths: ['checkout'],
  },
  checkoutShippingAddress: {
    paths: ['checkout/shipping-address'],
  },
  checkoutBillingAddress: {
    paths: ['checkout/billing-address'],
  },
  checkoutReviewOrder: {
    paths: ['checkout/review-order'],
  },
  product: {
    paths: ['product/:productCode'],
  },
  clientService: {
    paths: ['/client-service'],
  },
};

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontRoutesConfig,
  },
};
