import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeBannerCarouselComponent} from './home-banner-carousel.component';

describe('HomeBannerCarouselComponent', () => {
  let component: HomeBannerCarouselComponent;
  let fixture: ComponentFixture<HomeBannerCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeBannerCarouselComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBannerCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
