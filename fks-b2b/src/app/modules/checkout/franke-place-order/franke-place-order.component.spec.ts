import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FrankePlaceOrderComponent} from './franke-place-order.component';

describe('FrankePlaceOrderComponent', () => {
  let component: FrankePlaceOrderComponent;
  let fixture: ComponentFixture<FrankePlaceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankePlaceOrderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankePlaceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
