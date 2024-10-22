import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedAddressFormComponent } from './extended-address-form.component';

describe('ExtendedAddressFormComponent', () => {
  let component: ExtendedAddressFormComponent;
  let fixture: ComponentFixture<ExtendedAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendedAddressFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
