import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedOrderConfirmationItemPromotionBannerComponent} from './extended-order-confirmation-item-promotion-banner.component';

describe('ExtendedOrderConfirmationItemPromotionBannerComponent', () => {
  let component: ExtendedOrderConfirmationItemPromotionBannerComponent;
  let fixture: ComponentFixture<ExtendedOrderConfirmationItemPromotionBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedOrderConfirmationItemPromotionBannerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ExtendedOrderConfirmationItemPromotionBannerComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
