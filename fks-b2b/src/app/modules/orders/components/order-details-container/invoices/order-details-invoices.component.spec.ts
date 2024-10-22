import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDetailsInvoicesComponent} from './order-details-invoices.component';

describe('OrderDetailsInvoicesComponent', () => {
  let component: OrderDetailsInvoicesComponent;
  let fixture: ComponentFixture<OrderDetailsInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsInvoicesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
