import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AvailabilityCheckAddToCartComponent} from './availability-check-add-to-cart.component';

describe('AvailabilityCheckAddToCartComponent', () => {
  let component: AvailabilityCheckAddToCartComponent;
  let fixture: ComponentFixture<AvailabilityCheckAddToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailabilityCheckAddToCartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityCheckAddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
