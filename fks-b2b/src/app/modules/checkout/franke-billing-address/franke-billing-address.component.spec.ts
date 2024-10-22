import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FrankeBillingAddressComponent} from './franke-billing-address.component';

describe('FrankeBillingAddressComponent', () => {
  let component: FrankeBillingAddressComponent;
  let fixture: ComponentFixture<FrankeBillingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeBillingAddressComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeBillingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
