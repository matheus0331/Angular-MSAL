import {Component} from '@angular/core';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';
import {CheckoutProgressMobileBottomComponent, CheckoutStepService} from '@spartacus/checkout/base/components';

const stepIcons = ['MAP_PIN', 'CREDIT_CARD', 'CLIPBOARD_CHECK'];

const stepTask = [
  'checkoutProgress.shippingTask',
  'checkoutProgress.billingTask',
  'checkoutProgress.reviewTask',
];

@Component({
  selector: 'app-extended-progress-mobile-bottom',
  templateUrl: './extended-progress-mobile-bottom.component.html',
  styleUrls: ['./extended-progress-mobile-bottom.component.scss'],
  providers: [WindowSizeUtils],
})
export class ExtendedProgressMobileBottomComponent extends CheckoutProgressMobileBottomComponent {
  isMobileOrTable$ = this.windowSizeUtils.match(
    MediaBreakpoint.MOBILE_OR_TABLET
  );

  constructor(
    checkoutStepService: CheckoutStepService,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    super(checkoutStepService);
  }

  stepIcon(index: number): string {
    return stepIcons[index];
  }

  stepToDo(index: number): boolean {
    if (index < this.activeStepIndex) {
      return true;
    }
  }
}
