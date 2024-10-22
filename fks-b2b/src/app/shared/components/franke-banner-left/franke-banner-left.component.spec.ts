import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrankeBannerLeftComponent } from './franke-banner-left.component';

describe('FrankeBannerLeftComponent', () => {
  let component: FrankeBannerLeftComponent;
  let fixture: ComponentFixture<FrankeBannerLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeBannerLeftComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeBannerLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
