import {Brand, ProductFamily} from '@shared/models/brand';

declare module '@spartacus/core' {
  export interface Icons {
    code: string;
    url: string;
  }

  export interface Symbols {
    code: string;
    icon: Icons;
    name: string;
  }

  export interface Product {
    brands?: Brand[];
    families?: ProductFamily[];
    configurable?: boolean;
    longTitle?: string;
    shortTitle?: string;
    localSalesNumber?: string;
    remarks?: string;
    symbols?: Symbols[];
    documents?: FrankeDocuments[];
    backInStockNotification?: boolean;
  }
}

export interface FrankeDocuments {
  documentInfo?: {
    documentFormat?: string;
    documentIcon?: string;
    documentSize?: string;
  };
  documentLink?: string;
  documentName?: string;
  documentType?: string;
}
