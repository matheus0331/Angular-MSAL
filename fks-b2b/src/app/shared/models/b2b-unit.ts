import { B2BUnit } from '@spartacus/organization';
import { SalesRepUser } from './sales-rep-user';

declare module '@spartacus/organization' {
  export interface B2BUnit {
    accountManager?: SalesRepUser;
    displayUnitId?: string;
  }
}
