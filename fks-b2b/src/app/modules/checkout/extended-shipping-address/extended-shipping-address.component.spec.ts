import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedShippingAddressComponent} from './extended-shipping-address.component';

describe('ExtendedShippingAddressComponent', () => {
  let component: ExtendedShippingAddressComponent;
  let fixture: ComponentFixture<ExtendedShippingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedShippingAddressComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
