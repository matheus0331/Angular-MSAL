import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeProductCarouselComponent} from './home-product-carousel.component';

describe('ProductCarouselComponent', () => {
  let component: HomeProductCarouselComponent;
  let fixture: ComponentFixture<HomeProductCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeProductCarouselComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProductCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
