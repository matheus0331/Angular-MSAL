import {FrankeOrderHistory} from '@shared/models/franke-order';

export interface SearchResultInterface {
  orders: FrankeOrderHistory[];
  total: number;
}
