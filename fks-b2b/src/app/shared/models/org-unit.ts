import { B2BUnit } from '@spartacus/organization';
import { Image } from '@spartacus/core/src/model/image.model';

export interface FrankeB2BUnit extends B2BUnit {
  accountManager?: SalesRepUser;
}

export interface SalesRepUser {
  uid?: string;
  name?: string;
  email?: string;
  profilePicture?: Image;
}

export interface OrgUnit {
  active?: boolean;
  name?: string;
  uid?: string;
}
