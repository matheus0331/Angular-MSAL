import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShoppingCartItemPromotionBannerComponent} from './shopping-cart-item-promotion-banner.component';

describe('ShoppingCartItemPromotionBannerComponent', () => {
  let component: ShoppingCartItemPromotionBannerComponent;
  let fixture: ComponentFixture<ShoppingCartItemPromotionBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingCartItemPromotionBannerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartItemPromotionBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
