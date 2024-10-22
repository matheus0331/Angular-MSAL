import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDetailsDeliveryItemStatusComponent} from './order-details-delivery-item-status.component';

describe('OrderDetailsDeliveryItemStatusComponent', () => {
  let component: OrderDetailsDeliveryItemStatusComponent;
  let fixture: ComponentFixture<OrderDetailsDeliveryItemStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsDeliveryItemStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsDeliveryItemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
