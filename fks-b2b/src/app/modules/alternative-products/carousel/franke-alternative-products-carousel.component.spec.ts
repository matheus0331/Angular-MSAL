import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FrankeAlternativeProductsCarouselComponent} from './franke-alternative-products-carousel.component';

describe('FrankeAlternativeProductsCarouselComponent', () => {
  let component: FrankeAlternativeProductsCarouselComponent;
  let fixture: ComponentFixture<FrankeAlternativeProductsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeAlternativeProductsCarouselComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      FrankeAlternativeProductsCarouselComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
