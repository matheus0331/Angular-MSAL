import { BaseStore } from '@spartacus/core';

export interface ExtendedBaseStore extends BaseStore {
  disableDeliveryAddressChanges: boolean;
  c4cEnabled: boolean;
  availabilityCheckDisabledInCart: boolean;
  showAlternativesInCart: boolean;
  showAlternativesInOrderHistory: boolean;
}
