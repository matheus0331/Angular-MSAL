import {Injectable} from '@angular/core';
import {PaginationOptions} from '@spartacus/storefront';

const FALLBACK_PAGINATION_OPTIONS: PaginationOptions = {
  rangeCount: 4,
  dotsLabel: '...',
  startLabel: '«',
  previousLabel: '‹',
  nextLabel: '›',
  endLabel: '»',
};

@Injectable()
export class ProductPaginationConfig {
  pagination?: PaginationOptions = FALLBACK_PAGINATION_OPTIONS;
}
