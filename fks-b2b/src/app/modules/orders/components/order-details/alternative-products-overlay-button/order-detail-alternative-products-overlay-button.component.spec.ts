import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OrderDetaiAlternativeProductsOverlayButtonComponent} from './order-detail-alternative-products-overlay-button.component';

describe('OrderDetaiAlternativeProductsOverlayButtonComponent', () => {
  let component: OrderDetaiAlternativeProductsOverlayButtonComponent;
  let fixture: ComponentFixture<OrderDetaiAlternativeProductsOverlayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetaiAlternativeProductsOverlayButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      OrderDetaiAlternativeProductsOverlayButtonComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
