import { Image } from '@spartacus/core/src/model/image.model';

export interface SalesRepUser {
  uid?: string;
  name?: string;
  email?: string;
  profilePicture?: Image;
}
