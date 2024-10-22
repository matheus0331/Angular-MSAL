import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedOrderConfirmationThankYouMessageComponent} from './extended-order-confirmation-thank-you-message.component';

describe('ExtendedOrderConfirmationThankYouMessageComponent', () => {
  let component: ExtendedOrderConfirmationThankYouMessageComponent;
  let fixture: ComponentFixture<ExtendedOrderConfirmationThankYouMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedOrderConfirmationThankYouMessageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedOrderConfirmationThankYouMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
