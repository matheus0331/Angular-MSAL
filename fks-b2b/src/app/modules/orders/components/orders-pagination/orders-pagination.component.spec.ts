import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrdersPaginationComponent} from './orders-pagination.component';

describe('OrdersPaginationComponent', () => {
  let component: OrdersPaginationComponent;
  let fixture: ComponentFixture<OrdersPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersPaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
