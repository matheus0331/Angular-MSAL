import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDetailsDeliveryStatusComponent} from './order-details-delivery-status.component';

describe('OrderDetailsDeliveryStatusComponent', () => {
  let component: OrderDetailsDeliveryStatusComponent;
  let fixture: ComponentFixture<OrderDetailsDeliveryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsDeliveryStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsDeliveryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
