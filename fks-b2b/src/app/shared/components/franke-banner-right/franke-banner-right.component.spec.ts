import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrankeBannerRightComponent } from './franke-banner-right.component';

describe('FrankeBannerRightComponent', () => {
  let component: FrankeBannerRightComponent;
  let fixture: ComponentFixture<FrankeBannerRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeBannerRightComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeBannerRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
