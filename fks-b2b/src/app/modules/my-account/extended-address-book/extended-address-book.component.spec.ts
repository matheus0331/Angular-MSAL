import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedAddressBookComponent} from './extended-address-book.component';

describe('ExtendedAddressBookComponent', () => {
  let component: ExtendedAddressBookComponent;
  let fixture: ComponentFixture<ExtendedAddressBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedAddressBookComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedAddressBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
