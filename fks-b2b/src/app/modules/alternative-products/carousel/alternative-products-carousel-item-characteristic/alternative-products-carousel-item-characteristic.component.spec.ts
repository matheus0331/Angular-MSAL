import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FrankeAlternativeProductsCarouselItemCharacteristicComponent} from './alternative-products-carousel-item-characteristic.component';

describe('FrankeAlternativeProductsCarouselItemCharacteristicComponent', () => {
  let component: FrankeAlternativeProductsCarouselItemCharacteristicComponent;
  let fixture: ComponentFixture<FrankeAlternativeProductsCarouselItemCharacteristicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FrankeAlternativeProductsCarouselItemCharacteristicComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      FrankeAlternativeProductsCarouselItemCharacteristicComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
