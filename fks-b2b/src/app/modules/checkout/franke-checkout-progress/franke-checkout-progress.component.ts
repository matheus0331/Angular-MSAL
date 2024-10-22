import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CheckoutProgressComponent} from '@spartacus/checkout/base/components';
import {CheckoutStep} from '@spartacus/checkout/base/root';

const stepTask = [
  'checkoutProgress.shippingTask',
  'checkoutProgress.billingTask',
  'checkoutProgress.reviewTask',
];

const stepIcons = ['MAP_PIN', 'CREDIT_CARD', 'CLIPBOARD_CHECK'];

@Component({
  selector: 'app-franke-checkout-progress',
  templateUrl: './franke-checkout-progress.component.html',
  styleUrls: ['./franke-checkout-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrankeCheckoutProgressComponent
  extends CheckoutProgressComponent
  implements OnInit, OnDestroy {
  steps: CheckoutStep[];
  subscription: Subscription;
  currentStepTask: string;

  ngOnInit(): void {
    this.subscription = this.steps$.subscribe((steps) => {
      this.steps = steps;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
