export class EcommerceEventItem {
  // tslint:disable:variable-name
  item_id: string;
  item_name: string;
  item_brand: string;
  item_category: string;
  price: number;
  discount: number = null;
  quantity: number = null;
}

export class EcommerceEvent {
  currency: string;
  value: number;
  items: EcommerceEventItem[];
  shipping?: number = null;
  tax?: number = null;
  transaction_id?: string = null;
}
