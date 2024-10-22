import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedOrderConfirmationTotalsComponent} from './extended-order-confirmation-totals.component';

describe('ExtendedOrderConfirmationTotalsComponent', () => {
  let component: ExtendedOrderConfirmationTotalsComponent;
  let fixture: ComponentFixture<ExtendedOrderConfirmationTotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedOrderConfirmationTotalsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedOrderConfirmationTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
