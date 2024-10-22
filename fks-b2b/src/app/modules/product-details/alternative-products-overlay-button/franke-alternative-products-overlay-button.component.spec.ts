import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FrankeAlternativeProductsOverlayButtonComponent} from './franke-alternative-products-overlay-button.component';

describe('FrankeAlternativeProductsOverlayButtonComponent', () => {
  let component: FrankeAlternativeProductsOverlayButtonComponent;
  let fixture: ComponentFixture<FrankeAlternativeProductsOverlayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeAlternativeProductsOverlayButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      FrankeAlternativeProductsOverlayButtonComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
