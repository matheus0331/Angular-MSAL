import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrankeBannerCollectionComponent } from './franke-banner-collection.component';

describe('FrankeBannerCollectionComponent', () => {
  let component: FrankeBannerCollectionComponent;
  let fixture: ComponentFixture<FrankeBannerCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrankeBannerCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeBannerCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
