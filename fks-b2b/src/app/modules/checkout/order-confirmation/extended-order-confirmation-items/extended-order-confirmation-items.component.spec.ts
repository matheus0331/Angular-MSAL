import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedOrderConfirmationItemsComponent} from './extended-order-confirmation-items.component';

describe('ExtendedOrderConfirmationItemsComponent', () => {
  let component: ExtendedOrderConfirmationItemsComponent;
  let fixture: ComponentFixture<ExtendedOrderConfirmationItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedOrderConfirmationItemsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedOrderConfirmationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
