import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FrankeReviewOrderItemPromotionBannerComponent} from './franke-review-order-item-promotion-banner.component';

describe('FrankeReviewOrderItemPromotionBannerComponent', () => {
  let component: FrankeReviewOrderItemPromotionBannerComponent;
  let fixture: ComponentFixture<FrankeReviewOrderItemPromotionBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeReviewOrderItemPromotionBannerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      FrankeReviewOrderItemPromotionBannerComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
