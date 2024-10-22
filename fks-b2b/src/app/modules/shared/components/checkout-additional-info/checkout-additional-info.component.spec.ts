import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckoutAdditionalInfoComponent} from './checkout-additional-info.component';

describe('CheckoutAdditionalInfoComponent', () => {
  let component: CheckoutAdditionalInfoComponent;
  let fixture: ComponentFixture<CheckoutAdditionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutAdditionalInfoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
