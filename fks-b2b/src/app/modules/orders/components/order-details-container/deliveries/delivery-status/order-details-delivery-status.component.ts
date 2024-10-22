import {Component, Input, OnInit} from '@angular/core';
import {frankeOrderDeliveryStatus, FrankeOrderStatusDisplayValues, ORDER_DELIVERY_STATUS} from '@shared/models/franke-order-delivery';

@Component({
  selector: 'app-order-details-delivery-status',
  templateUrl: './order-details-delivery-status.component.html',
  styleUrls: ['./order-details-delivery-status.component.scss'],
})
export class OrderDetailsDeliveryStatusComponent implements OnInit {
  @Input() status: ORDER_DELIVERY_STATUS;
  statusValue: FrankeOrderStatusDisplayValues;

  constructor() {
  }

  ngOnInit(): void {
    this.statusValue = frankeOrderDeliveryStatus[this.status];
  }
}
