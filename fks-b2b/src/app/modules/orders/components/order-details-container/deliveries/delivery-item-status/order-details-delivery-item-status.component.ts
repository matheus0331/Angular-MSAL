import {Component, Input, OnInit} from '@angular/core';
import {
  frankeOrderItemDeliveryStatus,
  FrankeOrderStatusDisplayValues,
  ORDER_IDEM_DELIVERY_STATUS,
} from '@shared/models/franke-order-delivery';

@Component({
  selector: 'app-order-details-delivery-item-status',
  templateUrl: './order-details-delivery-item-status.component.html',
  styleUrls: ['./order-details-delivery-item-status.component.scss'],
})
export class OrderDetailsDeliveryItemStatusComponent implements OnInit {
  @Input() status: ORDER_IDEM_DELIVERY_STATUS;
  statusValue: FrankeOrderStatusDisplayValues;

  constructor() {
  }

  ngOnInit(): void {
    this.statusValue = frankeOrderItemDeliveryStatus[this.status];
  }
}
