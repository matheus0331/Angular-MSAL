import {Component, Input, OnInit} from '@angular/core';
import {FrankeOrderDeliveryTrack} from '@shared/models/franke-order-delivery';
import {ICONS} from '@shared/components/icons/icons.component';

@Component({
  selector: 'app-order-details-delivery-by-code',
  templateUrl: './order-details-delivery-by-code.component.html',
  styleUrls: ['./order-details-delivery-by-code.component.scss'],
})
export class OrderDetailsDeliveryByCodeComponent implements OnInit {
  @Input() deliveryCode: string;
  @Input() deliveries: FrankeOrderDeliveryTrack[];
  deliveriesByCode: FrankeOrderDeliveryTrack[];
  lastDelivery: FrankeOrderDeliveryTrack;
  icons = ICONS;

  constructor() {
  }

  ngOnInit(): void {
    this.deliveriesByCode = this.getDeliveryes();
    this.lastDelivery = this.deliveriesByCode[this.deliveriesByCode.length - 1];
  }

  getDeliveryes(): FrankeOrderDeliveryTrack[] {
    return this.deliveries
      .filter((delivery) => delivery.deliveryCode === this.deliveryCode)
      .sort(
        (a, b) =>
          new Date(a.deliveryDate).getTime() -
          new Date(b.deliveryDate).getTime()
      );
  }
}
