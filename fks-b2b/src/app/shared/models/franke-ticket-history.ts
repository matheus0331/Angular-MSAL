export interface TicketHistory {
  pagination?: Pagination[];
  results?: Tickets[];
}
export interface Pagination {
  count?: number;
  page?: number;
  totalCount?: number;
  totalPages?: number;
}

export interface Tickets {
  code?: number;
  createdBy?: number;
  creationDateTime?: Date;
  id?: string;
  initialReceiptDateTime?: Date;
  lifecycleStatusCode?: number;
  mainTicketCode?: number;
  name?: string;
  processingTypeCode?: string;
  productId?: number;
  userLifecycleStatusCode?: string | number;
}

export enum TicketsStatusCodeEnum {
  Open = 'Open',
  InProgress = 'InProgress',
  Completed = 'Completed',
  CustomerAction = 'CustomerAction'
}
