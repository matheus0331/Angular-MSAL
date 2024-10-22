import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ShoppingCartAlternativeProductsOverlayButtonComponent} from './shopping-cart-alternative-products-overlay-button.component';

describe('ShoppingCartAlternativeProductsOverlayButtonComponent', () => {
  let component: ShoppingCartAlternativeProductsOverlayButtonComponent;
  let fixture: ComponentFixture<ShoppingCartAlternativeProductsOverlayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingCartAlternativeProductsOverlayButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ShoppingCartAlternativeProductsOverlayButtonComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
