import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDetailsItemComponent} from './order-details-item.component';

describe('OrderDetailsItemComponent', () => {
  let component: OrderDetailsItemComponent;
  let fixture: ComponentFixture<OrderDetailsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
