import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrankeCarouselComponent } from './franke-carousel.component';

describe('FrankeCarouselComponent', () => {
  let component: FrankeCarouselComponent;
  let fixture: ComponentFixture<FrankeCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrankeCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
