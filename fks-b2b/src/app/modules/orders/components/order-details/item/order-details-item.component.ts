import {Component, Input, OnInit} from '@angular/core';
import {FrankeOrderDetails} from 'src/app/shared/models/franke-order';

@Component({
  selector: 'app-order-details-item, [app-order-details-item]',
  templateUrl: './order-details-item.component.html',
  styleUrls: ['./order-details-item.component.scss'],
})
export class OrderDetailsItemComponent implements OnInit {
  @Input() order: FrankeOrderDetails;
  status: string;

  ngOnInit(): void {
    this.setStatus();
  }

  getDeliveryDate(deliveryDate: string): string {
    if (deliveryDate) {
      return deliveryDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
    }
  }

  setStatus(): void {
    this.status = this.order.orderStatus;
  }
}
