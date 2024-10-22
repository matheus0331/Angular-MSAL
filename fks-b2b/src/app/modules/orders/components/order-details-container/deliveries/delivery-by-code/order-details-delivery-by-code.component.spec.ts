import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDetailsDeliveryByCodeComponent} from './order-details-delivery-by-code.component';

describe('OrderDetailsDeliveryByCodeComponent', () => {
  let component: OrderDetailsDeliveryByCodeComponent;
  let fixture: ComponentFixture<OrderDetailsDeliveryByCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsDeliveryByCodeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsDeliveryByCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
