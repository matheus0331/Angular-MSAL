import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedOrderConfirmationOverviewComponent} from './extended-order-confirmation-overview.component';

describe('ExtendedOrderConfirmationOverviewComponent', () => {
  let component: ExtendedOrderConfirmationOverviewComponent;
  let fixture: ComponentFixture<ExtendedOrderConfirmationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedOrderConfirmationOverviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedOrderConfirmationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
