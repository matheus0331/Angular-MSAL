import {Component, OnInit} from '@angular/core';
import {Address, CmsService, TranslationService} from '@spartacus/core';
import {format} from 'date-fns';
import {UserAccountFacade} from '@spartacus/user/account/root';
import {OrderDetailBillingComponent, OrderDetailsService} from '@spartacus/order/components';

@Component({
  selector: 'app-extended-order-confirmation-overview',
  templateUrl: './extended-order-confirmation-overview.component.html',
  styleUrls: ['./extended-order-confirmation-overview.component.scss'],
})
export class ExtendedOrderConfirmationOverviewComponent
  extends OrderDetailBillingComponent
  implements OnInit {

  public billingAddress: Address;

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected userAccountFacade: UserAccountFacade,
    protected translationService: TranslationService,
    protected cms: CmsService,
  ) {
    super(orderDetailsService, translationService);
  }

  ngOnInit(): void {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }

  formatDate(date: Date): string {
    return format(new Date(date), 'dd/MM/yyyy');
  }
}
