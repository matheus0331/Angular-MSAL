import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FrankeAlternativeProductsCarouselModalContentComponent} from './franke-alternative-products-carousel-modal-content.component';

describe('FrankeAlternativeProductsCarouselModalContentComponent ', () => {
  let component: FrankeAlternativeProductsCarouselModalContentComponent;
  let fixture: ComponentFixture<FrankeAlternativeProductsCarouselModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeAlternativeProductsCarouselModalContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      FrankeAlternativeProductsCarouselModalContentComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
