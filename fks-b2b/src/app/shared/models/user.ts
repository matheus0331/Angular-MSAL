import {User} from '@spartacus/user/account/root';
import {B2BUnit} from '@spartacus/core/src/model/org-unit.model';

declare module '@spartacus/user/account/root' {
  export interface User {
    orgUnit?: B2BUnit;
    registrationSite?: RegistrationSite;
  }

  export interface RegistrationSite {
    contentCatalogs?: string[];
    previewUrl?: string;
    uid?: string;
  }
}
