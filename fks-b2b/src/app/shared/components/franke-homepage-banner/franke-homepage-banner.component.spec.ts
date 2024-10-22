import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrankeHomepageBannerComponent } from './franke-homepage-banner.component';

describe('FrankeHomepageBannerComponent', () => {
  let component: FrankeHomepageBannerComponent;
  let fixture: ComponentFixture<FrankeHomepageBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrankeHomepageBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeHomepageBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
