import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderInvoicesComponent} from './order-invoices.component';

describe('OrderInvoicesComponent', () => {
  let component: OrderInvoicesComponent;
  let fixture: ComponentFixture<OrderInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderInvoicesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
