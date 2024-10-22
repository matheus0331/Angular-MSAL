import { HttpErrorResponse } from '@angular/common/http';
import { Image } from '@spartacus/core';

export interface AlternativeProductsSearchFilters {
  fun: string;
  quantity?: number;
  requestDate?: Date;
  minResults?: number;
  maxResults?: number;
  batchSize?: number;
  query?: string;
}

export interface AlternativeProductMetadata {
  type: string;
  uri: string;
}

export interface AlternativeProductCharacteristic {
  fieldName: string;
  FUN: string;
  characteristic: string;
  value: string;
  active: boolean;
  highlight: number;
  visible: boolean;
  addQuery: string;
  removeQuery: string;
  enabled: boolean;
  __metadata: AlternativeProductMetadata;
}

export interface AlternativeProductCharacteristicResults {
  results: AlternativeProductCharacteristic[];
}

export interface AlternativeProduct {
  FUN: string;
  description: string;
  availability: number;
  price: string;
  imageUrl: string;
  characteristics: AlternativeProductCharacteristicResults;
  __metadata: AlternativeProductMetadata;
}

export interface AlternativeProductFacet {
  fieldName: string;
  FUN: string;
  characteristic: string;
  value: string;
  active: boolean;
  highlight: number;
  visible: boolean;
  addQuery: string;
  removeQuery: string;
  enabled: boolean;
  __metadata: AlternativeProductMetadata;
}

export const hiddenAlternativeProductFacetIds: string[] = [
  'externalMaterialGroupForSearch',
];

export interface AlternativeProductsSearchResponseValues {
  products: AlternativeProduct[];
  facets: AlternativeProductFacet[];
  FUN?: string;
  __metadata?: AlternativeProductMetadata;
}

export interface AlternativeProductsSearchResponse {
  d: AlternativeProductsSearchResponseValues;
}

// Not part of API response
export interface AlternativeProductSearchData {
  products?: AlternativeProduct[];
  facets?: AlternativeProductFacet[];
  error?: HttpErrorResponse;
  isLoading: boolean;
}
