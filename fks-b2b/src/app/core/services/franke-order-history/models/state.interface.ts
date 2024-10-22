import {SortColumn, SortDirection} from '@modules/orders/components/sortable.directive';
import {ORDER_TYPES} from './order-types.model';

export interface StateInterface {
  page: number;
  pageSize: number;
  searchOrderNumber: string;
  searchPurchaseOrderNumber: string;
  searchOrderStatus: string;
  searchOrderType: ORDER_TYPES;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
