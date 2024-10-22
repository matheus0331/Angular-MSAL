import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDetailsDeliveriesComponent} from './order-details-deliveries.component';

describe('OrderDetailsDeliveriesComponent', () => {
  let component: OrderDetailsDeliveriesComponent;
  let fixture: ComponentFixture<OrderDetailsDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsDeliveriesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
