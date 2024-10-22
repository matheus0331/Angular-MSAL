import {Component} from '@angular/core';
import {OrderConfirmationItemsComponent} from '@spartacus/order/components';

@Component({
  selector: 'app-extended-order-confirmation-items',
  templateUrl: './extended-order-confirmation-items.component.html',
  styleUrls: ['./extended-order-confirmation-items.component.scss'],
})
export class ExtendedOrderConfirmationItemsComponent extends OrderConfirmationItemsComponent {

}
