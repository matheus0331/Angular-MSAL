import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FrankeAlternativeProductsCarouselItemComponent} from './franke-alternative-products-carousel-item.component';

describe('FrankeAlternativeProductsCarouselItemComponent', () => {
  let component: FrankeAlternativeProductsCarouselItemComponent;
  let fixture: ComponentFixture<FrankeAlternativeProductsCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeAlternativeProductsCarouselItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      FrankeAlternativeProductsCarouselItemComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
