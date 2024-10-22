import {NgModule} from '@angular/core';

import {OccConfig, provideConfig} from '@spartacus/core';
import {defaultB2bOccConfig} from '@spartacus/setup';
import {environment} from 'src/environments/environment';
import {translationChunksConfiguration} from '../configs/translation-chunks-config';
import {defaultB2BCheckoutConfig} from '@spartacus/checkout/b2b/root';
import {defaultCmsContentProviders, mediaConfig} from '@spartacus/storefront';
import {CheckoutStepType} from '@spartacus/checkout/base/root';
import {layoutConfig} from '../configs/layout-config';

const occConfig: OccConfig = {
  backend: {
    occ: {
      prefix: '/occ/v2/',
      endpoints: {
        productSearch: 'products/search?fields=FULL,spellingSuggestion',
        baseSites: 'basesites/B2B?fields=BASIC',
        carts: 'users/${userId}/carts?fields=FULL',
        cart: 'users/${userId}/carts/current?fields=FULL',
        createCart: 'users/${userId}/carts?fields=FULL',
        addEntries: 'users/${userId}/carts/current/entries',
        updateEntries: 'users/${userId}/carts/current/entries/${entryNumber}',
        removeEntries: 'users/${userId}/carts/current/entries/${entryNumber}',
        addEmail: 'users/${userId}/carts/current/email',
        deleteCart: 'users/${userId}/carts/current',
        cartVoucher: 'users/${userId}/carts/current/vouchers',
        orderHistory: 'users/${userId}/b2bOrders',
        orderDetail: 'users/${userId}/b2bOrders/${orderId}?fields=FULL',
        saveCart: 'users/${userId}/carts/current/save',
        setDeliveryAddress:
          'orgUsers/${userId}/carts/current/addresses/delivery',
        product: {
          details: 'products/${productCode}?fields=FULL,documents',
          variants: 'products/${productCode}?fields=FULL,documents',
        }
      },
    },
  },
};
// only provide the `occ.baseUrl` key if it is explicitly configured, otherwise the value of
// <meta name="occ-backend-base-url" > is ignored.
// This in turn breaks the deployment in CCv2
if (environment.occBaseUrl) {
  occConfig.backend.occ.baseUrl = environment.occBaseUrl;
}

@NgModule({
  providers: [
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    provideConfig(defaultB2bOccConfig),
    provideConfig(defaultB2BCheckoutConfig),
    ...defaultCmsContentProviders,
    provideConfig({
      checkout: {
        steps: [
          {
            id: 'shippingAddress',
            name: 'checkoutProgress.shippingAddress',
            routeName: 'checkoutShippingAddress',
            type: [],
          },
          {
            id: 'billingAddress',
            name: 'checkoutProgress.billingAddress',
            routeName: 'checkoutBillingAddress',
            type: [
              CheckoutStepType.BILLING_ADDRESS,
              CheckoutStepType.DELIVERY_MODE,
              CheckoutStepType.SHIPPING_ADDRESS,
            ],
          },
          {
            id: 'reviewOrder',
            name: 'checkoutProgress.reviewOrder',
            routeName: 'checkoutReviewOrder',
            type: [CheckoutStepType.REVIEW_ORDER],
          },
        ],
      },
      backend: occConfig.backend,
      authentication: {
        client_id: 'mobile_android',
        client_secret: 'secret',
      },
      context: {
        baseSite: [
          'fks-home-b2b',
          'fks-de-b2b',
          'fks-ch-b2b',
          'fks-fr-b2b',
          'fks-it-b2b',
          'hs-ffi-b2b',
          'fks-it2-b2b',
          'fks-gb-b2b',
          'fks-gb2-b2b',
          'fks-pl-b2b',
          'fks-nl-b2b',
          'fks-es-b2b',
          'fks-pt-b2b',
          'fks-be-b2b',
          'fks-dk-b2b',
          'fks-no-b2b',
          'fks-se-b2b',
          'fks-at-b2b',
        ],
        language: [
          'en',
          'en_GB',
          'de_CH',
          'it_CH',
          'fr_CH',
          'it',
          'fr',
          'de',
          'nl',
          'pl',
          'es',
          'pt',
          'no',
          'sv',
          'da',
          'nl_BE',
          'fr_BE',
        ],
        currency: ['CHF', 'EUR', 'GBP', 'PLN', 'DKK', 'NOK', 'SEK'],
        urlParameters: ['baseSite', 'language'],
      },
      i18n: {
        backend: {
          loader: (language, chunkName) => import(`../../assets/locale/${language}/${chunkName}.json`)
        },
        chunks: translationChunksConfiguration,
        fallbackLang: 'en',
      },
      features: {
        level: '6.5',
      },
    }),
  ],
})
export class SpartacusConfigurationModule {
}
