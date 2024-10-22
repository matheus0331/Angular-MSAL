import {Component, OnInit} from '@angular/core';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {ActiveCartFacade} from '@spartacus/cart/base/root';
import {CheckoutProgressMobileTopComponent, CheckoutStepService} from '@spartacus/checkout/base/components';

const stepIcons = ['MAP_PIN', 'CREDIT_CARD', 'CLIPBOARD_CHECK'];

const stepTask = [
  'checkoutProgress.shippingTask',
  'checkoutProgress.billingTask',
  'checkoutProgress.reviewTask',
];

@Component({
  selector: 'app-extended-progress-mobile-top',
  templateUrl: './extended-progress-mobile-top.component.html',
  styleUrls: ['./extended-progress-mobile-top.component.scss'],
  providers: [WindowSizeUtils],
})
export class ExtendedProgressMobileTopComponent
  extends CheckoutProgressMobileTopComponent
  implements OnInit {
  isMobileOrTable$ = this.windowSizeUtils.match(
    MediaBreakpoint.MOBILE_OR_TABLET
  );

  constructor(
    activeCartFacade: ActiveCartFacade,
    checkoutStepService: CheckoutStepService,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    super(activeCartFacade, checkoutStepService);
  }

  ngOnInit(): void {
    this.cart$ = this.activeCartFacade.getActive();
  }

  stepIcon(index: number): string {
    return stepIcons[index];
  }

  stepDone(index: number): boolean {
    if (index < this.activeStepIndex) {
      return true;
    }
  }

  setCurrentStepTask(index: number): string {
    return stepTask[index];
  }
}
