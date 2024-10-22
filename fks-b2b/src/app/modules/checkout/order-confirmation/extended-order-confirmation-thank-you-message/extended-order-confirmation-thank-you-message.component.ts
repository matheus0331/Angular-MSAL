import {Component} from '@angular/core';
import {OrderConfirmationThankYouMessageComponent} from '@spartacus/order/components';

@Component({
  selector: 'app-extended-order-confirmation-thank-you-message',
  templateUrl: './extended-order-confirmation-thank-you-message.component.html',
  styleUrls: ['./extended-order-confirmation-thank-you-message.component.scss']
})
export class ExtendedOrderConfirmationThankYouMessageComponent
  extends OrderConfirmationThankYouMessageComponent {
}
