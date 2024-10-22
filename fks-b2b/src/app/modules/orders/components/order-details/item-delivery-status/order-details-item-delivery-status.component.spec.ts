import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDetailsItemDeliveryStatusComponent} from './order-details-item-delivery-status.component';

describe('OrderDetailsItemDeliveryStatusComponent', () => {
  let component: OrderDetailsItemDeliveryStatusComponent;
  let fixture: ComponentFixture<OrderDetailsItemDeliveryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsItemDeliveryStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsItemDeliveryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
