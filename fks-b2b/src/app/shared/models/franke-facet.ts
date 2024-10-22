import { Breadcrumb, Facet, ProductSearchPage } from '@spartacus/core';
import { FacetList } from '@spartacus/storefront';

declare module '@spartacus/core' {
  export interface Facet {
    code?: string;
    quickFacet?: boolean;
  }
}
export interface FrankeFacetList extends FacetList {
  activeCategory?: Breadcrumb[];
  facets: FrankeFacet[];
}

export interface FrankeProductSearchPage extends ProductSearchPage {
  facets?: FrankeFacet[];
}

export interface FrankeFacet extends Facet {
  code?: string;
  quickFacet?: boolean;
}
